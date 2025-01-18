// TimelineNode.js
import React from "react";
import "../styles/components/TimelineNode.css";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

const TimelineNode = ({ title, content, isActive, isZoomed }) => {
  return (
    <motion.div
      className={`timeline-node ${isActive ? "active" : ""}`}
      animate={{
        scale: isActive ? 1.2 : 1,
      }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="node-dot"
        animate={{
          backgroundColor: isActive ? "#007bff" : "#ccc",
        }}
      />
      <motion.div
        className="node-content"
        animate={{
          opacity: isZoomed ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        <h3>{title}</h3>
        <p>{content}</p>
        <p> JUST TESTING</p>
        <Canvas
          camera={{
            position: [3,3,3],
          }}
        >
          <OrbitControls />
          <mesh>
            <boxGeometry args={[0.5, 0.5, 0.5]} />
            <meshNormalMaterial />
          </mesh>
        </Canvas>
      </motion.div>
    </motion.div>
  );
};

export default TimelineNode;
