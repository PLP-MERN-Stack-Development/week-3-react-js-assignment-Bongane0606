import { useState } from 'react'
import Button from './Button'
import Card from './Card'
import useLocalStorage from '../hooks/useLocalStorage'

const TaskManager = () => {
  const [tasks, setTasks] = useLocalStorage('tasks', [])
  const [newTask, setNewTask] = useState('')
  const [filter, setFilter] = useState('all')

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }])
      setNewTask('')
    }
  }

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed
    if (filter === 'completed') return task.completed
    return true
  })

  return (
    <Card className="max-w-2xl mx-auto my-8">
      <h1 className="text-2xl font-bold mb-4 dark:text-white">Task Manager</h1>
      
      <div className="flex mb-4">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
          className="flex-grow px-4 py-2 border rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        <Button onClick={addTask} className="rounded-l-none">
          Add
        </Button>
      </div>
      
      <div className="flex space-x-2 mb-4">
        <Button 
          variant={filter === 'all' ? 'primary' : 'secondary'} 
          onClick={() => setFilter('all')}
        >
          All
        </Button>
        <Button 
          variant={filter === 'active' ? 'primary' : 'secondary'} 
          onClick={() => setFilter('active')}
        >
          Active
        </Button>
        <Button 
          variant={filter === 'completed' ? 'primary' : 'secondary'} 
          onClick={() => setFilter('completed')}
        >
          Completed
        </Button>
      </div>
      
      <ul className="space-y-2">
        {filteredTasks.map(task => (
          <li 
            key={task.id} 
            className={`flex items-center p-3 border rounded dark:border-gray-600 ${
              task.completed ? 'bg-gray-100 dark:bg-gray-700' : 'bg-white dark:bg-gray-800'
            }`}
          >
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
              className="mr-3 h-5 w-5"
            />
            <span 
              className={`flex-grow dark:text-white ${
                task.completed ? 'line-through text-gray-500' : ''
              }`}
            >
              {task.text}
            </span>
            <Button 
              variant="danger" 
              onClick={() => deleteTask(task.id)}
              className="ml-2"
            >
              Delete
            </Button>
          </li>
        ))}
      </ul>
    </Card>
  )
}

export default TaskManager