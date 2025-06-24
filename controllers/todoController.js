const { v4: uuidv4 } = require('uuid');

let todos = [];

exports.getTodos = (req, res) => {
  res.json({
    status: "success",
    message: "Data retrieved successfully",
    data: todos
  });
};

exports.addTodo = (req, res) => {
  const { title, description, dueDate } = req.body;

  // Validasi input
  if (!title || !dueDate) {
    return res.status(400).json({
      status: "error",
      message: "Judul dan Tanggal Deadline wajib diisi"
    });
  }

  const newTodo = {
    id: uuidv4(),  // Generate a unique ID using uuid
    title,
    description: description || "",
    completed: false,  // Default status completed = false
    dueDate,  // Menggunakan format string yang sama seperti frontend (YYYY-MM-DD)
    createdAt: new Date().toISOString()
  };

  todos.push(newTodo);
  res.json({
    status: "success",
    message: "Data created successfully",
    data: newTodo
  });
};

exports.getTodoById = (req, res) => {
  const { id } = req.params;
  const todo = todos.find(t => t.id === parseInt(id));

  if (!todo) {
    return res.status(404).json({
      status: "error",
      message: "To-do with the given ID not found"
    });
  }

  res.json({
    status: "success",
    message: "Data retrieved successfully",
    data: todo
  });
};

exports.updateTodo = (req, res) => {
  const { id } = req.params;
  const { title, description, dueDate, completed } = req.body;

  if (!title || !dueDate) {
    return res.status(400).json({
      status: "error",
      message: "Judul dan Tanggal Deadline wajib diisi"
    });
  }

  const todoIndex = todos.findIndex(t => t.id === parseInt(id));

  if (todoIndex === -1) {
    return res.status(404).json({
      status: "error",
      message: "To-do with the given ID not found"
    });
  }

  // Update todo
  todos[todoIndex] = {
    id: parseInt(id),
    title,
    description,
    completed: completed !== undefined ? completed : todos[todoIndex].completed,  // Update completed jika ada data
    dueDate,
    createdAt: todos[todoIndex].createdAt
  };

  res.json({
    status: "success",
    message: "Data updated successfully",
    data: todos[todoIndex]
  });
};

exports.deleteTodo = (req, res) => {
  const { id } = req.params;
  const todoIndex = todos.findIndex(t => t.id === parseInt(id));

  if (todoIndex === -1) {
    return res.status(404).json({
      status: "error",
      message: "To-do with the given ID not found"
    });
  }

  todos.splice(todoIndex, 1);

  res.json({
    status: "success",
    message: "Data deleted successfully",
  });
};