import { useState } from "react";
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

export const PreparationTracker = () => {
  const { toast } = useToast();
  const [metrics, setMetrics] = useState<PreparationMetric[]>([]);
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (
    metric: Omit<PreparationMetric, "id" | "progress" | "createdAt">
  ) => {
    const newMetric: PreparationMetric = {
      ...metric,
      id: crypto.randomUUID(),
      progress: [],
      createdAt: new Date().toISOString(),
    };
    setMetrics([newMetric, ...metrics]);
    setShowForm(false);
    toast({
      title: "Metric created",
      description: "Your new metric has been created successfully!",
    });
  };

  const handleProgressUpdate = (metricId: string, value: number) => {
    setMetrics(
      metrics.map((metric) =>
        metric.id === metricId
          ? {
              ...metric,
              progress: [
                ...metric.progress,
                {
                  date: new Date().toISOString(),
                  achieved: value,
                },
              ],
            }
          : metric
      )
    );
  };

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

      <PreparationMetricList metrics={metrics} onProgressUpdate={handleProgressUpdate} />
    </div>
  );
};