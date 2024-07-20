import React, { useContext } from 'react';
import { IdContext } from '../context/IdContex';
import { getList } from '../data/get-list';

export default function Title(): JSX.Element {
  const { id } = useContext(IdContext);
  const list = getList(id);

  return (
    <>
      <header>{id == 0 ? '' : list.name}</header>
    </>
  );
}
