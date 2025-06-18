const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');

// Definisikan endpoint-endpoint
router.get('/todos', todoController.getTodos);
router.post('/todos', todoController.addTodo);
router.get('/todos/:id', todoController.getTodoById);
router.put('/todos/:id', todoController.updateTodo);
router.delete('/todos/:id', todoController.deleteTodo);

module.exports = router;