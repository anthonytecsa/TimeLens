import axios from "axios";

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:5000";

export const getTimelineData = async (searchText) => {
  // const response = await axios.get(`${API_BASE_URL}/timeline`, {
  //   params: { search: searchText },
  // });
  // return response.data;
  
  const nodes = [
    {
      id: 0,
      title: "Node 1",
      content: "Hi test",
      eventDetails: {
        title: "Event 1",
        description: "Detailed description for Event 1",
        date: "2023",
      },
    },
    {
      id: 1,
      title: "Node 2",
      content: "Content for Node 2",
      eventDetails: {
        title: "Event 1",
        description: "Detailed description for Event 1",
        date: "2023",
      },
    },
    {
      id: 2,
      title: "Node 3",
      content: "Content for Node 3",
      eventDetails: {
        title: "Event 1",
        description: "Detailed description for Event 1",
        date: "2023",
      },
    },
    {
      id: 3,
      title: "Node 4",
      content: "Content for Node 4",
      eventDetails: {
        title: "Event 1",
        description: "Detailed description for Event 1",
        date: "2023",
      },
    },
  ];

  return nodes; // api isnt sent for now, just use this as test
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
