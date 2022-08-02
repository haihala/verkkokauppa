import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { App } from "./views/App";
import reportWebVitals from "./reportWebVitals";
import { Context } from "./context";
import { Store } from "./store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const store = new Store("localhost:8000");
store.populate();

root.render(
  <React.StrictMode>
    <Context.Provider value={store}>
      <App />
    </Context.Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
