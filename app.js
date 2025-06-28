const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");

const app = express();

app.use(cors());


app.use(express.json());
app.use(bodyParser.json());

let todos = [];

// Helper: Format response
function successResponse(message, data) {
  return { status: "success", message, data };
}

function errorResponse(message) {
  return { status: "error", message };
}

// GET /todos - Ambil semua to-do
app.get("/api/todos", (req, res) => {
  res.json(successResponse("Data retrieved successfully", todos));
});

// POST /todos - Tambah to-do baru
app.post("/api/todos", (req, res) => {
  const { title, description, dueDate } = req.body;

  if (!title || !dueDate) {
    return res
      .status(400)
      .json(errorResponse("Title dan dueDate wajib diisi"));
  }

  const newTodo = {
    id: uuidv4(),
    title,
    description: description || "",
    completed: false,
    dueDate,
    createdAt: new Date().toISOString()
  };

  todos.push(newTodo);
  res.status(201).json(successResponse("To-do created successfully", newTodo));
});

// GET /todos/:id - Ambil detail by ID
app.get("/api/todos/:id", (req, res) => {
  const todo = todos.find(t => t.id === req.params.id);
  if (!todo) {
    return res.status(404).json(errorResponse("To-do with the given ID not found"));
  }
  res.json(successResponse("To-do found", todo));
});

// PUT /todos/:id - Update to-do
app.put("/api/todos/:id", (req, res) => {
  const index = todos.findIndex(t => t.id === req.params.id);
  if (index === -1) {
    return res.status(404).json(errorResponse("To-do with the given ID not found"));
  }

  const { title, description, completed, dueDate } = req.body;
  const updated = {
    ...todos[index],
    title: title ?? todos[index].title,
    description: description ?? todos[index].description,
    completed: completed ?? todos[index].completed,
    dueDate: dueDate ?? todos[index].dueDate
  };

  todos[index] = updated;
  res.json(successResponse("To-do updated successfully", updated));
});

// DELETE /todos/:id - Hapus to-do
app.delete("/api/todos/:id", (req, res) => {
  const index = todos.findIndex(t => t.id === req.params.id);
  if (index === -1) {
    return res.status(404).json(errorResponse("To-do with the given ID not found"));
  }

  const deleted = todos.splice(index, 1)[0];
  res.json(successResponse("To-do deleted successfully", deleted));
});

// Jalankan server
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});