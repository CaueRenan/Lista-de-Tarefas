import React, { useContext } from 'react';
import { IdContext } from '../../context/IdContex';
import { getList } from '../../data/get-list';
import './style/index.css';

export default function Title(): JSX.Element {
  const { id } = useContext(IdContext);
  const list = getList(id);

  return (
    <>
      <header>
        {id != 0 && <div className="list-description">{list.name} </div>}
      </header>
    </>
  );
}
