import axios from "axios";
import { ColdApproach } from "../types/coldApproach";

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

    console.log('coldOutReach created:', response.data);
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

