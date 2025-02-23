import {useQuery} from "@tanstack/react-query";
import { useAuth } from "@clerk/clerk-react";
import { getPreparationMetrics } from "@/actions/perpTracker";
import { getAboutPreparationMetric } from '@/actions/perpTracker';
import { PreparationMetricDetails } from '@/types/preparationMetric';


export const usePreparationMetricQuery = ()=>{
    const {getToken,userId} = useAuth();

    return useQuery({
        queryKey:["all-preparation-metrics",userId],
        queryFn: async()=>{
            const token = await getToken();
            return getPreparationMetrics(token,userId)
        }
    })
}



export const usePreparationMetricDetailQuery = (metricId: string) => {
    const {getToken} = useAuth();
  return useQuery<PreparationMetricDetails, Error>({
    queryKey: ['prepMetricDetails', metricId],
    queryFn: async () => {
        const token = await getToken();
      if (!token) throw new Error('No authentication token available');
      const response = await getAboutPreparationMetric(token, metricId);
      if (response.error) throw new Error(response.error.message);
      return response.data;
    },
    staleTime: 300000, // 5 minutes before data becomes stale
    
  });
};

