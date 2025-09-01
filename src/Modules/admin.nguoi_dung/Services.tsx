import { BehaviorSubject, Observable } from 'rxjs';
import BaseService from '../../shared/api/BaseService';
import type { ModalType } from '../../Common/helpers/Observable';

class DanhMucService extends BaseService {
  private modalSubject = new BehaviorSubject<ModalType>({ form: '' });

  constructor() {
    super('nguoi-dung');
  }

  // Observable để component subscribe
  get modal$(): Observable<ModalType> {
    return this.modalSubject.asObservable();
  }

  // Mở modal và truyền data
  setOpenModal<T = any>(form: string, data?: T) {
    this.modalSubject.next({ form, data });
  }

  //   // Đóng modal
  //   setCloseModal(form: string) {
  //     const current = this.modalSubject.getValue();
  //     if (current.form === form) {
  //       this.modalSubject.next({ ...current, data: undefined });
  //     }
  //   }
}

export default new DanhMucService();
