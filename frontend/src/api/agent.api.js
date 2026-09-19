import apiClient from './Client.api.js'

export const getAgentResponse = async (user_query = String) => {
  try {
    const response = await apiClient.post('/agent/ask', { query: user_query })
    return response.data
  } catch (error) {
    console.log(error)
    throw error
  }
}
