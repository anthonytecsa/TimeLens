import axios from "axios";

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:5000";

// Search Text is the event name
export const getTimelineData = async (event) => {
  const nodes = [
    {
      id: 0,
      title: "Node 1",
      content: "Hi test",
      event: "Event 1"
    },
    {
      id: 1,
      title: "Node 2",
      content: "Content for Node 2",
      event: "Event 1"
    },
    {
      id: 2,
      title: "Node 3",
      content: "Content for Node 3",
      event: "Event 1"
    },
    {
      id: 3,
      title: "Node 4",
      content: "Content for Node 4",
      event: "Event 1"
    },
  ];

  return nodes; // api isnt sent for now, just use this as test
};

export const getTimelineData2 = async (event) => {
  const nodes = [];

  for(let i = 0; i < 3; i++) {
      const response = await axios.get(`${API_BASE_URL}/generate`, {
        params: { event: event },
      });
      nodes.push(
      {id: response.data.id, title: response.data.subevent_title, content: response.data.content, event: response.data.event}
      )
  }

  console.log(nodes);
  return nodes;
};

export const getPersonaDialogue = async (personaId, userInput) => {
  // const response = await axios.post(
  //   `${API_BASE_URL}/persona/${personaId}/dialogue`,
  //   {
  //     input: userInput,
  //   }
  // );
  // return response.data;

  
  return "hi";
};
