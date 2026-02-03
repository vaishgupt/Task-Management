import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import image from "../assets/image.png";
import { api } from "../api";

const Todo = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const fetchTodos = async () => {
    if (!userId) {
      navigate("/signin");
      return;
    }
    try {
      const res = await api.getTodos(userId);
      const data = await res.json();
      if (res.ok) {
        setTasks(data.data || []);
      }
    } catch (err) {
      setError("Failed to load todos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTask = async () => {
    if (task.trim() === "" || !userId) return;
    try {
      const res = await api.createTodo({ title: task, userId });
      if (res.ok) {
        setTask("");
        fetchTodos();
      } else {
        const data = await res.json();
        setError(data.message || "Failed to add task");
      }
    } catch (err) {
      setError("Failed to add task");
    }
  };

  const toggleComplete = async (todo) => {
    if (!userId) return;
    try {
      const res = await api.updateTodo(todo._id, {
        userId,
        completed: !todo.completed,
      });
      if (res.ok) {
        fetchTodos();
      }
    } catch (err) {
      setError("Failed to update task");
    }
  };

  const deleteTodo = async (id) => {
    if (!userId) return;
    try {
      const res = await api.deleteTodo(id, userId);
      if (res.ok) {
        fetchTodos();
      }
    } catch (err) {
      setError("Failed to delete task");
    }
  };

  if (!userId) {
    return null;
  }

  if (loading) {
    return (
      <div className="screen">
        <div className="card"><p>Loading...</p></div>
      </div>
    );
  }

  return (
    <div className="screen">
      <div className="card todo-card">
        <div className="todo-header">
          <img src={image} alt="avatar" className="todo-header__img" />
          <h2 className="todo-header__title">Welcome!</h2>
        </div>
        <div className="todo-content">
          {error && <p className="error">{error}</p>}
          <div className="todo-add">
            <input
              type="text"
              placeholder="Enter Task"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
            <button type="button" className="btn btn--small" onClick={addTask}>Add Task</button>
          </div>
          <h3 className="todo-list__heading">Daily task</h3>
          <ul className="todo-list">
            {tasks.map((t) => (
              <li key={t._id} className="todo-item">
                <input
                  type="checkbox"
                  checked={t.completed}
                  onChange={() => toggleComplete(t)}
                  className="todo-item__checkbox"
                />
                <span className={t.completed ? "todo-item__text done" : "todo-item__text"}>
                  {t.title}
                </span>
                <button type="button" className="todo-item__delete" onClick={() => deleteTodo(t._id)} aria-label="Delete">🗑️</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Todo;