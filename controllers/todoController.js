let todos = [];

exports.getTodos = (req, res) => {
  res.json({
    status: "Sukses",
    message: "Data to-do berhasil diambil",
    data: todos
  });
};

exports.addTodo = (req, res) => {
  const { title, description, dueDate } = req.body;
  const newTodo = {
    id: todos.length + 1,
    title,
    description,
    completed: false,
    dueDate,
    createdAt: new Date().toISOString()
  };
  todos.push(newTodo);
  res.json({
    status: "Sukses",
    message: "Berhasil menambahkan to-do baru",
    data: newTodo
  });
};

exports.getTodoById = (req, res) => {
  const { id } = req.params;
  const todo = todos.find(t => t.id === parseInt(id));
  
  if (!todo) {
    return res.json({
      status: "Error",
      message: "Tidak ada to-do dengan ID yang diberikan"
    });
  }
  
  res.json({
    status: "Sukses",
    message: "Data to-do berhasil diambil",
    data: todo
  });
};

exports.updateTodo = (req, res) => {
  const { id } = req.params;
  const { title, description, dueDate, completed } = req.body;
  const todoIndex = todos.findIndex(t => t.id === parseInt(id));

  if (todoIndex === -1) {
    return res.json({
      status: "Error",
      message: "Tidak ada to-do dengan ID yang diberikan"
    });
  }

  todos[todoIndex] = {
    id: parseInt(id),
    title,
    description,
    completed,
    dueDate,
    createdAt: todos[todoIndex].createdAt
  };

  res.json({
    status: "Sukses",
    message: "Berhasil memperbarui to-do",
    data: todos[todoIndex]
  });
};

exports.deleteTodo = (req, res) => {
  const { id } = req.params;
  const todoIndex = todos.findIndex(t => t.id === parseInt(id));

  if (todoIndex === -1) {
    return res.json({
      status: "Error",
      message: "Tidak ada to-do dengan ID yang diberikan"
    });
  }

  todos.splice(todoIndex, 1);
  
  res.json({
    status: "Sukses",
    message: "Berhasil menghapus to-do",
  });
};
