import React from "react";
import { Routes, Route } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import { NotFound } from "./pages/404Page/404Page";
import { StruktogrammBuilder } from "./pages/struktogrammBuilder/struktogrammbuilder";
import { MermaidBuilder } from "./pages/mermaidDiagrammBuilder/mermaidBuilder";
import { StruktogrammProvider } from "./Utils/context/StruktogrammContext";
import { Navbar } from "./container/Navbar/Navbar";

const App: React.FC = () => {
  const title: string = "Meine App";
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content="Willkommen in meiner App" />
      </Helmet>
      <Navbar/>

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
              <div>root</div>
            </>
          }
        />

        <Route
          path="/mermaid-builder"
          element={
            <>
              <Helmet>
                <title> Mermaid Diagramm Builder - {title}</title>
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
          path="*"
          element={
            <>
              <Helmet>
                <title>404 - {title}</title>
                <meta name="description" content="Diese Seite gibt es nicht!" />
              </Helmet>
              <NotFound />
            </>
          }
        />
      </Routes>
      <footer/>
    </>
  );
};

export default App;
