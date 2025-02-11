import { useState, useEffect } from "react";
import { PreparationMetric } from "@/types/preparationMetric";
import { PreparationMetricForm } from "./PreparationMetricForm";
import { PreparationMetricList } from "./PreparationMetricList";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { createPreparationMetric, getPreparationMetrics, updatePreparationMetric } from "@/actions/perpTracker";
import { useAuth } from "@clerk/clerk-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const PreparationTracker = () => {
  const { toast } = useToast();
  const [metrics, setMetrics] = useState<PreparationMetric[]>([]);

  const [showForm, setShowForm] = useState(false);
  const { getToken,userId } = useAuth();
  
  const queryClient = useQueryClient();
  
  // Load existing metrics on component mount
  const { data, isLoading ,error} = useQuery({
    queryKey: ["all-preparation-metrics", userId],
    queryFn: async ()=>{
      const token = await getToken();
      return getPreparationMetrics(token,userId);
    }
  })

  useEffect(()=>{
    if(data){
      setMetrics(data.data);
    }
  },[data])

  const handleSubmit = async (
    metric: Omit<PreparationMetric, "id" | "progress" | "createdAt" | "updatedAt">
  ) => {
    const token = await getToken();
    const { data, error } = await createPreparationMetric(metric, token);

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    if (data) {
      // Ensure proper data structure from backend
      const newMetric: PreparationMetric = {
        ...data,
        // Map nested relations correctly
        targetPerDay: data.targetPerDay.map(unit => ({
          id: unit.id,
          value: unit.value,
          label: unit.label,
          metricId: unit.metricId
        })),
        progress: data.progress.map(p => ({
          id: p.id,
          date: p.date,
          achieved: p.achieved,
          metricId: p.metricId
        }))
      };
      
      setMetrics(prev => [newMetric, ...prev]);
      setShowForm(false);
      toast({
        title: "Metric created",
        description: "Your new metric has been created successfully!",
      });
    }
  };

  const { mutate: updateProgress } = useMutation({
    mutationFn: async ({ metricId, value }: { metricId: string; value: number }) => {
      const token = await getToken();
      const response = await updatePreparationMetric(metricId, value, token);
      if (!response.data) throw new Error(response.error?.message || "Update failed");
      return response.data; // Returns the full progress object from API
    },
    onMutate: async ({ metricId, value }) => {
      // Cancel ongoing queries to prevent race conditions
      await queryClient.cancelQueries({ queryKey: ['all-preparation-metrics', userId] });

      // Get current data snapshot (preserves { data: [...] } structure)
      const previousData = queryClient.getQueryData<{ data: PreparationMetric[] }>(
        ['all-preparation-metrics', userId]
      ) || { data: [] };

      // Create temporary progress entry matching API response structure
      const tempProgress = {
        id: `temp-${Date.now()}`, // Temporary ID for UI tracking
        date: new Date().toISOString(), // Current timestamp
        achieved: value, // User-input value
        metricId: metricId, // Target metric ID
        metric: previousData.data.find(m => m.id === metricId) // Full metric reference
      };

      // Optimistic UI update
      queryClient.setQueryData<{ data: PreparationMetric[] }>(
        ['all-preparation-metrics', userId],
        (old) => ({
          data: (old?.data || []).map(metric => {
            if (metric.id === metricId) {
              return {
                ...metric, // Keep existing metric properties
                progress: [...metric.progress, tempProgress] // Add new progress entry
              };
            }
            return metric;
          })
        })
      );

      // Return context for error handling
      return { previousData, tempProgress, metricId };
    },
    onError: (err, variables, context) => {
      // Rollback to previous state if error occurs
      if (context?.previousData) {
        queryClient.setQueryData(
          ['all-preparation-metrics', userId],
          context.previousData
        );
      }
      
      // User feedback
      toast({
        title: "Update failed",
        description: err.message,
        variant: "destructive",
      });
    },
    onSuccess: (newProgress, variables, context) => {
      // Replace temporary entry with server response
      queryClient.setQueryData<{ data: PreparationMetric[] }>(
        ['all-preparation-metrics', userId],
        (old) => ({
          data: (old?.data || []).map(metric => {
            if (metric.id === context?.metricId) {
              return {
                ...metric,
                progress: metric.progress.map(p => 
                  p.id === context.tempProgress.id ? newProgress : p
                )
              };
            }
            return metric;
          })
        })
      );
    },
    onSettled: () => {
      // Ensure fresh data from server
      queryClient.invalidateQueries({ 
        queryKey: ['all-preparation-metrics', userId] 
      });
    }
  });

  const handleProgressUpdate = (metricId: string, value: number) => {
    updateProgress({ metricId, value });
  };

  if (isLoading) {
    return <div className="text-center py-8 text-gray-400">Loading metrics...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Preparation Tracker
        </h2>
        <Button
          onClick={() => setShowForm(true)}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Metric
        </Button>
      </div>

      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="bg-gray-800 border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-gray-200">Add New Metric</DialogTitle>
          </DialogHeader>
          <PreparationMetricForm
            onSubmit={handleSubmit}
            onCancel={() => setShowForm(false)}
          />
        </DialogContent>
      </Dialog>

      <PreparationMetricList 
        metrics={metrics} 
        onProgressUpdate={handleProgressUpdate} 
      />
    </div>
  );
};