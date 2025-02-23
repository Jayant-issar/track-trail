import { create } from 'zustand';
import { PreparationMetric } from '@/types/preparationMetric';

interface PrepTrackerState {
  prepMetrics: PreparationMetric[];
  setPrepMetrics: (metrics: PreparationMetric[]) => void;
  addPrepMetric: (metric: PreparationMetric) => void;
  updatePrepMetric: (id: string, updates: Partial<PreparationMetric>) => void;
  deletePrepMetric: (id: string) => void;
}

export const usePrepTrackerStore = create<PrepTrackerState>((set) => ({
  prepMetrics: [],
  setPrepMetrics: (prepMetrics) => set({ prepMetrics }),
  addPrepMetric: (metric) => 
    set((state) => ({ prepMetrics: [...state.prepMetrics, metric] })),
  updatePrepMetric: (id, updates) =>
    set((state) => ({
      prepMetrics: state.prepMetrics.map(pm =>
        pm.id === id ? { ...pm, ...updates } : pm
      )
    })),
  deletePrepMetric: (id) =>
    set((state) => ({
      prepMetrics: state.prepMetrics.filter(pm => pm.id !== id)
    }))
}));
