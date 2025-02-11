import axios from "axios";
import { Application } from "../types/application";

const API_URL = import.meta.env.VITE_PUBLIC_API_URL;
const API_TIMEOUT = 10000;

type ApiResponse<T> = {
  data?: T;
  error?: {
    code: string;
    message: string;
  };
};

export const createApplication = async (
  application: Omit<Application, "id" | "lastUpdated">,
  token: string
): Promise<ApiResponse<Application>> => {
  try {
    const response = await axios({
      method: 'post',
      url: `${API_URL}/user/application`,
      data: application,
      timeout: API_TIMEOUT,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    console.log('Application created:', response.data);
    return { data: response.data };
    
  } catch (error) {
    const errorMessage = axios.isAxiosError(error)
      ? error.response?.data?.message || error.message
      : 'Failed to create application';

    console.error('Application Error:', {
      error: errorMessage,
      application: application.companyName
    });

    return {
      error: {
        code: 'APPLICATION_ERROR',
        message: errorMessage
      }
    };
  }
};

