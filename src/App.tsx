// src/App.tsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import { NotFound } from "./pages/404Page/404Page";
import { StruktogrammBuilder } from "./pages/struktogrammBuilder/struktogrammbuilder";
import { MermaidBuilder } from "./pages/mermaidDiagrammBuilder/mermaidBuilder";
import { Navbar } from "./container/Navbar/Navbar";
import { Footer } from "./container/Footer/Footer";

import { StruktogrammProvider } from "./Utils/context/StruktogrammContext";
import Home from "./pages/Home/Home";
import { CVBuilder } from "./pages/cvBuilder/Builder/CVBuilder";
import { CVProvider } from "./Utils/context/CvContext";
import TemplatePage from "./pages/cvBuilder/Page/TemplatePage";
import CVTemplateBuilderPage from "./pages/cvTemplateBuilder/CVTemplateBuilder";

import { NAVBAR_HEIGHT } from "./config/PageConfig";

const App: React.FC = () => {
  const title: string = "Meine App";

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content="Willkommen in meiner App" />
      </Helmet>
      <Navbar />

      {/* Container für den Seiteninhalt mit min-height: 100vh - NAVBAR_HEIGHT */}
      <div style={{ minHeight: `calc(100vh - ${NAVBAR_HEIGHT}px)` }}>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Helmet>
                  <title>Home - {title}</title>
                  <meta
                    name="description"
                    content="Dies ist die Startseite meiner App."
                  />
                </Helmet>
                <Home />
              </>
            }
          />
          <Route
            path="/mermaid-builder"
            element={
              <>
                <Helmet>
                  <title>Mermaid Diagramm Builder - {title}</title>
                  <meta name="description" content="Mermaid.js Builder" />
                </Helmet>
                <MermaidBuilder />
              </>
            }
          />
          <Route
            path="/struktogramm-builder"
            element={
              <>
                <Helmet>
                  <title>Struktogramm Builder - {title}</title>
                  <meta name="description" content="Struktogramm Builder" />
                </Helmet>
                <StruktogrammProvider>
                  <StruktogrammBuilder />
                </StruktogrammProvider>
              </>
            }
          />
          <Route
            path="/cv-builder"
            element={
              <>
                <Helmet>
                  <title>Lebenslauf Builder - {title}</title>
                  <meta name="description" content="Lebenslauf Builder" />
                </Helmet>
                <CVProvider>
                  <CVBuilder />
                </CVProvider>
              </>
            }
          />
          <Route
            path="/template-selection/cv"
            element={
              <>
                <Helmet>
                  <title>Lebenslauf Templates - {title}</title>
                  <meta name="description" content="Lebenslauf Templates" />
                </Helmet>
                <CVProvider>
                  <TemplatePage />
                </CVProvider>
              </>
            }
          />
          <Route
            path="/cv-template-builder"
            element={
              <>
                <Helmet>
                  <title>Lebenslauf Template Builder - {title}</title>
                  <meta
                    name="description"
                    content="Lebenslauf Template Builder"
                  />
                </Helmet>
                <CVProvider>
                  <CVTemplateBuilderPage />
                </CVProvider>
              </>
            }
          />
          <Route
            path="*"
            element={
              <>
                <Helmet>
                  <title>404 - {title}</title>
                  <meta
                    name="description"
                    content="Diese Seite gibt es nicht!"
                  />
                </Helmet>
                <NotFound />
              </>
            }
          />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
