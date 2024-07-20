import React, { FormEvent, useContext, useEffect, useState } from 'react';
import Button from './Button';
import Form from './Form';
import { getAllList } from '../data/get-all-lists';
import { BaseList } from '../types/baseList';
import { IdContext } from '../context/IdContex';

export default function Lists(): JSX.Element {
  const [newList, setNewList] = useState<BaseList>();
  const [lists, setLists] = useState(getAllList());
  const [showForm, setShowForm] = useState(false);
  const [indexEdit, setIndexEdit] = useState(-1);
  const [inputValue, setInputValue] = useState('');
  const { id, currentList } = useContext(IdContext);

  useEffect(() => {
    setLists(getAllList());
  }, [lists]);

  const handleChange = (e: string) => {
    setInputValue(e);

    if (indexEdit !== -1) return setNewList({ ...lists[indexEdit], name: e });

    if (lists.length == 0) {
      setNewList({ id: 1, name: e, tasks: [] });
    } else {
      const nextId = lists[lists.length - 1].id + 1;

      setNewList({
        id: nextId,
        name: e,
        tasks: [],
      });
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const newLists: BaseList[] = [...lists];

    if (!newList) return;

    if (indexEdit == -1) {
      newLists.push(newList);
      setInputValue('');
    } else {
      newLists[indexEdit] = newList;
      setInputValue('');
    }

    const json = JSON.stringify(newLists);
    localStorage.setItem('listTask', json);
  };
  const deleteList = (idIndex: number, index: number) => {
    if (idIndex == id) {
      currentList(0);
    }

    lists.splice(index, 1);

    const json = JSON.stringify(lists);
    localStorage.setItem('listTask', json);
  };

  return (
    <aside>
      <ul>
        {lists.map((list, index) => (
          <li
            key={index}
            onClick={() => {
              console.log('oi');
              currentList(list.id);
              setIndexEdit(index);
            }}
          >
            {list.name}
            <span>
              <Button
                text="del"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteList(list.id, index);
                }}
              />
              {indexEdit == index && id != 0 && (
                <Button
                  text="edit"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowForm(true);
                    setInputValue(list.name);
                  }}
                />
              )}
            </span>
          </li>
        ))}
      </ul>
      <Button
        text="add list"
        onClick={() => {
          setShowForm(!showForm);
          setIndexEdit(-1);
        }}
      />
      {showForm && (
        <Form
          inputChange={(e) => handleChange(e.target.value)}
          formSubmit={(e) => handleSubmit(e)}
          value={inputValue}
          textButton="to salve"
        />
      )}
    </aside>
  );
}
