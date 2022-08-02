import React, { useContext } from "react";
import { Store } from "./store";

export const Context = React.createContext(new Store("localhost:8000"));
export const useStore = () => useContext(Context);
