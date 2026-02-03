import Todo from "../models/todo.js";

// Create a new todo
const createTodo = async (req, res) => {
  try {
    const { title, userId } = req.body;

    if (!title || !userId) {
      return res.status(400).json({
        message: "Title and userId are required",
      });
    }

    const todo = await Todo.create({ title, userId });
    res.status(201).json({ message: "Todo created", data: todo });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get all todos for a user
const getTodos = async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({
        message: "userId is required in query",
      });
    }

    const todos = await Todo.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json({ data: todos });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// Update a todo (title or completed)
const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, completed, userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }

    const todo = await Todo.findOne({ _id: id, userId });
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    if (title !== undefined) todo.title = title;
    if (completed !== undefined) todo.completed = completed;
    await todo.save();

    res.status(200).json({ message: "Todo updated", data: todo });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// Delete a todo
const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ message: "userId is required in query" });
    }

    const todo = await Todo.findOneAndDelete({ _id: id, userId });
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json({ message: "Todo deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

export { createTodo, getTodos, updateTodo, deleteTodo };
