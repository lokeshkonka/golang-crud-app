import axios from 'axios';
import type { Todo } from '../types/todo';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const todosApi = {
  // GET /api/todos
  getTodos: async (): Promise<Todo[]> => {
    const response = await api.get<Todo[]>('/todos');
    return response.data || [];
  },

  // POST /api/todos
  createTodo: async (body: string): Promise<Todo> => {
    const response = await api.post<Todo>('/todos', {
      body,
      completed: false,
    });
    return response.data;
  },

  // PATCH /api/todos/:id
  updateTodo: async (id: string): Promise<{ success: boolean }> => {
    const response = await api.patch<{ success: boolean }>(`/todos/${id}`);
    return response.data;
  },

  // DELETE /api/todos/:id
  deleteTodo: async (id: string): Promise<{ success: boolean }> => {
    const response = await api.delete<{ success: boolean }>(`/todos/${id}`);
    return response.data;
  },
};
