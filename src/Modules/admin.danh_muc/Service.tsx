import { modalSubject } from '../../Common/helpers/Observable';
import BaseService from '../../shared/api/BaseService';

class DanhMucService extends BaseService {
  constructor() {
    super('danh-muc');
  }
  setOpenModal(form: string) {
    modalSubject.next({ form});
  }

  setCloseModal(form: string) {
    const current = modalSubject.getValue();
    if (current.form === form) {
      modalSubject.next({ ...current});
    }
  }
}
export default new DanhMucService();
