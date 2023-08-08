import Express from "express";
import {
  addTodo,
  deleteTodo,
  getAllTodos,
  updateTodo,
} from "../controller/todoController.js";

const todoRouter = Express.Router();

todoRouter.post("/add", addTodo);
todoRouter.get("/", getAllTodos);
todoRouter.patch("/update", updateTodo);
todoRouter.delete("/:id", deleteTodo);

export default todoRouter;
