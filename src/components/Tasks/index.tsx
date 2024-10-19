import React, { useContext, useEffect, useState } from 'react';
import Button from '../Button';
import Form from '../Form';
import { getAllList } from '../../data/get-all-lists';
import { IdContext } from '../../context/IdContex';
import { getList } from '../../data/get-list';
import './style/index.css';
import { BaseList } from '../../types/baseList';
import { MdDeleteOutline } from 'react-icons/md';
import { IoAddCircleOutline } from 'react-icons/io5';
import { MdOutlineDone } from 'react-icons/md';
import { IoMdSave } from 'react-icons/io';

export default function Tasks(): JSX.Element {
  const { id } = useContext(IdContext);
  const [list, setList] = useState<BaseList>({ id: 0, name: '', tasks: [] });
  const [newTask, setNewTask] = useState('');
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);

  const [showForm, setShowForm] = useState(false);
  const [indexEdit, setIndexEdit] = useState(-1);

  const allLists = getAllList();

  useEffect(() => {
    setList(getList(id));
  }, [id]);

  const handleSubmit = () => {
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
        allLists[index] = list;

        const json = JSON.stringify(allLists);
        localStorage.setItem('listTask', json);
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

  const notCompleted = (task: string, i: number) => {
    const tasks = getList(id).tasks;
    const newTasks = [...tasks];

    newTasks.push(task);
    list.tasks = newTasks;

    allLists.map((el, index) => {
      if (el.id == list.id) {
        allLists[index] = list;

        const json = JSON.stringify(allLists);
        localStorage.setItem('listTask', json);

        completedTasks.splice(i, 1);
        setList(getList(id));
        return;
      }
    });
  };

  return (
    <>
      <ul className="tasks">
        {list.tasks &&
          list.tasks.map((task, index) =>
            indexEdit != index ? (
              <li key={index}>
                <div className="bg-check">
                  <div
                    onClick={() => {
                      const i = [...completedTasks, task];
                      setCompletedTasks(i);
                      handleDelete(index);
                    }}
                  ></div>
                </div>
                <div
                  className="description"
                  onClick={() => {
                    setIndexEdit(index);
                    setNewTask(task);
                  }}
                >
                  {task}
                </div>
                <span>
                  <Button
                    icon={<MdDeleteOutline size={17} />}
                    onClick={() => {
                      handleDelete(index);
                    }}
                  />
                </span>
              </li>
            ) : (
              <li key={index} className="container-edit">
                <Form
                  inputChange={(e) => setNewTask(e.target.value)}
                  formSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                  }}
                  value={newTask}
                  icon={<IoMdSave size={23} />}
                />
              </li>
            ),
          )}
        {id != 0 ? (
          <div className="task-container-add">
            {showForm && (
              <Form
                inputChange={(e) => setNewTask(e.target.value)}
                formSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
                value={newTask}
                icon={<IoMdSave size={23} />}
              />
            )}
            <Button
              icon={<IoAddCircleOutline size={50} />}
              onClick={() => setShowForm(!showForm)}
            />
          </div>
        ) : (
          ''
        )}
      </ul>
      {list.tasks && (
        <div className="bg-completed-task">
          <div className="container-completed-task">
            <div className="icon-completed-task">
              <div>
                <MdOutlineDone size={27} />
              </div>
            </div>
            <ul className="completed-task">
              {completedTasks.map((t, i) => (
                <li key={i} onClick={() => notCompleted(t, i)}>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
