import { BaseList } from "../types/baseList";
import { getAllList } from "./get-all-lists";


export const getList = (id: number): BaseList | void => {
  const allLists = getAllList()
  const objList = <BaseList>{}

  if (!allLists) return

  for (const i of allLists) {
    if (i.id == id) {
      objList.name = i.name
      objList.tasks = i.tasks
    }
  }

  return objList;

}

export const getTasks = (id: number): string[] | void => {
  const allLists = getAllList()
  const arrayTask: string[] = []

  if (!allLists) return

  for (const i of allLists) {
    if (i.id == id) {
      const tasks = i.tasks
      arrayTask.push(...tasks)
    }
  }
  return arrayTask;

}
