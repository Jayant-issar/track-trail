import { create } from 'zustand';
import { ColdApproach } from '@/types/coldApproach';

interface ColdOutreachState {
  coldOutreaches: ColdApproach[];
  setColdOutreaches: (outreaches: ColdApproach[]) => void;
  addColdOutreach: (outreach: ColdApproach) => void;
  updateColdOutreach: (id: string, updates: Partial<ColdApproach>) => void;
  deleteColdOutreach: (id: string) => void;
}

export const useColdOutreachStore = create<ColdOutreachState>((set) => ({
  coldOutreaches: [],
  setColdOutreaches: (coldOutreaches) => set({ coldOutreaches }),
  addColdOutreach: (outreach) => 
    set((state) => ({ coldOutreaches: [...state.coldOutreaches, outreach] })),
  updateColdOutreach: (id, updates) =>
    set((state) => ({
      coldOutreaches: state.coldOutreaches.map(co =>
        co.id === id ? { ...co, ...updates } : co
      )
    })),
  deleteColdOutreach: (id) =>
    set((state) => ({
      coldOutreaches: state.coldOutreaches.filter(co => co.id !== id)
    }))
}));
