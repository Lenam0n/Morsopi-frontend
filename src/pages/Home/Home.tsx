import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home: React.FC = () => {
  return (
    <div className="landing-container">
      <section className="hero">
        <div className="hero-content">
          <h1>Willkommen bei Meine App</h1>
          <p>
            Erlebe minimalistische und elegante Lösungen für deine Projekte.
          </p>
          <Link to="/mermaid-builder" className="cta-button">
            Jetzt starten
          </Link>
        </div>
      </section>
      <section className="features">
        <div className="feature">
          <h2>Mermaid Diagramm Builder</h2>
          <p>Erstelle und visualisiere deine Diagramme mühelos.</p>
          <Link to="/mermaid-builder" className="feature-button">
            Mehr erfahren
          </Link>
        </div>
        <div className="feature">
          <h2>Struktogramm Builder</h2>
          <p>Gestalte intuitive Struktogramme für deine Abläufe.</p>
          <Link to="/struktogramm-builder" className="feature-button">
            Mehr erfahren
          </Link>
        </div>
        <div className="feature">
          <h2>Lebenslauf Builder</h2>
          <p>Erstelle deinen professionellen Lebenslauf im Handumdrehen.</p>
          <Link to="/cv-builder" className="feature-button">
            Mehr erfahren
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
