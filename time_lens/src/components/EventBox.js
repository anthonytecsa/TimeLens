// EventBox.js
import React from 'react';
import { motion } from 'framer-motion';
import '../styles/components/EventBox.css';

const EventBox = ({ event, onClose }) => {
  return (
    <motion.div
      className="event-box-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="event-box"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <button className="close-button" onClick={onClose}>×</button>
        <h2>{event.title}</h2>
        <div className="event-date">{event.date}</div>
        <p>{event.description}</p>
      </motion.div>
    </motion.div>
  );
};

export default EventBox;