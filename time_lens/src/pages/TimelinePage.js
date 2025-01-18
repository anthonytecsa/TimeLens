import Timeline from "../components/Timeline";
import { useLocation } from "react-router-dom";
import "../styles/pages/TimelinePage.css";
import { getTimelineData } from "../services/api";
import { useState, useEffect } from "react";

const TimelinePage = () => {
  const location = useLocation();
  const searchText = location.state?.searchText;
  const [timelineData, setTimelineData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTimelineData = async () => {
      try {
        setLoading(true);
        console.log("hi");
        const data = await getTimelineData(searchText);
        console.log("bye");
        setTimelineData(data);
      } catch (err) {
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (searchText) {
      fetchTimelineData();
    } else {
      setLoading(false);
    }
  }, [searchText]);

  if (loading) return <div>Loading...</div>;
  if (!timelineData) return <div>No data available</div>;

  return (
    <div className="timeline-page">
      <header className="timeline-header">
        <h1>Timeline Results for: {searchText}</h1>
        <p>Explore key historical events through multiple perspectives</p>
      </header>

      <main className="timeline-content">
        <div className="timeline-wrapper">
          <Timeline data={timelineData} />
        </div>
      </main>
      <footer className="timeline-footer">
        <p>
          Use arrow keys to navigate through time periods
          <span className="arrow-icons">
            <i className="fas fa-arrow-left"></i>
            <i className="fas fa-arrow-right"></i>
          </span>
        </p>
        <p>
          Click on personas to start a conversation
          <i className="fas fa-user"></i>
        </p>
      </footer>
    </div>
  );
};

export default TimelinePage;