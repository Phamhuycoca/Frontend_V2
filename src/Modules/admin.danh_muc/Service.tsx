import BaseService from '../../shared/api/BaseService';
class DanhMucService extends BaseService {
  constructor() {
    super('danh-muc');
  }
}
export default new DanhMucService();