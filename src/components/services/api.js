import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:11052', // A URL base para suas chamadas de API
});

export const fetchUsers = async () => {
  try {
    const response = await api.get('/users');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
    throw error;
  }
};
