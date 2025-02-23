import axios from "axios";
import { ColdApproach, updateColdoutreachType } from "../types/coldApproach";

const API_URL = import.meta.env.VITE_PUBLIC_API_URL;
const API_TIMEOUT = 10000;

type ApiResponse<T> = {
  data?: T;
  error?: {

    code: string;
    message: string;
  };
};

export const createColdOutReach = async (
  coldOutReach: Omit<ColdApproach, "id" | "sentDate" >,
  token: string
): Promise<ApiResponse<ColdApproach>> => {
  try {
    const response = await axios({
      method: 'post',
      url: `${API_URL}/user/cold-outreach/create`,
      data: coldOutReach,
      timeout: API_TIMEOUT,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    return { data: response.data };
    
  } catch (error) {
    const errorMessage = axios.isAxiosError(error)
      ? error.response?.data?.message || error.message
      : 'Failed to create coldOutReach';

    console.error('coldOutReach Error:', {
      error: errorMessage,
      coldOutReach: coldOutReach.recipientName
    });

    return {
      error: {
        code: 'COLD_OUTREACH_ERROR',

        message: errorMessage
      }
    };
  }
};


export const getColdOutReaches = async (token:string): Promise<ApiResponse<ColdApproach[]>> => {

  try {
    const response = await axios({
      method: "get",
      url: `${API_URL}/user/cold-outreach`,
      timeout: API_TIMEOUT,
      headers: {
        Authorization: `Bearer ${token}`,
      },

    });
    console.log('ColdOutReaches fetched:', response.data);

    return {data:response.data.data};
  } catch (error) {
    const errorMessage = axios.isAxiosError(error) ? error.response?.data?.message || error.message : 'Failed to fetch coldOutReaches';
    console.error("ColdOutReach Error:", {
      error:errorMessage,
    })
    return {
      error: {
        code: 'COLD_OUTREACH_ERROR',
        message: errorMessage
      }
    }
  }
}

export const updateColdOutReach = async (
  token: string,
  updateData: updateColdoutreachType
):Promise<ApiResponse<ColdApproach>> => {
    try {
      const response = await axios({
        method:"patch",
        url:`${API_URL}/user/cold-outreach/update`,
        timeout:API_TIMEOUT,
        headers:{
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        data:updateData
      });

      return {data:response.data.data};
    } catch (error) {
      const errorMessage = axios.isAxiosError(error) ? error.response?.data?.message || error.message : 'Failed to update coldOutReach';
      console.error("ColdOutReach Error:", {
        error:errorMessage,
      })
      return {
        error: {
          code: 'COLD_OUTREACH_ERROR',
          message: errorMessage
        }
      }
    }
}