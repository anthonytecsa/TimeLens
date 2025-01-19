// Stage.js
import React, { useState, Suspense } from "react"; // Add Suspense
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import PersonaStage from "./PersonaStage";
import ChatBar from "./ChatBar";

const Stage = ({ sub_event }) => {
  const [selectedPersona, setSelectedPersona] = useState(null);
  const [chatResponse, setChatResponse] = useState("");

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

            <Avatar position={[-5, 0, 0]} scale={[2, 2, 2]} />
            <PersonaStage
              position={[-5, 0, 0]}
              id={1}
              persona={getPersona(1)}
              isSelected={selectedPersona === 1}
              onClick={() => handleStageClick(1)}
            />
            <Avatar position={[0, 0, 0]} scale={[2, 2, 2]} />
            <PersonaStage
              position={[0, 0, 0]}
              id={2}
              persona={getPersona(2)}
              isSelected={selectedPersona === 2}
              onClick={() => handleStageClick(2)}
            />
            <Avatar position={[5, 0, 0]} scale={[2, 2, 2]} urls={urls}/>
            <PersonaStage
              position={[5, 0, 0]}
              id={3}
              persona={getPersona(3)}
              isSelected={selectedPersona === 3}
              onClick={() => handleStageClick(3)}
            />
          </Suspense>
        </Canvas>
        <div>
          <p>{chatResponse}</p>
        </div>
      </div>
      <ChatBar 
        selectedPersona={selectedPersona} 
        personaName={getPersona(selectedPersona)}
        setChatResponse={setChatResponse}
      />
    </div>
  );
};

export default Stage;