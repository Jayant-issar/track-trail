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
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface Props {
  metrics: PreparationMetric[];
  onProgressUpdate: (metricId: string, value: number) => void;
}

const ProgressRing = ({ progress }: { progress: number }) => {
  const radius = 30;
  const stroke = 4;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <motion.div 
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="relative h-16 w-24  flex items-center justify-center "
    >
      <svg className="w-full h-full" viewBox={`0 0 ${radius * 2} ${radius * 2}`}>
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#EC4899" />
          </linearGradient>
        </defs>
        <path
          strokeLinecap="round"
          className="text-gray-700"
          strokeWidth={stroke}
          fill="none"
          stroke="currentColor"
          d={`
            M ${stroke},${radius}
            a ${normalizedRadius},${normalizedRadius} 0 0 1 ${normalizedRadius * 2},0
          `}
        />
        <path
          strokeLinecap="round"
          className="transition-all duration-500 ease-out"
          stroke="url(#gradient)"
          strokeWidth={stroke}
          fill="none"
          strokeDasharray={`${circumference} ${circumference}`}
          style={{ strokeDashoffset }}
          d={`
            M ${stroke},${radius}
            a ${normalizedRadius},${normalizedRadius} 0 0 1 ${normalizedRadius * 2},0
          `}
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-purple-300">
        {Math.round(progress)}%
      </span>
    </motion.div>
  );
};

export const PreparationMetricList = ({ metrics, onProgressUpdate }: Props) => {
  const { toast } = useToast();
  const [progressInputs, setProgressInputs] = useState<Record<string, string>>({});

  const handleProgressSubmit = (metricId: string) => {

    //input validation of the delta
    const value = Number(progressInputs[metricId]);
    if (value <= 0) {
      toast({
        title: "Invalid value",
        description: "Please enter a positive number",
        variant: "destructive",
      });
      return;
    }
    //core logic
    onProgressUpdate(metricId, value);

    //toast notification
    setProgressInputs((prev) => ({ ...prev, [metricId]: "" }));
    toast({
      title: "Progress updated",
      description: "Your progress has been recorded!",
    });
  };

  const calculateDailyProgress = (metric: PreparationMetric) => {
    const todayTotal = metric.progress
      ?.filter(p => new Date(p.date).toDateString() === new Date().toDateString())
      ?.reduce((acc, curr) => acc + curr.achieved, 0) || 0;

    const target = metric.targetPerDay[0]?.value || 1;
    const progress = Math.min((todayTotal / target) * 100, 100);
    return progress;
  };

  return (
    <div className="space-y-4">
      {metrics.length === 0 ? (
        <div className="text-center py-8 text-gray-400">
          No metrics tracked yet. Start by creating one!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {metrics.map((metric,index) => (
            <Card key={metric.id} className="bg-gray-800/50 border-gray-700 group hover:border-purple-500/30 transition-colors">
              <CardHeader className="flex flex-row justify-between items-start pb-1 ">
                <div>
                  <CardTitle className="text-gray-200 flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-purple-400" />
                    {metric.name}
                  </CardTitle>
                  <div className="text-sm text-gray-400 mt-1">
                    Target: {metric.targetPerDay[0]?.value} {metric.targetPerDay[0]?.label}/day
                  </div>
                </div>
                <ProgressRing progress={calculateDailyProgress(metric)} />
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-sm text-gray-400">
                  Today's progress:{" "}
                  {metric.progress
                    ?.filter(
                      (p) =>
                        new Date(p.date).toDateString() ===
                        new Date().toDateString()
                    )
                    ?.reduce((acc, curr) => acc + curr.achieved, 0) || 0}{" "}
                  {metric.targetPerDay?.[0]?.label}
                </div>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Input
                  type="number"
                  min="0"
                  step="0.1"
                  placeholder={`Add ${metric.targetPerDay?.[0]?.label}`}
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