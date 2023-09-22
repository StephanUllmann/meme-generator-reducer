import React from 'react';
import ReactDOM from 'react-dom/client';
// import "./index.css";
import App from './App';
// import MemeContextProvider from "./contexts/MemeContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <MemeContextProvider> */}
    <App />
    {/* </MemeContextProvider> */}
  </React.StrictMode>
);
