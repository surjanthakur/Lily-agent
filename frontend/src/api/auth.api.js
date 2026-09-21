import apiClient from './Client.api.js';

const loginUser = async () => {
  try {
    const response = await apiClient.get('/google/login');
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export { loginUser };
