import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@clerk/clerk-react";
import { getColdOutReaches } from "@/actions/coldOutReachTracker";
import { useEffect } from "react";
import { useColdOutreachStore } from "@/stores/coldOutreachStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ColdApproach } from "@/types/coldApproach"; 
import { toast } from "@/components/ui/use-toast";
import { updateColdOutReach } from "@/actions/coldOutReachTracker";


export const useColdOutreacheQuery = () => {
  const { getToken } = useAuth();
  const {setColdOutreaches} = useColdOutreachStore();
  const queryResult =  useQuery({
    queryKey: ["all-cold-outreaches"],
    queryFn: async () => {
      const token = await getToken();
      return getColdOutReaches(token);
    }
  });

  useEffect(()=>{
    if(queryResult.isSuccess && queryResult.data.data) {
      setColdOutreaches(queryResult.data.data);
    }
  },[queryResult.data,queryResult.isSuccess, setColdOutreaches])

  return queryResult
};


const updateColdOutreachStatus = async (
  token: string,
  id: string,
  newStatus: ColdApproach["status"]
) => {
  const response = await fetch(`/api/cold-outreach/${id}`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status: newStatus }),
  });

  if (!response.ok) {
    throw new Error('Failed to update status');
  }

  return response.json();
};

export const useUpdateColdOutreachStatus = () => {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ 
      id, 
      newStatus 
    }: { 
      id: string; 
      newStatus: ColdApproach["status"]; 
    }) => {
      const token = await getToken();
      const response = await updateColdOutReach(token, {
        id,
        status: newStatus
      });
      
      if (response.error) {
        throw new Error(response.error.message);
      }
      
      return response.data;
    },
    onMutate: async ({ id, newStatus }) => {
      await queryClient.cancelQueries({ queryKey: ["all-cold-outreaches"] });
      const previousOutreaches = queryClient.getQueryData(["all-cold-outreaches"]);

      queryClient.setQueryData(
        ["all-cold-outreaches"],
        (old: any) => ({
          ...old,
          data: old.data.map((approach: ColdApproach) =>
            approach.id === id ? { ...approach, status: newStatus } : approach
          ),
        })
      );

      return { previousOutreaches };
    },
    onError: (err, variables, context) => {
      if (context?.previousOutreaches) {
        queryClient.setQueryData(["all-cold-outreaches"], context.previousOutreaches);
      }
      toast({
        title: "Error",
        description: "Failed to update status. Please try again.",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      toast({
        title: "Status Updated",
        description: "Cold approach status has been updated successfully!",
      });
    },
  });
};