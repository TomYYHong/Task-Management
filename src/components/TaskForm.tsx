import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Task } from "../App";
import categories from "./categories";

interface TaskFomrProps {
  addTask: (newTask: Task) => void;
}

const TaskForm: React.FC<TaskFomrProps> = ({ addTask }) => {
  const initialValues: Task = {
    id: "",
    title: "",
    dueDate: new Date().toISOString().split("T")[0],
    category: "Work",
  };

  const yesterday = new Date(); // Get today's date
  yesterday.setDate(yesterday.getDate() - 1); // Subtract one day to get yesterday's date

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    dueDate: Yup.date()
      .required("Due date is required")
      .min(yesterday, "Due date can't be before today")
      .typeError("Invalid date"), // Handle invalid date format
    category: Yup.string().required("Category is required"),
  });

  const onSubmit = (values: Task) => {
    addTask(values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form>
        <div>
          <label htmlFor="title">Title</label>
          <Field type="text" id="title" name="title" />
          <ErrorMessage name="title" component="div" />
        </div>

        <div>
          <label htmlFor="dueDate">Due Date</label>
          <Field type="date" id="dueDate" name="dueDate" />
          <ErrorMessage name="dueDate" component="div" />
        </div>

        <div>
          <label htmlFor="category">Category</label>
          <Field as="select" id="category" name="category">
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </Field>
          <ErrorMessage name="category" component="div" />
        </div>

        <button type="submit">Add Task</button>
      </Form>
    </Formik>
  );
};

export default TaskForm;
