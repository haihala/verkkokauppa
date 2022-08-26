import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CredentialModal } from "../components/CredentialModal";
import { TopBar } from "../components/TopBar";
import { useCats, useLogin, useProducts } from "../utils/customHooks";
import { Cats } from "./Cats";
import { Home } from "./Home";
import { Products } from "./Products";

export const App: React.FC = () => {
  const auth = useLogin();
  const products = useProducts(auth);
  const cats = useCats(auth);

  return (
    <BrowserRouter>
      <TopBar {...products} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="products" element={<Products {...products} />} />
        <Route path="cats" element={<Cats {...cats} />} />
      </Routes>
      <CredentialModal {...auth} />
    </BrowserRouter>
  );
};
