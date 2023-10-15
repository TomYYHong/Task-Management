import React from "react";
import { Task } from "../App";

interface TaskListProps {
  tasks: Task[];
  deleteTask: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, deleteTask }) => {
  if (tasks.length === 0) {
    return <p>No tasks to display.</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Due Date</th>
          <th>Category</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => (
          <tr key={task.id}>
            <td>{task.title}</td>
            <td>{task.dueDate.toString()}</td>
            <td>{task.category}</td>
            <td>
              <button onClick={() => deleteTask(task.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TaskList;
