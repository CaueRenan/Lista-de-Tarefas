import React, { useContext, useEffect, useState } from 'react';
import { IdContext } from '../../context/IdContex';
import { getList } from '../../data/get-list';
import Form from '../Form';
import Button from '../Button';
import { getAllList } from '../../data/get-all-lists';
import { IoMdSave } from 'react-icons/io';
import { MdDeleteOutline } from 'react-icons/md';
import { IoClose } from 'react-icons/io5';

import './style/index.css';

export default function Title(): JSX.Element {
  const { id, currentList } = useContext(IdContext);
  const [showForm, setShowForm] = useState(false);
  const [listName, setListName] = useState('');
  const list = getList(id);
  const allList = getAllList();

  useEffect(() => {
    setShowForm(false);
    setListName(list.name);
  }, [id]);

  const handleSubmit = () => {
    list.name = listName;

    allList.map((l) => {
      if (l.id == list.id) {
        l.name = listName;
        l = list;
      }
    });

    const json = JSON.stringify(allList);
    localStorage.setItem('listTask', json);

    setShowForm(false);
  };

  const handleDelete = () => {
    const allList = getAllList();

    allList.map((list, index) => {
      if (list.id == id) {
        allList.splice(index, 1);
        return;
      }
    });

    const json = JSON.stringify(allList);
    localStorage.setItem('listTask', json);

    currentList(0);
    setShowForm(false);
  };

  return (
    <>
      <header>
        {id == 0 ? (
          <div className="list-description initial">
            {allList.length > 0 && id == 0
              ? 'Selecione uma lista'
              : 'Adicione uma nova lista'}
          </div>
        ) : showForm == false ? (
          <div className="list-description" onClick={() => setShowForm(true)}>
            {listName}
          </div>
        ) : (
          <div className="list-description">
            <Form
              inputChange={(e) => setListName(e.target.value)}
              formSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
              value={listName}
              icon={<IoMdSave size={35} />}
            />
            <span>
              <Button
                icon={<MdDeleteOutline size={35} />}
                onClick={() => {
                  handleDelete();
                }}
              />
              <Button
                icon={<IoClose size={32} />}
                onClick={() => setShowForm(false)}
              />
            </span>
          </div>
        )}
      </header>
    </>
  );
}
