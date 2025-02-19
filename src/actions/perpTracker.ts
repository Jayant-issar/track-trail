import axios from "axios";

import { PreparationMetric, PreparationMetricDetails } from "@/types/preparationMetric";



const API_URL = import.meta.env.VITE_PUBLIC_API_URL;
const API_TIMEOUT = 10000;

type ApiResponse<T>= {
    data?: T;
    error?: {
        code: string;
        message:string;
    }
}

export const createPreparationMetric = async (
    metric: Omit<PreparationMetric, "id" | "progress" | "createdAt" | "updatedAt">,
    token: string
): Promise<ApiResponse<PreparationMetric>> => {
    try {
        const response = await axios({
            method: 'post',
            url: `${API_URL}/user/prep-tracker/create`,
            data:metric,
            timeout:API_TIMEOUT,
            headers:{
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        console.log(`🟢 Metric created: ${response.data}`);
        return {data: response.data};
        
    } catch (error) {
        const errorMessage = axios.isAxiosError(error) ? error.response?.data?.message || error.message : "Failed to create preparation metric";

        console.error("Preparation metric error: ", {
            error:errorMessage,
        })

        return {
            error:{
                code:"PREPARATION_METRIC_ERROR",
                message:errorMessage
            }
        }
    }
}

export const getPreparationMetrics = async (token: string, clerkId: string): Promise<ApiResponse<PreparationMetric[]>> => {
    try {
        const response = await axios({
            method: 'get',
            url: `${API_URL}/user/prep-tracker/getall/${clerkId}`,
            timeout: API_TIMEOUT,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }

        });

        console.log(`🟢 Metrics fetched: ${response.data}`);
        return {data: response.data.data};

    } catch (error) {
        const errorMessage = axios.isAxiosError(error) ? error.response?.data?.message || error.message : "Failed to fetch preparation metrics";    
        
        console.error("Preparation metric error: ", {
            error:errorMessage,
        })

        return {    
            error:{
                code:"PREPARATION_METRIC_ERROR",
                message:errorMessage
            }
        }
    }
}

export const updatePreparationMetric = async (metricId: string, delta: number, token: string)  => {
    try {
        const response = await axios({
            method:"patch",
            url:`${API_URL}/user/prep-tracker/metrics/progress?metricId=${metricId}`,
            timeout:API_TIMEOUT,
            data:{delta},
            headers:{
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
        return response.data;
    } catch (error) {
        const errorMessage = axios.isAxiosError(error) ? error.response?.data?.message || error.message : "Failed to update preparation metric";
        console.error("Preparation metric error: ", {
            error:errorMessage,
        })
        return {
            error:{
                code:"PREPARATION_METRIC_ERROR",
                message:errorMessage
            }
        }
    }
}


export const getAboutPreparationMetric = async (token:string, metricId:string):
Promise<ApiResponse<PreparationMetricDetails>> =>{
    try {
        const response = await axios({
            method: "get",
            url: `${API_URL}/user/prep-tracker/metricDetails?metricId=${metricId}`,
            timeout:API_TIMEOUT,
            headers:{
                Authorization : `Bearer ${token}`
            }
        });
        // console.log(`Metric details fetched: ${JSON.stringify(response.data.data)}`);
        return {data: response.data.data}
    } catch (error) {
        const errorMessage = axios.isAxiosError(error) ? error.response?.data?.message || error.message : "Failed to fetch  metric deatils ";    
        
        console.error("Preparation metric error: ", {
            error:errorMessage,
        })

        return {    
            error:{
                code:"PREPARATION_METRIC_ERROR",
                message:errorMessage
            }
        }
    }
}

export const getAiHelpAction = async (
  data: { context: string; prompt: string }, 
  token?: string
): Promise<ApiResponse<{ text: string }>> => {
  try {
    const response = await axios({
      method: 'post',
      url: `${API_URL}/user/ai/ai-help`,
      data,
      timeout: API_TIMEOUT,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    return { 
      data: {
        text: response.data.text
      }
    };
    
  } catch (error) {
    const errorMessage = axios.isAxiosError(error) 
      ? error.response?.data?.error?.message || error.message 
      : "Failed to get AI help";
      
    console.error("AI help error", { error: errorMessage });

    return {
      error: {
        code: "AI_HELP_ERROR",
        message: errorMessage
      }
    }
  }
}