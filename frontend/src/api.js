// Base URL for backend API - uses Vite proxy in dev (/api -> http://localhost:5000)
const API_BASE = '/api';

export const api = {
  // Auth
  register: (data) =>
    fetch(`${API_BASE}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }),

  login: (data) =>
    fetch(`${API_BASE}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }),

  // Todos
  getTodos: (userId) =>
    fetch(`${API_BASE}/todos?userId=${userId}`),

  createTodo: (data) =>
    fetch(`${API_BASE}/todos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }),

  updateTodo: (id, data) =>
    fetch(`${API_BASE}/todos/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }),

  deleteTodo: (id, userId) =>
    fetch(`${API_BASE}/todos/${id}?userId=${userId}`, {
      method: 'DELETE',
    }),
};
