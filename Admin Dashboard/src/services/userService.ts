import axios from 'axios';
import type { AxiosRequestConfig } from 'axios';

// Define the base URL for the API
const API_BASE_URL = 'http://localhost:3000/api'; // Change this to your actual API URL

// Define interfaces
export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  location?: string;
  role: 'super_admin' | 'admin' | 'moderator' | 'viewer' | 'reporter';
  status: 'active' | 'inactive' | 'suspended' | 'pending';
  permissions: string[];
  lastActive: string;
  createdAt: string;
  lastLogin?: string;
  failedLoginAttempts?: number;
}

export interface CreateUserData {
  name: string;
  email: string;
  phone?: string;
  location?: string;
  role: User['role'];
  status: User['status'];
}

export interface UpdateUserData {
  name?: string;
  email?: string;
  phone?: string;
  location?: string;
  role?: User['role'];
  status?: User['status'];
  permissions?: string[];
}

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for authentication
api.interceptors.request.use((config: AxiosRequestConfig) => {
  const token = localStorage.getItem('auth_token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// User service functions
export const userService = {
  // Get all users
  getAllUsers: async (): Promise<User[]> => {
    try {
      const response = await api.get<User[]>('/users');
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },

  // Get user by ID
  getUserById: async (id: string): Promise<User> => {
    try {
      const response = await api.get<User>(`/users/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching user ${id}:`, error);
      throw error;
    }
  },

  // Create new user
  createUser: async (userData: CreateUserData): Promise<User> => {
    try {
      const response = await api.post<User>('/users', userData);
      return response.data;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  },

  // Update user
  updateUser: async (id: string, userData: UpdateUserData): Promise<User> => {
    try {
      const response = await api.put<User>(`/users/${id}`, userData);
      return response.data;
    } catch (error) {
      console.error(`Error updating user ${id}:`, error);
      throw error;
    }
  },

  // Delete user
  deleteUser: async (id: string): Promise<void> => {
    try {
      await api.delete(`/users/${id}`);
    } catch (error) {
      console.error(`Error deleting user ${id}:`, error);
      throw error;
    }
  },

  // Update user permissions
  updateUserPermissions: async (id: string, permissions: string[]): Promise<User> => {
    try {
      const response = await api.put<User>(`/users/${id}/permissions`, { permissions });
      return response.data;
    } catch (error) {
      console.error(`Error updating permissions for user ${id}:`, error);
      throw error;
    }
  },

  // Toggle user status
  toggleUserStatus: async (id: string, status: User['status']): Promise<User> => {
    try {
      const response = await api.put<User>(`/users/${id}/status`, { status });
      return response.data;
    } catch (error) {
      console.error(`Error toggling status for user ${id}:`, error);
      throw error;
    }
  },

  // Search users
  searchUsers: async (query: string): Promise<User[]> => {
    try {
      const response = await api.get<User[]>(`/users/search?q=${encodeURIComponent(query)}`);
      return response.data;
    } catch (error) {
      console.error('Error searching users:', error);
      throw error;
    }
  },

  // Get users by role
  getUsersByRole: async (role: User['role']): Promise<User[]> => {
    try {
      const response = await api.get<User[]>(`/users/role/${role}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching users with role ${role}:`, error);
      throw error;
    }
  },

  // Get users by status
  getUsersByStatus: async (status: User['status']): Promise<User[]> => {
    try {
      const response = await api.get<User[]>(`/users/status/${status}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching users with status ${status}:`, error);
      throw error;
    }
  }
}; 