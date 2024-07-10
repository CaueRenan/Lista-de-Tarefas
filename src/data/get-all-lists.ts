import { BaseList } from '../types/baseList';

export const getAllList = (): BaseList[] => {
  const getLists = localStorage.getItem('listTask')
  const listParse = JSON.parse(getLists as string);

  return listParse;
}
