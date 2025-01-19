import axios from "axios";

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:5000";

// Search Text is the event name
export const getTimelineData2 = async (event) => {
  const nodes = [
    {
      id: 0,
      sub_event: "subevent",
      content: "story",
      event: "bigEvent",
      persona1: {
        id: "id1",
        name: "personaName1"
      },
      persona2: {
        id: "id2",
        name: "personaName2",
      },
      persona3: {
        id: "id3",
        name: "personaName3"
      }
    },
    {
      id: 1,
      sub_event: "Node 2",
      content: "Content for Node 2",
      event: "Event 1",
      persona1: {
        id: "id1",
        name: "personaName1"
      },
      persona2: {
        id: "id2",
        name: "personaName2",
      },
      persona3: {
        id: "id3",
        name: "personaName3"
      }
    },
    {
      id: 2,
      sub_event: "Node 3",
      content: "Content for Node 3",
      event: "Event 1",
      persona1: {
        id: "id1",
        name: "personaName1"
      },
      persona2: {
        id: "id2",
        name: "personaName2",
      },
      persona3: {
        id: "id3",
        name: "personaName3"
      }
    },
    {
      id: 3,
      sub_event: "Node 4",
      content: "Content for Node 4",
      event: "Event 1",
      persona1: {
        id: "id1",
        name: "personaName1"
      },
      persona2: {
        id: "id2",
        name: "personaName2",
      },
      persona3: {
        id: "id3",
        name: "personaName3"
      }
    },
  ];

  return nodes; // api isnt sent for now, just use this as test
};

export const getTimelineData = async (event) => {
  const nodes = [];

  // generate one persona

  // then generate 4 of the chats

  for(let i = 0; i < 4; i++) {
    
    const response1 = await axios.get(`${API_BASE_URL}/api/generate`, {
      params: { event: event },
    });

    let persona1 = {
      id: response1.data.id,
      name: response1.data.name,
    };

    const response2 = await axios.get(`${API_BASE_URL}/api/generate`, {
      params: { event: event },
    });

    let persona2 = {
      id: response2.data.id,
      name: response2.data.name,
    };

    const response3 = await axios.get(`${API_BASE_URL}/api/generate`, {
      params: { event: event },
    });

    let persona3 = {
      id: response3.data.id,
      name: response3.data.name,
    };

    console.log("start api call. Persona.id: ", persona1.id);
    const response4 = await axios.get(`${API_BASE_URL}/api/chat`, {
      params: { persona_id: persona1.id },
    });

    nodes.push( // node is a subevent
      {
        id: i,
        sub_event: response4.data.title, // sub event title
        content: response4.data.content, // story
        event: persona1.event, // main historical event (user inputted)
        persona1: persona1,
        persona2: persona2,
        persona3: persona3,
      }
    )
  }

  console.log("NODES TimeData2: ", nodes);
  return nodes;
};

export const getPersonaDialogue = async (personaId, userInput) => {
  const response = await axios.post(
    `${API_BASE_URL}/api/chatWithUser`,
    {
      persona_id: personaId,
      input: userInput,
    }
  );
  console.log("response.data: ", response.data)
  return response.data; // the content in the form of a string

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

