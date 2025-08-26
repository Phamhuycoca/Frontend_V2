import type { Item, ItemTree } from '../interface';

export const ConvertSelect = (arr: Item[]) => {
  return arr.map((x) => ({
    value: x.id,
    label: x.ten,
  }));
};
export const ConvertTreeSelect = (arr: ItemTree[]) => {
  return arr.map((x) => ({
    value: x.id,
    label: x.ten,
    childrens: x.childrens,
  }));
};
