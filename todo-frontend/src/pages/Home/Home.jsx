import React, { useState, useEffect } from "react";
import axios from "axios";
import { HomeContainer } from "./style";
import InputBox from "./components/InputBox/InputBox";
import DisplayList from "./components/DisplayList/DisplayList";

const Home = () => {
  const [todos, setTodos] = useState();
  const [editData, setEditData] = useState(null);

  const fetchAllTodos = async () => {
    const res = await axios.get("http://localhost:8020/todos");
    console.log("res.data => ", res.data);
    setTodos(res?.data);
  };

  useEffect(() => {
    fetchAllTodos();
  }, []);

  const updateTodos = async () => {
    try {
      const res = await axios.get("http://localhost:8020/todos");
      console.log("res.data in updateTodos => ", res.data);
      console.log("todos got updated");
      setTodos(res?.data);
      setEditData(null); // Clear editData when updating todos
    } catch (error) {
      console.error("Error updating todos:", error);
    }
  };
  return (
    <HomeContainer>
      <h1>TodoInput</h1>
      <InputBox
        editData={editData}
        setEditData={setEditData}
        updateTodos={updateTodos}
      />
      <DisplayList
        setEditData={setEditData}
        todos={todos}
        setTodos={setTodos}
        updateTodos={updateTodos}
      />
    </HomeContainer>
  );
};

export default Home;
