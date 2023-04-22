import React, { useState } from "react";
import "./App.css";
import TodoForm from "./components/ToDoForm";
import ToDoList from "./components/ToDoList";

const App = () => {
  const [todo, setTodo] = useState(""); // use to add single todo
  const [todos, setTodos] = useState([]); // This array will contain all the Todos
  const [editId, setEditId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      const editTodo = todos.find((i) => i.id === editId);
      editTodo.todo=todo;
      // const updatedTodos = todos.map((t) =>
      //   t.id === editTodo.id
      //     ? (t = { id: t.id, todo })
      //     : { id: t.id, todo: t.todo }
      // );
      // setTodos(updatedTodos);
      setEditId("");
      setTodo("");
      return;
    }

    if (todo !== "") {
      setTodos([{ id: `${todo}-${Date.now()}`, todo }, ...todos]);
      setTodo("");
    }
  };

  const handleDelete = (id) => {
    const delTodo = todos.filter((to) => to.id !== id); // delTodo will contain alll the todo except one whose id was equal to the passed id parameter because we have deleted that
    setTodos([...delTodo]);
  };

  const handleEdit = (id) => {
    const editTodo = todos.find((i) => i.id === id); // it will return an object with the same id as passsed one
    setTodo(editTodo.todo);
    setEditId(id);
  };

  return (
      <div className="container">
        <h1>Todo List App</h1>
        <TodoForm
          handleSubmit={handleSubmit}
          todo={todo}
          editId={editId}
          setTodo={setTodo}
        />

        <ToDoList
          todos={todos}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      </div>
  );
};

export default App;
