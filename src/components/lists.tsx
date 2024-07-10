import React, { useState } from 'react';
import FormLists from './form-lists';
import FormTask from './form-tasks';
import { getAllList } from '../data/get-all-lists'
import { getTasks } from '../data/get-list'
import Button from './button';

export default function Lists(): JSX.Element {
  const [popUpAddList, setPopUpAddList] = useState(false);
  const [currentList, setCurrentList] = useState('');
  const [currentId, setId] = useState(0)

  const lists = getAllList();
  const tasks = getTasks(currentId) as string[]

  return (
    <>
      <header>{currentList}</header>
      <aside>
        <ul>
          {!lists
            ? ''
            : lists.map((list, index) => (
              <li key={index} onClick={() => {
                setCurrentList(list.name)
                setId(list.id)
              }
              }>
                {list.name}
              </li>
            ))}
        </ul>
        {popUpAddList && <FormLists />}
        <Button text="add list" onClick={() => setPopUpAddList(!popUpAddList)} />
      </aside >
      <ul>
        {currentList && tasks.map((task, index) => (
          <li key={index}>{task}</li>
        ))}
      </ul>
      {currentList && <FormTask id={currentId} />}
    </>

  );
}
