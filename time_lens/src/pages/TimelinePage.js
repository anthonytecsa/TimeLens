// TimelinePage.js
import React, { useState } from 'react';
import Timeline from '../components/Timeline';
import '../styles/pages/TimelinePage.css';

const TimelinePage = () => {
    const historicalEvents = "hi"

  return (
    <div className="timeline-page">
      <header className="timeline-header">
        <h1>Historical Timeline Explorer</h1>
        <p>Explore key historical events through multiple perspectives</p>
      </header>

      <main className="timeline-content">
        <div className="timeline-wrapper">
          <Timeline events={historicalEvents} />
        </div>
      </main>
      <footer className="timeline-footer">
        <p>Use arrow keys to navigate through time periods</p>
        <p>Click on personas to start a conversation</p>
      </footer>
    </div>
  );
};

export default TimelinePage;