import { nanoid } from "nanoid";
import * as fs from "fs";

import { fileURLToPath } from "url";
import { dirname, join } from "path";

import * as allData from "../db.json" assert { type: "json" };
const todoData = allData.default.todoData;
// Calculate the absolute path to the db.json file
// Get the directory path of the current module using import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// const currentModulePath = new URL(import.meta.url).pathname;
// const currentModuleDir = dirname(currentModulePath);

// Calculate the absolute path to the db.json file
const dbFilePath = join(__dirname, "../db.json");

export const addTodo = async (req, res, next) => {
  const { title } = req.body;
  //console.log("req.body", req.body);
  //console.log("title => ", title);

  if (!title) {
    return res.status(400).json({ message: "No title received", status: 400 });
  }

  let tempObj = {
    id: nanoid(),
    title: title,
    isDone: false,
  };

  console.log("tempObj => ", tempObj);

  try {
    console.log("tempObj inside try block => ", tempObj);
    // todoData.push(tempObj);

    const newData = { ...allData.default, todoData: [...todoData, tempObj] };
    //console.log("this is newData => ", newData);
    fs.writeFile(dbFilePath, JSON.stringify(newData, null, 2), (err) => {
      if (err) {
        console.error("Error writing to file:", err);
      } else {
        console.log("File updated successfully");
      }
    });

    return res
      .status(200)
      .json({ message: "Todo Added successfully", status: 200 });
  } catch (err) {
    console.log("This is error in catch block => ", err);
    return res.status(400).json({
      message: "Something went wrong while pushing title into todos",
      status: 400,
    });
  }
};

export const getAllTodos = async (req, res, next) => {
  let todos;
  try {
    todos = todoData;

    return res.status(200).json(todos);
  } catch (err) {
    console.log("error in catch block of getAllTodos => ", err);
  }
};

export const updateTodo = async (req, res, next) => {
  const editData = req.body;
  console.log("editData => ", editData);
  console.log("req.body => ", req.body);

  if (!editData || !editData.id) {
    return res.status(400).json({ message: "Invalid edit data", status: 400 });
  }

  try {
    // Find the index of the todo with the given id in todoData
    const todoIndex = todoData.findIndex((todo) => todo.id === editData.id);

    if (todoIndex === -1) {
      return res.status(400).json({ message: "Todo not found", status: 400 });
    }

    // Update the todo's properties that are present in the editData
    if (editData.title !== undefined) {
      todoData[todoIndex].title = editData.title;
    }
    if (editData.isDone !== undefined) {
      todoData[todoIndex].isDone = editData.isDone;
    }
    // Write the updated data back to db.json
    fs.writeFile(
      dbFilePath,
      JSON.stringify(allData.default, null, 2),
      (err) => {
        if (err) {
          console.error("Error writing to file:", err);
          return res
            .status(500)
            .json({ message: "Internal server error", status: 500 });
        } else {
          console.log("Todo updated successfully");
          return res
            .status(200)
            .json({ message: "Todo updated successfully", status: 200 });
        }
      }
    );
  } catch (err) {
    console.log("Error in updateTodo:", err);
    return res
      .status(500)
      .json({
        message: "Something went wrong while updating the todo",
        status: 500,
      });
  }
};

export const deleteTodo = async (req, res, next) => {
  const { id } = req.params;

  try {
    const todoIndex = todoData.findIndex((todo) => todo.id === id);

    if (todoIndex === -1) {
      return res.status(404).json({ message: "Todo not found" });
    }

    todoData.splice(todoIndex, 1);

    fs.writeFile(dbFilePath, JSON.stringify({ todoData }, null, 2), (err) => {
      if (err) {
        console.error("Error writing to file:", err);
        return res.status(500).json({ message: "Internal server error" });
      } else {
        console.log("Todo deleted successfully");
        return res.status(200).json({ message: "Todo deleted successfully" });
      }
    });
  } catch (err) {
    console.log("Error in deleteTodo:", err);
    return res
      .status(500)
      .json({ message: "Something went wrong while deleting the todo" });
  }
};
