import { useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import "./App.css";
import { v4 as uuidv4 } from "uuid";
uuidv4();

export interface Task {
  id: string;
  title: string;
  dueDate: string;
  category: string;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (newTask: Task) => {
    const formattedDueDate = new Date(newTask.dueDate);

    // Format the dueDate as a string in "yyyy-MM-dd" format
    const formattedDueDateStr = formattedDueDate.toISOString().split("T")[0];

    const taskWithFormattedDate = { ...newTask, dueDate: formattedDueDateStr };

    taskWithFormattedDate.id = uuidv4();

    // Add the task to the tasks array
    setTasks([...tasks, taskWithFormattedDate]);
  };

  const deleteTask = (id: string) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  return (
    <div>
      <h1>Task Management App</h1>
      <TaskForm addTask={addTask} />
      <TaskList tasks={tasks} deleteTask={deleteTask} />
    </div>
  );
}

export default App;
