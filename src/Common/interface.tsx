export interface RouteConfig {
  path: string;
  element: React.ReactNode;
  protected?: boolean | false;
  children?: RouteConfig[];
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
export interface ApiResponse<T> {
  page?:number;
  page_size?:number;
  total?:number;
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
