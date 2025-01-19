// TimelineNode.js
import React from "react";
import "../styles/components/TimelineNode.css";
import { motion } from "framer-motion";

const TimelineNode = ({ sub_event, isActive, isZoomed }) => {
  return (
    <motion.div
      className={`timeline-node ${isActive ? "active" : ""}`}
      animate={{
        scale: isActive ? 1.2 : 1,
      }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      
      <motion.div
        className="node-outer-ring"
        animate={{
          scale: isActive ? 1.1 : 1,
          borderColor: isActive ? "#c4a47c" : "#8b7355",
        }}
      >
        <motion.div
          className="node-inner-circle"
          animate={{
            backgroundColor: isActive ? "#f0d5a0" : "#d4b483",
            boxShadow: isActive 
              ? "0 0 15px rgba(196, 164, 124, 0.6)" 
              : "0 0 5px rgba(139, 115, 85, 0.3)",
          }}
        />
      </motion.div>
      <motion.div
        animate={{
          opacity: isZoomed ? 0 : 1,
          y: isActive ? -10 : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        <h3>{sub_event}</h3>
      </motion.div>
    </motion.div>
  );
};

export default TimelineNode;