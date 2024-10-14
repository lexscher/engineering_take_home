// Entry point for the build script in your package.json
import "@hotwired/turbo-rails"
import "./controllers"

import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HelloWorld from './components/HelloWorld';
import BuildingList from './pages/BuildingList';
import NewBuilding from './pages/NewBuilding';
import EditBuilding from './pages/EditBuilding';
import { AppWrapper } from "./components/AppWrapper";

document.addEventListener('DOMContentLoaded', () => {
  // I was getting a deprication warning from my editor so I made a slight update here based on their react 18 notes:
  // https://react.dev/blog/2022/03/08/react-18-upgrade-guide#updates-to-client-rendering-apis
  const node = document.getElementById('react-root');
  const root = createRoot(node);
  if (node) {
    root.render(
      <AppWrapper>
        <Router>
          <Routes>
            <Route path="/" element={<HelloWorld />} />
            <Route path="/buildings" element={<BuildingList />} />
            <Route path="/buildings/new" element={<NewBuilding />} />
            <Route path="/buildings/:id/edit" element={<EditBuilding />} />
          </Routes>
        </Router>
      </AppWrapper>
    );
  }
});
