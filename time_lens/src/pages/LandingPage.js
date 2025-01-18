// LandingPage.jsx
import React from "react";
import { Clock, Users, MessageCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import InputStart from "../components/InputStart";
import '../styles/pages/LandingPage.css';

export default function LandingPage() {
  const navigate = useNavigate();

  const handleSubmission = () => {
    navigate("/timeline");
  };

  return (
    <div className="landing-page">
      <header className="header">
        <div className="header-container">
          <h1 className="logo">TimeLens</h1>
          <nav>
            <ul className="nav-list">
              <li>
                <Link to="#features" className="nav-link">
                  Features
                </Link>
              </li>
              <li>
                <Link to="#preview" className="nav-link">
                  Preview
                </Link>
              </li>
              <li>
                <Link to="/timeline" className="nav-link">
                  Timeline
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <section className="hero-section">
        <div className="hero-container">
          <h2 className="hero-title">
            Explore History Through AI Personas
          </h2>
          <p className="hero-subtitle">
            Dive into historical events and interact with key figures using
            TimeLens
          </p>
          <InputStart
            phrases={["Search Timeline...", "Enter a topic..."]}
            onSubmit={handleSubmission}
          />
        </div>
      </section>

      <section id="features" className="features-section">
        <div className="features-container">
          <h3 className="features-title">Key Features</h3>
          <div className="features-grid">
            <FeatureCard
              icon={<Clock className="feature-icon" />}
              title="Interactive Timeline"
              description="Navigate through history with our intuitive, interactive timeline interface."
            />
            <FeatureCard
              icon={<Users className="feature-icon" />}
              title="AI Personas"
              description="Engage with AI-powered historical figures and learn from their perspectives."
            />
            <FeatureCard
              icon={<MessageCircle className="feature-icon" />}
              title="Chat Interface"
              description="Ask questions and receive responses from historical personas in real-time."
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="feature-card">
      <div className="feature-icon-wrapper">{icon}</div>
      <h4 className="feature-card-title">{title}</h4>
      <p className="feature-card-description">{description}</p>
    </div>
  );
}