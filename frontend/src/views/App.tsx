import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CredentialModal } from "../components/CredentialModal";
import { TopBar } from "../components/TopBar";
import { useCats, useLogin, useProducts } from "../utils/customHooks";
import { Cats } from "./Cats";
import { Home } from "./Home";
import { Items } from "./Items";

export const App: React.FC = () => {
  const auth = useLogin();
  const products = useProducts(auth);
  const cats = useCats(auth);

  return (
    <BrowserRouter>
      <TopBar {...products} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="items" element={<Items {...products} />} />
        <Route path="cats" element={<Cats {...cats} />} />
      </Routes>
      <CredentialModal {...auth} />
    </BrowserRouter>
  );
};
