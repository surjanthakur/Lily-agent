import apiClient from './Client.api.js';

const getAgentResponse = async (user_input = String) => {
  try {
    const response = await apiClient.post('/agent/asks', {
      user_query: user_input,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export { getAgentResponse };
