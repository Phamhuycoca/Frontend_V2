import BaseService from '../../shared/api/BaseService';

class AuthServices extends BaseService {
  constructor() {
    super('nguoi-dung');
  }
  async Login(userName: string, password: string): Promise<any> {
    try {
      return await this.post(`Login`,{ userName, password });
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
