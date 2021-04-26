const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();
const port = 3001;

// Middleware
app.use(cors());
// For PUT and POST requests
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// Get all tasks
app.get("/tasks", async (req, res) => {
  try {
    const tasks = await pool.query("SELECT * FROM tasks ORDER BY id");
    res.json(tasks.rows);
  } catch (err) {
    console.warn(err.message);
    res.status(400).send({ message: "Couldn't get tasks" });
  }
});

// Get individual task
app.get("/tasks/:taskid", async (req, res) => {
  try {
    const { taskid } = req.params;
    const tasks = await pool.query("SELECT * FROM tasks WHERE id = $1", [
      taskid,
    ]);
    res.json(tasks.rows);
  } catch (err) {
    console.warn(err.message);
    res.status(400).send({ message: "Couldn't get task" });
  }
});

// Post new task
app.post("/tasks/new", async (req, res) => {
  try {
    const { details, done } = req.body;
    await pool.query(
      "INSERT INTO tasks (id, details, done) VALUES (default, $1, $2)",
      [details, done]
    );
    res.json({ message: "Success" });
  } catch (err) {
    console.warn(err.message);
    res.status(400).send({ message: "Couldn't post task" });
  }
});

// Edit task
app.put("/tasks/edit/:taskid", async (req, res) => {
  try {
    const { details, done } = req.body;
    const { taskid } = req.params;
    await pool.query("UPDATE tasks SET details = $1, done = $2 WHERE id = $3", [
      details,
      done,
      taskid,
    ]);
    res.json({ message: "Success" });
  } catch (err) {
    console.warn(err.message);
    res.status(400).send({ message: "Couldn't edit task" });
  }
});

// Delete task
app.delete("/tasks/delete/:taskid", async (req, res) => {
  try {
    const { taskid } = req.params;
    await pool.query("DELETE FROM tasks WHERE id = $1", [taskid]);
    res.json({ message: "Success" });
  } catch (err) {
    console.warn(err.message);
    res.status(400).send({ message: "Couldn't delete task" });
  }
});

// Running server
app.listen(port, () => {
  console.log(`Running on http://localhost:${port}`);
});
