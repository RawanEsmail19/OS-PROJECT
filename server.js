const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 3000;

// Middleware to parse JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/todo')
.then(
    () => console.log("Connected to MongoDB")
)
    .catch(err => console.error("MongoDB Connection Error:", err));

// Define todo Schema
const todoSchema
    = new mongoose.Schema({
    task: String,
    done: Boolean
});

// Create todo Model
const todo = mongoose.model('todo', todoSchema);

// Get all todos
app.get('/todos', async (req, res) => {
    try {
        const todos = await todo.find();
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add a new todo
app.post('/todos', async (req, res) => {
    const { task, done } = req.body;
    if (!task || done == undefined ) {
        return res.status(400).json({ message: "task and done are required" });
    }

    try {
        const newtodo
            = new todo({ task, done });
        await newtodo.save();
        res.status(201).json(newtodo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a todo by ID
app.get('/todos/:id', async (req, res) => {
    try {
        const todo =
            await todo.findById(req.params.id);
        if (!todo) {
            return res.status(404).json({ message: "todo not found" });
        }
        res.json(todo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


//update a todo by ID
app.put('/todos/:id', async (req, res) => {
    try {
      const updatedTodo = await todo.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true} 
      );
      res.status(200).json(updatedTodo);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  

// Delete a todo by ID
app.delete('/todos/:id', async (req, res) => {
    try {
        const deletedtodo =
            await todo.findByIdAndDelete(req.params.id);
        if (!deletedtodo) {
            return res.status(204).json({ message: "todo not found" });
        }
        res.json({ message: "todo deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Start the server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});