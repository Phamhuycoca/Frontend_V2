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
export interface ApiResponse<T> {
  meta?:MeteResponse;
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
