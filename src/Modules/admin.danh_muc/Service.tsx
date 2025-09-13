import { BehaviorSubject, type Observable } from 'rxjs';
import type { ModalType } from '../../Common/helpers/Observable';
import BaseService from '../../shared/api/BaseService';
import { initialModal } from '../../Common/interface';

class DanhMucService extends BaseService {
  private modalSubject = new BehaviorSubject<ModalType>({ form: '' });

  constructor() {
    super('danh-muc');
  }
  // Observable để component subscribe
  get modal$(): Observable<ModalType> {
    return this.modalSubject.asObservable();
  }

  // Mở modal và truyền data
  setOpenModal<T = any>(form: string, data?: T) {
    this.modalSubject.next({ form, data });
  }
  resetModal() {
    this.modalSubject.next(initialModal);
  }
}
export default new DanhMucService();
