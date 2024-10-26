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
  const [showFormEdit, setShowFormEdit] = useState(-1);
  const [showControl, setShowControl] = useState(-1);
  const [indexEdit, setIndexEdit] = useState(-1);
  const [inputValue, setInputValue] = useState('');
  const { id, currentList } = useContext(IdContext);
  const listColor = ['blue', 'red', 'orange', 'blue', 'red', 'orange'];

  useEffect(() => {
    setLists(getAllList());
  }, [id]);

  const handleChange = (e: string) => {
    setInputValue(e);

    if (indexEdit != -1) return setNewList({ ...lists[indexEdit], name: e });

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
    if (inputValue == '') return;

    if (lists.length < 1) currentList(newList.id);

    if (indexEdit == -1) {
      newLists.push(newList);
    } else {
      newLists[indexEdit] = newList;
      document
        .getElementsByClassName('btn-closed')[0]
        .classList.remove('btn-closed');

      setShowFormEdit(-1);
    }

    const json = JSON.stringify(newLists);
    localStorage.setItem('listTask', json);

    setInputValue('');
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

  const showUl = () => {
    if (lists.length < 1 && showForm == false) return 'hidden';
    if (lists.length == 1 && id == lists[0].id && showForm == false)
      return 'hidden';
  };

  return (
    <aside className="container-list">
      <ul className={showUl()}>
        {lists.map((list, index) =>
          list.id == id ? (
            ''
          ) : showFormEdit != index ? (
            <li
              key={index}
              onClick={() => {
                currentList(list.id);
                setIndexEdit(index);
              }}
              onMouseOver={(e) => {
                e.stopPropagation();

                const btn = document
                  .getElementsByClassName('list-container-button')[0]
                  .getElementsByTagName('button')[0].classList;

                if (btn.contains('btn-closed')) btn.remove('btn-closed');
                if (showForm) setShowForm(false);
                if (showFormEdit != -1) setShowFormEdit(-1);

                e.currentTarget.classList.add('li-open');
                setShowControl(index);
              }}
              onMouseOut={(e) => {
                e.preventDefault();
                e.stopPropagation();

                e.currentTarget.classList.remove('li-open');

                setShowControl(-1);
              }}
            >
              <div className={'name-list ' + listColor[index]}>{list.name}</div>
              {showControl == index && (
                <span className={'control-list ' + listColor[index]}>
                  <Button
                    icon={<MdEdit size={15} />}
                    onClick={(e) => {
                      handleChange(list.name);

                      const btnClosed = document
                        .getElementsByClassName('list-container-button')[0]
                        .getElementsByTagName('button')[0];

                      btnClosed.classList.add('btn-closed');
                      setIndexEdit(index);
                      setShowFormEdit(index);
                      setInputValue(list.name);
                      e.stopPropagation();
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
      <div className={'list-container-button ' + showUl()}>
        <div className="hide-line"></div>
        <div className="bg-button">
          {showFormEdit == -1 ? (
            <Button
              icon={<IoAddCircle size={35} />}
              onClick={(e) => {
                setInputValue('');
                const el = e.currentTarget.classList;

                if (el.contains('btn-closed')) {
                  el.remove('btn-closed');
                } else {
                  el.add('btn-closed');
                }

                setShowForm(!showForm);
                setIndexEdit(-1);
              }}
            />
          ) : (
            <Button
              icon={<IoAddCircle size={35} />}
              onClick={(e) => {
                e.currentTarget.classList.remove('btn-closed');

                setInputValue('');
                setIndexEdit(-1);
                setShowFormEdit(-1);
                setShowForm(!showForm);
              }}
            />
          )}
        </div>
      </div>
    </aside>
  );
}
