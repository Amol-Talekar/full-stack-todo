import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  ActionBox,
  ActionButton,
  DeleteButtonsBox,
  DisplayButtonGroup,
  DisplayContainer,
  SingleTodoBox,
  TodoGroupBox,
} from "./style";

import edit from "../../../../assets/edit.png";

import deleteIcon from "../../../../assets/delete.png";

const DisplayList = ({ setEditData, todos, setTodos, updateTodos }) => {
  const [filteredTodos, setFilteredTodos] = useState();
  const [deleteStatus, setDeleteStatus] = useState("");
  const [deleteStatusMessage, setDeleteStatusMessage] = useState("");
  const [editStatusMessage, setEditStatusMessage] = useState("");
  const [editStatus, setEditStatus] = useState(0);
  useEffect(() => {
    if (todos) {
      setFilteredTodos(todos);
    }
  }, [todos]);

  const handleEditClick = (todo) => {
    setEditData(todo);
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:8020/todos/${id}`);
      console.log("Delete response:", res);
      setDeleteStatus(res?.status);
      setDeleteStatusMessage(res?.data?.message);
      updateTodos();
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const handleCheckboxToggle = async (id) => {
    try {
      // Find the todo to update
      const todoIndex = todos.findIndex((item) => item.id === id);
      if (todoIndex === -1) return;

      // Update the done state
      const updatedTodo = {
        ...todos[todoIndex],
        isDone: !todos[todoIndex].isDone,
      };

      // Send the updated todo to the backend
      const res = await axios.patch(
        `http://localhost:8020/todos/update`,
        updatedTodo
      );

      if (res) {
        setEditStatus(res?.status);
        setEditStatusMessage(res?.data?.message);
      }

      // Update the local state and trigger list update
      const updatedTodos = [...todos];
      updatedTodos[todoIndex] = updatedTodo;

      // Update the filteredTodos state as well
      const filteredUpdatedTodos = [...filteredTodos];
      const filteredTodoIndex = filteredUpdatedTodos.findIndex(
        (item) => item.id === id
      );
      if (filteredTodoIndex !== -1) {
        filteredUpdatedTodos[filteredTodoIndex] = updatedTodo;
        setFilteredTodos(filteredUpdatedTodos);
      }

      setTodos(updatedTodos);
    } catch (error) {
      console.error("Error updating checkbox:", error);
    }
  };

  const handleFilter = (filterType) => {
    let filteredTodos = [];
    if (filterType === "all") {
      filteredTodos = todos;
    } else if (filterType === "done") {
      filteredTodos = todos.filter((item) => item.isDone);
    } else if (filterType === "pending") {
      filteredTodos = todos.filter((item) => !item.isDone);
    }
    setFilteredTodos(filteredTodos);
  };

  const handleDeleteDoneTasks = async () => {
    try {
      // Find the IDs of tasks with isDone set to true
      const doneTaskIds = filteredTodos
        .filter((item) => item.isDone)
        .map((item) => item.id);

      // Delete the tasks from the backend
      for (const id of doneTaskIds) {
        await axios.delete(`http://localhost:8020/todos/${id}`);
      }

      // Update the local state and trigger list update
      const updatedTodos = todos.filter(
        (item) => !doneTaskIds.includes(item.id)
      );
      setTodos(updatedTodos);
      setFilteredTodos(updatedTodos);
    } catch (error) {
      console.error("Error deleting done tasks:", error);
    }
  };

  const handleDeleteAllTasks = async () => {
    try {
      // Delete all tasks from the backend
      for (const item of filteredTodos) {
        await axios.delete(`http://localhost:8020/todos/${item.id}`);
      }

      // Clear local state
      setTodos([]);
      setFilteredTodos([]);
    } catch (error) {
      console.error("Error deleting all tasks:", error);
    }
  };

  useEffect(() => {
    console.log("test");
    if (
      editStatus >= 200 &&
      editStatus < 240 &&
      editStatusMessage?.length > 0
    ) {
      toast.success(editStatusMessage);
      setEditStatusMessage("");
    }

    if (editStatus >= 400 && editStatusMessage?.length > 0) {
      toast.error(editStatusMessage);
      setEditStatusMessage("");
    }
  }, [editStatus, editStatusMessage, handleCheckboxToggle]);

  useEffect(() => {
    if (
      deleteStatus >= 200 &&
      deleteStatus < 240 &&
      deleteStatusMessage?.length > 0
    ) {
      toast.success(deleteStatusMessage);
      setDeleteStatusMessage("");
    }

    if (deleteStatus >= 400 && deleteStatusMessage?.length > 0) {
      toast.error(deleteStatusMessage);
      setDeleteStatusMessage("");
    }
  }, [deleteStatus, deleteStatusMessage]);

  return (
    <DisplayContainer>
      <h2>Todo List</h2>
      <DisplayButtonGroup>
        <button onClick={() => handleFilter("all")}>All</button>
        <button onClick={() => handleFilter("done")}>Done</button>
        <button onClick={() => handleFilter("pending")}>Pending</button>
      </DisplayButtonGroup>
      {filteredTodos?.length > 0 ? (
        <TodoGroupBox>
          {filteredTodos.map((item, index) => (
            <SingleTodoBox key={item.id}>
              <p className={item.isDone ? "done" : ""}>{item.title}</p>

              <ActionBox>
                <input
                  type="checkbox"
                  checked={item.isDone}
                  onChange={() => handleCheckboxToggle(item.id)}
                />
                <ActionButton onClick={() => handleEditClick(item)}>
                  <img src={edit} alt="edit" />
                </ActionButton>
                <ActionButton onClick={() => handleDelete(item.id)}>
                  <img src={deleteIcon} alt="delete" />
                </ActionButton>
              </ActionBox>
            </SingleTodoBox>
          ))}
        </TodoGroupBox>
      ) : (
        <h3>No Todo to display</h3>
      )}

      <DeleteButtonsBox>
        <button onClick={handleDeleteDoneTasks}>Delete Done Tasks</button>
        <button onClick={handleDeleteAllTasks}>Delete All Tasks</button>
      </DeleteButtonsBox>
    </DisplayContainer>
  );
};

export default DisplayList;
