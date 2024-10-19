import React, { useContext, useEffect, useState } from 'react';
import Button from '../Button';
import Form from '../Form';
import { getAllList } from '../../data/get-all-lists';
import { BaseList } from '../../types/baseList';
import { IdContext } from '../../context/IdContex';
import { IoAddCircle } from 'react-icons/io5';
import { IoMdSave } from 'react-icons/io';
import { MdEdit } from 'react-icons/md';
import { MdDeleteOutline } from 'react-icons/md';

import './style/index.css';

export default function Lists(): JSX.Element {
  const [newList, setNewList] = useState<BaseList>();
  const [lists, setLists] = useState(getAllList());
  const [showForm, setShowForm] = useState(false);
  const [showListControl, setShowListControl] = useState(-1);
  const [indexEdit, setIndexEdit] = useState(-1);
  const [inputValue, setInputValue] = useState('');
  const { id, currentList } = useContext(IdContext);
  // const { currentList } = useContext(IdContext);

  useEffect(() => {
    setLists(getAllList());
  }, [id]);

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

  const handleSubmit = () => {
    const newLists: BaseList[] = [...lists];

    if (!newList) return;

    if (indexEdit == -1) {
      newLists.push(newList);
      setInputValue('');
    } else {
      newLists[indexEdit] = newList;
      setInputValue('');
      setShowListControl(-1);
    }

    const json = JSON.stringify(newLists);
    localStorage.setItem('listTask', json);

    setLists(getAllList());
  };

  const deleteList = (idIndex: number, index: number) => {
    lists.splice(index, 1);

    const json = JSON.stringify(lists);
    localStorage.setItem('listTask', json);

    if (idIndex == id) {
      currentList(0);
    }
    setLists(getAllList());
  };

  return (
    <aside className="container-list">
      <ul>
        {lists.map((list, index) =>
          list.id == id ? (
            ''
          ) : showListControl != index ? (
            <li
              key={index}
              onClick={() => {
                currentList(list.id);
                setIndexEdit(index);
              }}
              onMouseOver={() => {
                if (!showForm) setIndexEdit(index);
              }}
              onMouseOut={() => {
                setIndexEdit(-1);
              }}
            >
              <div className="name-list">{list.name}</div>
              {indexEdit == index && (
                <span>
                  <Button
                    icon={<MdEdit size={15} />}
                    onClick={(e) => {
                      setShowListControl(index);
                      e.stopPropagation();
                      setInputValue(list.name);
                    }}
                  />
                  <Button
                    icon={<MdDeleteOutline size={15} />}
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteList(list.id, index);
                    }}
                  />
                </span>
              )}
            </li>
          ) : (
            <li key={index} className="bg-form-list edit">
              <Form
                inputChange={(e) => handleChange(e.target.value)}
                formSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
                value={inputValue}
                icon={<IoMdSave size={20} />}
              />
            </li>
          ),
        )}
        {showForm && (
          <div className="bg-form-list">
            <Form
              inputChange={(e) => handleChange(e.target.value)}
              formSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
              value={inputValue}
              icon={<IoMdSave size={20} />}
            />
          </div>
        )}
      </ul>
      <div className="list-container-button">
        <div className="hide-line"></div>
        <div className="bg-button">
          <Button
            icon={<IoAddCircle size={35} />}
            onClick={() => {
              setShowForm(!showForm);
              currentList(0);
              setIndexEdit(-1);
            }}
          />
        </div>
      </div>
    </aside>
  );
}
