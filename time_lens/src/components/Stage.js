// Stage.js
import React, { useState, Suspense } from "react"; // Add Suspense
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import PersonaStage from "./PersonaStage";
import ChatBar from "./ChatBar";
import { Avatar } from "./Avatar";
import { Gltf } from '@react-three/drei'

const Stage = () => {
  const [selectedPersona, setSelectedPersona] = useState(null);

  const handleStageClick = (id) => {
    setSelectedPersona(id === selectedPersona ? null : id);
  };

  return (
    <div className="stage-container">
      <div className="canvas-container">
        <Canvas
          camera={{ position: [3, 3, 3] }}
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        >
          <Suspense fallback={null}>
            <color attach="background" args={["#333333"]} />
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} />
            <OrbitControls />
            <Avatar position={[-5, 0, 0]} scale={[2, 2, 2]}/>
            <PersonaStage
              position={[-5, 0, 0]}
              id={1}
              isSelected={selectedPersona === 1}
              onClick={() => handleStageClick(1)}
            />
            <Avatar position={[0, 0, 0]} scale={[2, 2, 2]}/>
            <PersonaStage
              position={[0, 0, 0]}
              id={1}
              isSelected={selectedPersona === 2}
              onClick={() => handleStageClick(2)}
            />
            <Avatar position={[5, 0, 0]} scale={[2, 2, 2]}/>
            <PersonaStage
              position={[5, 0, 0]}
              id={2}
              isSelected={selectedPersona === 3}
              onClick={() => handleStageClick(3)}
            />
          </Suspense>
        </Canvas>
      </div>
      <ChatBar selectedPersona={selectedPersona} />
    </div>
  );
};

export default Stage;