import axios from "axios";

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:5000";

// Search Text is the event name
export const getTimelineData = async (event) => {
  const nodes = [
    {
      id: 0,
      sub_event: "Node 1",
      content: "Hi test",
      event: "Event 1"
    },
    {
      id: 1,
      sub_event: "Node 2",
      content: "Content for Node 2",
      event: "Event 1"
    },
    {
      id: 2,
      sub_event: "Node 3",
      content: "Content for Node 3",
      event: "Event 1"
    },
    {
      id: 3,
      sub_event: "Node 4",
      content: "Content for Node 4",
      event: "Event 1"
    },
  ];

  return nodes; // api isnt sent for now, just use this as test
};

export const getTimelineData2 = async (event) => {
  const nodes = [];

  // generate one persona

  // then generate 4 of the chats

  const response = await axios.get(`${API_BASE_URL}/api/generate`, {
    params: { event: event },
  });

  let persona = response.data;

  for(let i = 0; i < 4; i++) {
      console.log("start api call. Persona.id: ", persona.id);
      const response = await axios.get(`${API_BASE_URL}/api/chat`, {
        params: { persona_id: persona.id },
      });

      console.log("RESPONSE: ", response)
      nodes.push(
        {
          id: i,
          sub_event: response.data.title, // sub event title
          content: response.data.content, // story
          event: persona.event, // main historical event (user inputted)
          personas: [persona]
        }
      )
  }

  console.log("NODES TimeData2: ", nodes);
  return nodes;
};

export const getPersonaDialogue = async (personaId, userInput) => {
  const response = await axios.post(
    `${API_BASE_URL}/persona/${personaId}/dialogue`,
    {
      persona_id: personaId,
      input: userInput,
    }
  );
  return response.data; // the content

  
};


export const generateCharacter = async (characterName, eventName) => {
  try {
    // Send a POST request to the backend API
    const response = await axios.post(`${API_BASE_URL}/api/generate_character`, {
      character_name: characterName,
      event_name: eventName,
    });

    // Return the array of selected IDs
    return response.data;
  } catch (error) {
    console.error("Error generating character:", error);
    throw error;
  }
};

