import React, { useContext, useEffect, useState } from 'react';
import { IdContext } from '../../context/IdContex';
import { getList } from '../../data/get-list';
import Form from '../Form';
import { IoMdSave } from 'react-icons/io';
import './style/index.css';
import { getAllList } from '../../data/get-all-lists';

export default function Title(): JSX.Element {
  const { id } = useContext(IdContext);
  const list = getList(id);

  const [showForm, setShowForm] = useState(false);
  const [listName, setListName] = useState('');

  useEffect(() => {
    setListName(list.name);
  }, [id]);

  const handleSubmit = () => {
    const allList = getAllList();

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

  return (
    <>
      <header onClick={() => setShowForm(true)}>
        {id == 0 ? (
          ''
        ) : !showForm ? (
          <div className="list-description">{listName}</div>
        ) : (
          <div className="list-description">
            {
              <Form
                inputChange={(e) => setListName(e.target.value)}
                formSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
                value={listName}
                icon={<IoMdSave size={35} />}
              />
            }
          </div>
        )}
      </header>
    </>
  );
}
