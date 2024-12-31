import { useState } from "react";
import { PreparationMetric } from "@/types/preparationMetric";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, TrendingUp, Clock } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface Props {
  metrics: PreparationMetric[];
  onProgressUpdate: (metricId: string, value: number) => void;
}

export const PreparationMetricList = ({ metrics, onProgressUpdate }: Props) => {
  const { toast } = useToast();
  const [progressInputs, setProgressInputs] = useState<Record<string, string>>({});

  const handleProgressSubmit = (metricId: string) => {
    const value = Number(progressInputs[metricId]);
    if (value <= 0) {
      toast({
        title: "Invalid value",
        description: "Please enter a positive number",
        variant: "destructive",
      });
      return;
    }
    onProgressUpdate(metricId, value);
    setProgressInputs((prev) => ({ ...prev, [metricId]: "" }));
    toast({
      title: "Progress updated",
      description: "Your progress has been recorded!",
    });
  };

  return (
    <div className="space-y-4">
      {metrics.length === 0 ? (
        <div className="text-center py-8 text-gray-400">
          No metrics tracked yet. Start by creating one!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {metrics.map((metric) => (
            <Card key={metric.id} className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-gray-200 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-purple-400" />
                  {metric.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2 text-gray-300">
                  <Clock className="h-4 w-4" />
                  <span>
                    Target: {metric.targetPerDay.value} {metric.targetPerDay.label}/day
                  </span>
                </div>
                <div className="text-sm text-gray-400">
                  Today's progress:{" "}
                  {metric.progress
                    .filter(
                      (p) =>
                        new Date(p.date).toDateString() ===
                        new Date().toDateString()
                    )
                    .reduce((acc, curr) => acc + curr.achieved, 0)}{" "}
                  {metric.targetPerDay.label}
                </div>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Input
                  type="number"
                  min="0"
                  step="0.1"
                  placeholder={`Add ${metric.targetPerDay.label}`}
                  className="bg-gray-900/50 border-gray-600 text-gray-200"
                  value={progressInputs[metric.id] || ""}
                  onChange={(e) =>
                    setProgressInputs((prev) => ({
                      ...prev,
                      [metric.id]: e.target.value,
                    }))
                  }
                />
                <Button
                  size="icon"
                  onClick={() => handleProgressSubmit(metric.id)}
                  className="bg-purple-500 hover:bg-purple-600"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};