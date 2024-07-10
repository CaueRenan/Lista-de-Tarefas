import React, { ChangeEvent, FormEvent, useState } from 'react';
import Form from './form';
import { BaseList } from '../types/baseList';
import { getAllList } from '../data/get-all-lists';

export default function FormLists(): JSX.Element {
  const [newList, setNewList] = useState<BaseList>();
  const lists = getAllList();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!lists) {
      setNewList({ ...newList, id: 1, name: e.target.value, tasks: [] });

    } else {
      setNewList({ ...newList, id: lists.length + 1, name: e.target.value, tasks: [] });

    }

  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const arrayList: BaseList[] = [];

    if (!newList) return;

    if (!lists) {
      arrayList.push(newList);

      const json = JSON.stringify(arrayList)
      localStorage.setItem('listTask', json);

    } else {
      arrayList.push(...lists, newList);

      const json = JSON.stringify(arrayList)
      localStorage.setItem('listTask', json);
    }
  };

  return (
    <>
      <Form
        formSubmit={(e) => handleSubmit(e)}
        inputChange={(e) => handleChange(e)}
        textButton="to salve"
      />
    </>
  );
}
