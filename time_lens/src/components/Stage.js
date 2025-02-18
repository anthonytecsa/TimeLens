// Stage.js
import React, { useState, Suspense, useEffect } from "react"; // Add Suspense
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import PersonaStage from "./PersonaStage";
import ChatBar from "./ChatBar";
import { getPersonaDialogue, generateCharacter } from "../services/api";
import { Avatar } from "./Avatar";

const Stage = ({ sub_event, timelineData }) => {
  const [assetUrls, setAssetUrls] = useState([[],[],[]]);
  const [selectedPersona, setSelectedPersona] = useState(null);
  const [personaResponses, setPersonaResponses] = useState([]);

  useEffect(() => {
    const fetchCharacterUrls = async () => {
      try {
        const urls1 = await generateCharacter(1, timelineData);
        const urls2 = await generateCharacter(2, timelineData);
        const urls3 = await generateCharacter(3, timelineData);
        setAssetUrls([urls1, urls2, urls3]);
      } catch (error) {
        console.error("Error fetching character URLs:", error);
      }
    };

    fetchCharacterUrls();
    console.log(assetUrls)
  }, []);

  const handleStageClick = (id) => {
    setSelectedPersona(id === selectedPersona ? null : id);
  };

  const getPersona = (position) => {
    switch(position) {
      case 1:
        return sub_event.persona1;
      case 2:
        return sub_event.persona2;
      case 3:
        return sub_event.persona3;
      default:
        return null;
    }
  };

  const handleSendMessage = async (message) => {
    try {
      const response = await getPersonaDialogue(getPersona(selectedPersona).id, message);
      setPersonaResponses(prev => ({
        ...prev,
        [selectedPersona]: response
      }));
    } catch (error) {
      console.error("Error getting persona dialogue:", error);
    }
  }

  return (
    <div className="stage-container">
      <div className="canvas-container">
        <Canvas
          camera={{ position: [0, 3, 8] }}
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
          shadows
        >
          <Suspense fallback={null}>
            <color attach="background" args={["#333333"]} />
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} />
            <OrbitControls 
              enablePan={false} // Disable panning
              enableZoom={true} // Enable zoom if desired
              minPolarAngle={Math.PI / 3} // Limit vertical rotation (up)
              maxPolarAngle={Math.PI / 1.5} // Limit vertical rotation (down)
              minAzimuthAngle={-Math.PI / 4} // Limit horizontal rotation (left)
              maxAzimuthAngle={Math.PI / 4} // Limit horizontal rotation (right)
              minDistance={5} // Minimum zoom distance
              maxDistance={12} // Maximum zoom distance
            />
            {[1, 2, 3].map(id => (
              <>
                <Avatar position={[(id-2) * 5, 0, 0]} scale={[2, 2, 2]} urls={assetUrls[id-1]} />
                <PersonaStage
                  position={[(id-2) * 5, 0, 0]}
                  persona={getPersona(id)}
                  isSelected={selectedPersona === id}
                  onClick={() => handleStageClick(id)}
                  chatMessage={personaResponses[id]}
                />
              </>
            ))}
          </Suspense>
        </Canvas>
      </div>
      <div style={{position:"absolute", backgroundColor:"rgba(1, 1, 1, 0.35)", borderRadius: "16px"}}>
        {[1, 2, 3].map(id => (
          <p style={{color:"#fff"}}>{personaResponses[id]}</p>
       ))}
      </div>
      <div>
      </div>
      <ChatBar 
        persona={getPersona(selectedPersona)}
        onSendMessage={handleSendMessage}
      />
    </div>
  );
};

export default Stage;