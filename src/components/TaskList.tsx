import { useState } from 'react'
import { useAlert } from 'react-alert'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
    //Modelo 1:
    /*if(newTaskTitle != '')
    {
      
      const newTasks : Task[] = [...tasks,
                                  {
                                    id:Math.floor(Math.random() * 1000000),
                                    title:newTaskTitle,
                                    isComplete:false
                                  }
                              ];
      setTasks(newTasks);
    }*/

    //Modelo 2:
    if(!newTaskTitle) return;

    const newTask ={
      id:Math.floor(Math.random() * 1000000),
      title:newTaskTitle,
      isComplete:false
    }
    setTasks(oldValue=> [...oldValue,newTask]);


    setNewTaskTitle('');
    
    
  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
    //Modelo 1:
     /* let newTasks : Task[] = [];
      tasks.forEach(task=>{
          if(task.id === id)
            task.isComplete = !task.isComplete;
          
          newTasks.push(task);
      })
    setTasks(newTasks);*/

    //Modelo 2
    const newTasks = tasks.map(task=> task.id === id ? {
      ...task,
      isComplete: !task.isComplete
    }: task);

    setTasks(newTasks);
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID
    //Modelo 1:
    /*let newTasks : Task[] = [];
      tasks.forEach(task=>{
          if(task.id != id)
            newTasks.push(task);
      })*/
    
    //Modelo 2
    const newTasks = tasks.filter(filter=> filter.id != id);
    setTasks(newTasks);
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}