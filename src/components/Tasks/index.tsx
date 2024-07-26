import React, { FormEvent, useContext, useEffect, useState } from 'react';
import Button from '../Button';
import Form from '../Form';
import { getAllList } from '../../data/get-all-lists';
import { IdContext } from '../../context/IdContex';
import { getList } from '../../data/get-list';
import './style.css';
import { BaseList } from '../../types/baseList';

export default function Tasks(): JSX.Element {
  const { id } = useContext(IdContext);
  const [newTask, setNewTask] = useState('');
  const [list, setList] = useState<BaseList>({ id: 0, name: '', tasks: [] });
  const [showForm, setShowForm] = useState(false);
  const [indexEdit, setIndexEdit] = useState(-1);

  const allLists = getAllList();

  useEffect(() => {
    setList(getList(id));
  }, [id]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const tasks = getList(id).tasks;
    const newTasks = [...tasks];

    if (indexEdit == -1) {
      newTasks.push(newTask);
      list.tasks = newTasks;

      setNewTask('');
    } else {
      newTasks[indexEdit] = newTask;
      list.tasks = newTasks;

      setNewTask('');
      setIndexEdit(-1);
    }

    allLists.map((el, index) => {
      if (el.id == list.id) {
        console.log(list);
        allLists[index] = list;

        const json = JSON.stringify(allLists);
        localStorage.setItem('listTask', json);

        // setList(getList(id));
        return;
      }
    });
  };

  const handleDelete = (index: number) => {
    list.tasks.splice(index, 1);

    allLists.map((el, i) => {
      if (el.id == list.id) {
        allLists[i] = list;

        const json = JSON.stringify(allLists);
        localStorage.setItem('listTask', json);

        setList(getList(id));
        return;
      }
    });
  };

  return (
    <main>
      <ul>
        {list.tasks &&
          list.tasks.map((task, index) => (
            <li key={index}>
              <div>{task}</div>
              <span>
                <Button
                  text="del"
                  onClick={() => {
                    handleDelete(index);
                  }}
                />
                <Button
                  text="edit"
                  onClick={() => {
                    setShowForm(true);
                    setNewTask(task);
                    setIndexEdit(index);
                  }}
                />
              </span>
            </li>
          ))}
        {id != 0 ? (
          <div className="btn-add">
            <Button text="+" onClick={() => setShowForm(!showForm)} />
          </div>
        ) : (
          ''
        )}
      </ul>
      {showForm && (
        <Form
          inputChange={(e) => setNewTask(e.target.value)}
          formSubmit={(e) => handleSubmit(e)}
          value={newTask}
          textButton="to salve"
        />
      )}
    </main>
  );
}
