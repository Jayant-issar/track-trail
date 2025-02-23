import { useQuery } from "@tanstack/react-query";
import { getApplications } from "@/actions/applicationTracker";
import { useApplicationStore } from "@/stores/applicationStore";
import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";

export const useApplicationsQuery = () => {
  const { getToken } = useAuth();
  const { setApplications } = useApplicationStore();

  const queryResult = useQuery({
    queryKey: ['all-applications'],
    queryFn: async () => {
      const token = await getToken();
      const response = await getApplications(token);
      return response;
    }
  });

  useEffect(() => {
    if (queryResult.isSuccess && queryResult.data?.data) {
      setApplications(queryResult.data.data);
    }
  }, [queryResult.data, queryResult.isSuccess, setApplications]);

  return queryResult;
};