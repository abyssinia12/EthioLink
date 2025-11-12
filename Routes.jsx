import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from './src/Pages/Auth/Auth';
import PageNotFound from './src/Components/PageNotFound/PageNotFound';
import Landing from './src/Components/Landing/Landing';
export default function Routering() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/Auth" element={<Auth />} />
        <Route path="/PageNotFound" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}
