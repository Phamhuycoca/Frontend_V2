import type { ApiResponse } from '../../Common/interface';
import apiClient from './apiClient';

class BaseService {
  private endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  async getAll(params?: any): Promise<ApiResponse<any>> {
    try {
      const res = await apiClient.get<ApiResponse<any>>(this.endpoint, { params });
      return res.data;
    } catch (error: any) {
      return this.handleError(error);
    }
  }

  async getById(id: string | number): Promise<ApiResponse<any>> {
    try {
      const res = await apiClient.get<ApiResponse<any>>(`${this.endpoint}/${id}`);
      return res.data;
    } catch (error: any) {
      return this.handleError(error);
    }
  }

  async create(data: any): Promise<ApiResponse<any>> {
    try {
      const res = await apiClient.post<ApiResponse<any>>(this.endpoint, data);
      return res.data;
    } catch (error: any) {
      return this.handleError(error);
    }
  }

  async update(id: string | number, data: any): Promise<ApiResponse<any>> {
    try {
      const res = await apiClient.put<ApiResponse<any>>(`${this.endpoint}/${id}`, data);
      return res.data;
    } catch (error: any) {
      return this.handleError(error);
    }
  }

  async delete(id: string | number): Promise<ApiResponse<any>> {
    try {
      const res = await apiClient.delete<ApiResponse<any>>(`${this.endpoint}/${id}`);
      return res.data;
    } catch (error: any) {
      return this.handleError(error);
    }
  }

  private handleError(error: any): ApiResponse<any> {
    return {
      statusCode: error?.response,
      success: false,
      message: error?.response?.data?.message || error.message || 'Unknown error',
      data: null,
    };
  }
}

export default BaseService;
