import { BehaviorSubject, Subject } from 'rxjs';
export interface ModalType<T = any> {
  form: string;
  data?: T | null;
}

const initialModal: ModalType = {
  form: '',
};
export type ModalConfirmState = {
  title?: string;
  content?: string;
  resolve: (result: boolean) => void;
  type: 'success' | 'error';
};
export type AlertState = {
  content: string;
  title?: string;
  type: 'success' | 'error';
};
export const modalSubject = new BehaviorSubject<ModalType>(initialModal);
export const modalConfirm$ = new Subject<ModalConfirmState>();
export function showModalConfirm(title: string, content: string): Promise<boolean> {
  return new Promise((resolve) => {
    modalConfirm$.next({ title, content, resolve, type: 'success' });
  });
}
export const modalAlert = new BehaviorSubject<AlertState>({
  type: 'success',
  content:'',
  title:''
});
