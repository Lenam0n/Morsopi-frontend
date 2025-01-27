import React from "react";
import { Link } from "react-router-dom";
import "./404Page.css";

export const NotFound: React.FC = () => {
  return (
    <div className="notfound-container">
      <h1 className="notfound-title">404</h1>
      <p className="notfound-text">Oops! Diese Seite existiert nicht.</p>

      <div className="notfound-button-container">
        <Link to="/" className="notfound-button">
          Zurück zur Startseite
        </Link>
      </div>

      <div className="notfound-image-container">
        <img
          src="https://source.unsplash.com/500x300/?lost,space"
          alt="Lost in Space"
          className="notfound-image"
        />
      </div>
    </div>
  );
};
