import type { ApiResponse } from '../../Common/interface';
import BaseService from '../../shared/api/BaseService';

class AuthServices extends BaseService {
  constructor() {
    super('nguoi-dung');
  }
  async Login(userName: string, password: string): Promise<any> {
    try {
      const res = await this.post(`Login`,{ userName, password });
      if (res.success && res.data?.token) {
        localStorage.setItem('token', res.data.token);
      }
      return res;
    } catch (error: any) {
      return {
        statusCode: error?.response?.status,
        success: false,
        message: error?.response?.data?.message || error.message || 'Login failed',
        data: null,
      };
    }
  }
}
export default new AuthServices();
