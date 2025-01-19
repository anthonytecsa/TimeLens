// Timeline.js
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TimelineNode from "./TimelineNode";
import LineConnector from "./LineConnector";
import "../styles/components/Timeline.css";
import EventBox from "./EventBox";

const Timeline = ({ data }) => {
  const [currentNode, setCurrentNode] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [showEventBox, setShowEventBox] = useState(false);
  const nodes = data || [];

  // Calculate the position to center the current node
  const calculateOffset = (index, scalingFactor) => {
    const windowWidth = window.innerWidth;
    const timelineWidth = windowWidth * 0.8; // 80% of window width
    const nodeSpacing = timelineWidth / 3; // 3 spaces between 4 nodes
    const nodeSize = 120;

    // Calculate offsets based on node position
    switch(index) {
        case 0: // leftmost node
            return nodeSpacing * 1.5 * scalingFactor - nodeSize * 1.5;
        case 1: // left of center
            return nodeSpacing * 0.5 * scalingFactor - nodeSize * 0.5; 
        case 2: // right of center
            return nodeSpacing * 0.5 * (-1) * scalingFactor + nodeSize * 0.5; 
        case 3: // rightmost node
            return nodeSpacing * 1.5 * (-1) * scalingFactor + nodeSize * 1.5; 
        default:
            return 0;
    }
};

React.useEffect(() => {
  const handleKeyPress = (event) => {
    if (event.key === "ArrowRight") {
      if (isZoomed) {
        // If zoomed, first hide event box and zoom out
        setShowEventBox(false);
        setIsZoomed(false);
        if (currentNode < nodes.length - 1) {
          setCurrentNode(currentNode + 1);
        }
      } else {
        // If not zoomed, zoom in and show event box
        setIsZoomed(true);
        setTimeout(() => setShowEventBox(true), 500);
      }
    } else if (event.key === "ArrowLeft") {
      if (isZoomed) {
        // If zoomed, first hide event box and zoom out
        setShowEventBox(false);
        setIsZoomed(false);
      } else if (currentNode > 0) {
        // If not zoomed and not at first node, move to previous node
        setCurrentNode(currentNode - 1);
        // Then zoom in and show event box
        setIsZoomed(true);
        setTimeout(() => setShowEventBox(true), 500);
      }
    }
  };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [currentNode, isZoomed, showEventBox, nodes.length]);

  return (
    <div className="timeline-container">
      <motion.div
        className="timeline"
        animate={{
          scale: isZoomed ? 3 : 1,
          x: isZoomed ? calculateOffset(currentNode, 3) : 0,
        }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        {nodes.map((node, index) => (
          <React.Fragment key={node.id}>
            {index > 0 && <LineConnector />}
            <TimelineNode
              sub_event={node.sub_event}
              isActive={currentNode === index}
              isZoomed={isZoomed && currentNode === index}
            />
          </React.Fragment>
        ))}
      </motion.div>

      <AnimatePresence>
        {showEventBox && (
          <EventBox
            sub_event={nodes[currentNode]}
            onClose={() => setShowEventBox(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Timeline;
