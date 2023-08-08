import Express from "express";
import cors from "cors";
import * as allData from "./db.json" assert { type: "json" };
import todoRouter from "./routes/todoRoutes.js";

const app = Express();
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
app.use(cors());

const todoData = allData.default.todoData;
// console.log("allData => ", allData);
// console.log("todoData => ", todoData);

app.use("/todos", todoRouter);

app.use("/", (req, res, next) => {
  res.send("Welcome to InnoWise Todo backend");
});

app.listen(8020);
console.log("Hello World");
