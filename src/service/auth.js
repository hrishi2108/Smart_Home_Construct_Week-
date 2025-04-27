import axios from 'axios';

const API_URL = 'https://assing-cd7ba-default-rtdb.firebaseio.com';

export const authService = {
  register: async (email, password, name) => {
    try {
      // Sanitize email for Firebase key
      const userId = email.replace(/[.#$[\]]/g, '_');
      
      // Check if user exists
      const response = await axios.get(`${API_URL}/users/${userId}.json`);
      
      if (response.data) {
        throw new Error('Email already registered');
      }

      // Create new user
      const userData = {
        email,
        password,
        name,
        createdAt: new Date().toISOString()
      };
      
      await axios.put(`${API_URL}/users/${userId}.json`, userData);
      
      return {
        success: true,
        user: userData
      };
      
    } catch (error) {
      console.error('Registration error:', error);
      return {
        success: false,
        error: error.message || 'Registration failed'
      };
    }
  },

  login: async (email, password) => {
    try {
      const userId = email.replace(/[.#$[\]]/g, '_');
      const response = await axios.get(`${API_URL}/users/${userId}.json`);
      
      if (!response.data) {
        throw new Error('User not found');
      }
      
      if (response.data.password !== password) {
        throw new Error('Incorrect password');
      }
      
      return {
        success: true,
        user: response.data
      };
      
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        error: error.message || 'Login failed'
      };
    }
  },

  logout: async () => {
    return { success: true };
  }
};