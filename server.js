const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let tasks = [];

// READ
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// CREATE
app.post("/tasks", (req, res) => {
  const task = {
    id: Date.now(),
    title: req.body.title,
    done: false
  };
  tasks.push(task);
  res.json(task);
});

// UPDATE
app.put("/tasks/:id", (req, res) => {
  let task = tasks.find(t => t.id == req.params.id);
  if (task) task.done = !task.done;
  res.json(task);
});

// DELETE
app.delete("/tasks/:id", (req, res) => {
  tasks = tasks.filter(t => t.id != req.params.id);
  res.json({ message: "Deleted" });
});

app.listen(5000, () => {
  console.log("Task 3 running on 5000");
});