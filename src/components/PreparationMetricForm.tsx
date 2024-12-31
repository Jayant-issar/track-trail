import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PreparationMetric, PreparationMetricUnit } from "@/types/preparationMetric";

interface Props {
  onSubmit: (metric: Omit<PreparationMetric, "id" | "progress" | "createdAt">) => void;
  onCancel: () => void;
}

export const PreparationMetricForm = ({ onSubmit, onCancel }: Props) => {
  const [formData, setFormData] = useState({
    name: "",
    targetValue: "",
    unitLabel: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const targetPerDay: PreparationMetricUnit = {
      value: Number(formData.targetValue),
      label: formData.unitLabel,
    };

    onSubmit({
      name: formData.name,
      targetPerDay,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name" className="text-gray-200">Metric Name</Label>
        <Input
          id="name"
          placeholder="e.g., DSA Problems, Development Hours"
          className="bg-gray-800/50 border-gray-700 text-gray-200"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="targetValue" className="text-gray-200">Daily Target</Label>
          <Input
            id="targetValue"
            type="number"
            min="0"
            step="0.1"
            placeholder="5"
            className="bg-gray-800/50 border-gray-700 text-gray-200"
            required
            value={formData.targetValue}
            onChange={(e) => setFormData({ ...formData, targetValue: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="unitLabel" className="text-gray-200">Unit Label</Label>
          <Input
            id="unitLabel"
            placeholder="problems, hours, PRs"
            className="bg-gray-800/50 border-gray-700 text-gray-200"
            required
            value={formData.unitLabel}
            onChange={(e) => setFormData({ ...formData, unitLabel: e.target.value })}
          />
        </div>
      </div>

      <div className="flex gap-2">
        <Button type="submit" className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
          Create Metric
        </Button>
        <Button type="button" variant="outline" onClick={onCancel} className="border-gray-700 text-gray-200 hover:bg-gray-700">
          Cancel
        </Button>
      </div>
    </form>
  );
};