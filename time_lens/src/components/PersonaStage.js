// PersonaStage.jsx
import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const PersonaStage = ({ position = [0, 0, 0], id, isSelected, onClick }) => {
  const groupRef = useRef();
  const materialRef = useRef();

  // Animation
  useFrame(() => {
    if (groupRef.current) {
      const targetScale = isSelected ? 1.1 : 1;
      groupRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        0.1
      );
    }

    if (materialRef.current) {
      const targetEmissive = isSelected ? 0.5 : 0;
      materialRef.current.emissive.lerp(
        new THREE.Color(targetEmissive, targetEmissive, targetEmissive),
        0.1
      );
    }
  });

  return (
    <group ref={groupRef} position={position} onClick={onClick}>
      {/* Circular podium */}
      <mesh position={[0, -0.1, 0]}>
        <cylinderGeometry args={[1, 1.2, 0.2, 32]} />
        <meshStandardMaterial
          ref={materialRef}
          color="#666666"
          metalness={0.8}
          roughness={0.2}
          emissive="#ffffff"
          emissiveIntensity={isSelected ? 0.5 : 0}
        />
      </mesh>

      {/* Optional: Add a subtle glow effect when selected */}
      {isSelected && (
        <mesh position={[0, -0.15, 0]}>
          <cylinderGeometry args={[1.1, 1.3, 0.1, 32]} />
          <meshStandardMaterial
            color="#ffffff"
            transparent
            opacity={0.3}
            emissive="#ffffff"
            emissiveIntensity={0.5}
          />
        </mesh>
      )}
    </group>
  );
};

export default PersonaStage;
