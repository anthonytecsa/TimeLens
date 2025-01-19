// Stage.jsx
import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import PersonaStage from "./PersonaStage";

const Stage = () => {
  const [selectedPersona, setSelectedPersona] = useState(null);

  const handleStageClick = (id) => {
    setSelectedPersona(id === selectedPersona ? null : id);
  };

  return (
    <Canvas camera={{ position: [3, 3, 3] }}>
      <color attach="background" args={["#333333"]} />
      <OrbitControls />
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} />

      {/* Example of multiple PersonaStages */}
      <PersonaStage
        position={[-2, 0, 0]}
        id={1}
        isSelected={selectedPersona === 1}
        onClick={() => handleStageClick(1)}
      />
      <PersonaStage
        position={[2, 0, 0]}
        id={2}
        isSelected={selectedPersona === 2}
        onClick={() => handleStageClick(2)}
      />
    </Canvas>
  );
};

export default Stage;
