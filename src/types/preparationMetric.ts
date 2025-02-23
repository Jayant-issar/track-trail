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

export interface ProgressEntry {
  id: string;
  date: string;  // ISO date string
  achieved: number;
  metricId: string;
}

export interface TargetPerDay {
  id: string;
  value: number;
  label: string;
  metricId: string;
}

export interface PreparationMetricDetails {
  id: string;
  userId: string;
  name: string;
  createdAt: string;  // ISO date string
  updatedAt: string;  // ISO date string
  progress: ProgressEntry[];
  targetPerDay: TargetPerDay[];
}