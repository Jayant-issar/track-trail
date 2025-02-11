export type PreparationMetricUnit = {
  id: string;
  value: number;
  label: string;
  metricId: string;
};

export type PreparationMetric = {
  id: string;
  name: string;
  targetPerDay: PreparationMetricUnit[];
  progress: {
    id: string;
    date: string;
    achieved: number;
    metricId: string;
  }[];
  createdAt: string;
  updatedAt: string;
};