import axios from "axios";

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:5000";

export const getTimelineData = async (searchText) => {
  // const response = await axios.get(`${API_BASE_URL}/timeline`, {
  //   params: { search: searchText },
  // });
  // return response.data;
  return [
    {
      id: 1,
      date: "2023",
      title: "Sample Event",
      description: "This is a test event"
    }
    // Add more timeline items as needed
  ]; // api isnt sent for now, just use this as test
};

export const getPersonaDialogue = async (personaId, userInput) => {
  const response = await axios.post(
    `${API_BASE_URL}/persona/${personaId}/dialogue`,
    {
      input: userInput,
    }
  );
  return response.data;
};
