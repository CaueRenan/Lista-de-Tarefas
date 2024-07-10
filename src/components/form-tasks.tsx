import React, { ChangeEvent, FormEvent, useState } from 'react';
import Form from './form';
import Button from './button';
import { getTasks } from '../data/get-list'
import { getAllList } from '../data/get-all-lists';
import { BaseList } from '../types/baseList';

interface Props {
  id: number;
}
export default function FormTask(props: Props): JSX.Element {
  const [newTask, setNewTask] = useState('');
  const [popUpAddTask, setPopUpAddTask] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTask(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const lists = getAllList()
    const tasks = getTasks(props.id)

    const arrayList: BaseList[] = [...lists];
    const arrayTaks: string[] = []

    if (newTask) {
      for (const i of arrayList) {
        if (i.id == props.id && tasks) {
          arrayTaks.push(...tasks, newTask)
          i.tasks = arrayTaks
        }
      }
    }

    const json = JSON.stringify(arrayList)
    localStorage.setItem('listTask', json)

  };

  return (
    <>
      {popUpAddTask &&
        <Form
          formSubmit={(e) => handleSubmit(e)}
          inputChange={(e) => handleChange(e)}
          textButton="to save"
        />
      }
      <Button text='add task' onClick={() => setPopUpAddTask(!popUpAddTask)} />
    </>
  )
}
