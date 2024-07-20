import { BaseList } from '../types/baseList';
import { getAllList } from './get-all-lists';

export const getList = (id: number): BaseList => {
  const allLists = getAllList();
  const objList = <BaseList>{};

  for (const i of allLists) {
    if (i.id == id) {
      objList.id = i.id;
      objList.name = i.name;
      objList.tasks = i.tasks;
    }
  }
  return objList;
};
