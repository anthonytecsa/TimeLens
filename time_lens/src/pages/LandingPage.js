import React from "react";
import { Clock, Users, MessageCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import InputStart from "../components/InputStart";

export default function LandingPage() {
  const navigate = useNavigate();

  // Function to handle submission from InputStart
  const handleSubmission = () => {
    navigate("/timeline");
  };

  return (
    <div className="min-h-screen bg-stone-900 text-stone-100">
      {/* Header */}
      <header className="bg-stone-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">TimeLens</h1>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link to="#features" className="hover:text-green-300">
                  Features
                </Link>
              </li>
              <li>
                <Link to="#preview" className="hover:text-green-300">
                  Preview
                </Link>
              </li>
              <li>
                <Link to="/timeline" className="hover:text-green-300">
                  Timeline
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Middle Section */}
      <section className="py-20 text-center bg-gradient-to-b from-green-900 to-stone-900">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-bold mb-6">
            Explore History Through AI Personas
          </h2>
          <p className="text-xl mb-8">
            Dive into historical events and interact with key figures using
            TimeLens
          </p>
          <InputStart
            phrases={["Search Timeline...", "Enter a topic..."]}
            onSubmit={handleSubmission} // Pass the submission handler
          />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-stone-800">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12">Key Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Clock className="w-12 h-12 text-green-500" />}
              title="Interactive Timeline"
              description="Navigate through history with our intuitive, interactive timeline interface."
            />
            <FeatureCard
              icon={<Users className="w-12 h-12 text-green-500" />}
              title="AI Personas"
              description="Engage with AI-powered historical figures and learn from their perspectives."
            />
            <FeatureCard
              icon={<MessageCircle className="w-12 h-12 text-green-500" />}
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
    <div className="bg-stone-700 p-6 rounded-lg text-center hover:bg-stone-600 transition duration-300">
      <div className="flex justify-center mb-4">{icon}</div>
      <h4 className="text-xl font-semibold mb-2">{title}</h4>
      <p>{description}</p>
    </div>
  );
}
