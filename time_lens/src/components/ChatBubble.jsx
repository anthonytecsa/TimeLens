// ChatBubble.jsx
import React, { useRef, useEffect } from "react";
import { Text } from "@react-three/drei";

const ChatBubble = ({ message }) => {
  const groupRef = useRef();

  return (
    <group ref={groupRef} position={[0, 2.5, 0]}>
      {/* Chat bubble background */}
      <group position={[0, 0.8, 0]}>
        <mesh>
          <planeGeometry args={[3, 0.8]} />
          <meshBasicMaterial color="white" transparent opacity={0.8} />
        </mesh>
        <Text
          position={[0, 0, 0.1]}
          fontSize={0.2}
          maxWidth={2.5}
          color="black"
          anchorX="center"
          anchorY="middle"
          renderOrder={2}
          depthTest={false}
        >
          {message || ""}
        </Text>
      </group>
    </group>
  );
};

export default ChatBubble;
