import React, { useContext, useState } from 'react';
import Button from '../Button';
import Form from '../Form';
import { getAllList } from '../../data/get-all-lists';
import { BaseList } from '../../types/baseList';
import { IdContext } from '../../context/IdContex';
import { IoAddCircle } from 'react-icons/io5';
import './style/index.css';

export default function Lists(): JSX.Element {
  const [newList, setNewList] = useState<BaseList>();
  const [lists, setLists] = useState(getAllList());
  const [showForm, setShowForm] = useState(false);
  const [indexEdit, setIndexEdit] = useState(-1);
  const [inputValue, setInputValue] = useState('');
  // const { id, currentList } = useContext(IdContext);
  const { currentList } = useContext(IdContext);

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
    }

    const json = JSON.stringify(newLists);
    localStorage.setItem('listTask', json);

    setLists(getAllList());
  };
  // const deleteList = (idIndex: number, index: number) => {
  //   lists.splice(index, 1);

  //   const json = JSON.stringify(lists);
  //   localStorage.setItem('listTask', json);

  //   if (idIndex == id) {
  //     currentList(0);
  //   }
  //   setLists(getAllList());
  // };

  return (
    <aside className="container-list">
      <ul>
        {lists.map((list, index) => (
          <li
            key={index}
            onClick={() => {
              currentList(list.id);
              setIndexEdit(index);
            }}
          >
            <div className="name-list">{list.name}</div>
            {/* <span>
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
            </span> */}
          </li>
        ))}
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
      {showForm && (
        <Form
          inputChange={(e) => handleChange(e.target.value)}
          formSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          value={inputValue}
          textButton="to salve"
        />
      )}
    </aside>
  );
}
