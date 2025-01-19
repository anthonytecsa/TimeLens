// Stage.js
import React, { useState, Suspense } from "react"; // Add Suspense
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import PersonaStage from "./PersonaStage";
import ChatBar from "./ChatBar";
import { Avatar } from "./Avatar";

const Stage = () => {
  const [selectedPersona, setSelectedPersona] = useState(null);

  const handleStageClick = (id) => {
    setSelectedPersona(id === selectedPersona ? null : id);
  };
  const urls = ['https://iwohhqwngzhfdetoybfw.supabase.co/storage/v1/object/public/avatar_customization/Head.001.glb'];
  const avatar_1_customization = [
    'https://iwohhqwngzhfdetoybfw.supabase.co/storage/v1/object/public/avatar_customization/Head.001.glb',
    'https://iwohhqwngzhfdetoybfw.supabase.co/storage/v1/object/public/avatar_customization/Eyes.002.glb',
    'https://iwohhqwngzhfdetoybfw.supabase.co/storage/v1/object/public/avatar_customization/FacialHair.002.glb',
    'https://iwohhqwngzhfdetoybfw.supabase.co/storage/v1/object/public/avatar_customization/Nose.002.glb',
    'https://iwohhqwngzhfdetoybfw.supabase.co/storage/v1/object/public/avatar_customization/Shoes.002.glb',
    'https://iwohhqwngzhfdetoybfw.supabase.co/storage/v1/object/public/avatar_customization/Hair.007.glb'
  ];
  const avatar_2_customization = [
    'https://iwohhqwngzhfdetoybfw.supabase.co/storage/v1/object/public/avatar_customization/Head.001.glb',
    'https://iwohhqwngzhfdetoybfw.supabase.co/storage/v1/object/public/avatar_customization/Eyes.002.glb',
    'https://iwohhqwngzhfdetoybfw.supabase.co/storage/v1/object/public/avatar_customization/FacialHair.006.glb',
    'https://iwohhqwngzhfdetoybfw.supabase.co/storage/v1/object/public/avatar_customization/Nose.002.glb',
    'https://iwohhqwngzhfdetoybfw.supabase.co/storage/v1/object/public/avatar_customization/Shoes.001.glb',
    'https://iwohhqwngzhfdetoybfw.supabase.co/storage/v1/object/public/avatar_customization/Hair.001.glb'
  ];

  return (
    <div className="stage-container">
      <div className="canvas-container">
        <Canvas
          camera={{ position: [3, 3, 3] }}
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
          shadows
        >
          <Suspense fallback={null}>
            <color attach="background" args={["#333333"]} />
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} />

            <OrbitControls 
              minPolarAngle={Math.PI / 4}
              maxPolarAngle={Math.PI / 2}
              minAzimuthAngle={-Math.PI / 4}
              maxAzimuthAngle={Math.PI / 4}
            />
            <Avatar position={[-5, 0, 0]} scale={[2, 2, 2]} urls={avatar_1_customization} />
            <PersonaStage
              position={[-5, 0, 0]}
              id={1}
              isSelected={selectedPersona === 1}
              onClick={() => handleStageClick(1)}
            />
            <Avatar position={[0, 0, 0]} scale={[2, 2, 2]} urls={avatar_2_customization}/>
            <PersonaStage
              position={[0, 0, 0]}
              id={2}
              isSelected={selectedPersona === 2}
              onClick={() => handleStageClick(2)}
            />
            <Avatar position={[5, 0, 0]} scale={[2, 2, 2]} urls={urls}/>
            <PersonaStage
              position={[5, 0, 0]}
              id={3}
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