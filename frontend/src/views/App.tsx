import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Cats } from "./Cats";
import { Home } from "./Home";
import { Items } from "./Items";

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="items" element={<Items />} />
        <Route path="cats" element={<Cats />} />
      </Routes>
    </BrowserRouter>
  );
};
