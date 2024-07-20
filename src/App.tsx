import React from 'react';
import Title from './components/Title';
import Lists from './components/Lists';
import Tasks from './components/Tasks';
import { IdProvider } from './context/IdContex';

export default function App(): JSX.Element {
  return (
    <IdProvider>
      <Title />
      <Lists />
      <Tasks />
    </IdProvider>
  );
}
