import axios from 'axios';

const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:5000';

export const getTimelineData = async () => {
  const response = await axios.get(`${API_BASE_URL}/timeline`);
  return response.data;
};

export const getPersonaDialogue = async (personaId, userInput) => {
  const response = await axios.post(`${API_BASE_URL}/persona/${personaId}/dialogue`, {
    input: userInput,
  });
  return response.data;
};
