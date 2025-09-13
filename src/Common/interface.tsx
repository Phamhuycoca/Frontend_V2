import type { ModalType } from "./helpers/Observable";

export interface RouteConfig {
  path: string;
  element: React.ReactNode;
  protected?: boolean | false;
  children?: RouteConfig[];
}
export interface InterfaceSelect{
  value:string;
  label:string;
}
export interface InterfaceTreeSelect{
  value:string;
  label:string;
  children:InterfaceSelect[];
}
export type Item = {
  id: string | number;
  ten: string;
};
export interface ResponseData<T> {
  data: T;
  page: number;
  page_size: number;
  total: number;
  filter: string;
  search: string;
}
interface MeteResponse{
  page?:number;
  page_size?:number;
  total?:number;
}
export interface MetaState {
  page: number;
  page_size: number;
  search: string;
  sort: string;
  filter: string;
}
export interface PagedDataResponse<T> {
  meta?:MeteResponse;
  message: string;
  items: T;
  statusCode: number;
  success: boolean;
}
export interface ApiResponse<T> {
  message: string;
  data: T;
  statusCode: number;
  success: boolean;
}
export type ItemTree = {
  id: string | number;
  ten: string;
  childrens: ItemTree[]
};
export interface MenuItem {
  ten: string | null;
  icon: string | null;
  duong_dan: string | null;
  so_thu_tu: number | null;
  children?: MenuItem[];
}
export const initialModal: ModalType = { form: '', data: null };
