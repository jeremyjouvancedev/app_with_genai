import React from "react";
import ChatInterface from "./components/ChatInterface";
import "./App.css";

function App() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "100%",
      }}
    >
      <header
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#282c34",
          padding: "20px",
          color: "white",
          borderBottom: "3px solid yellowgreen",
          height: "50vh",
        }}
      >
        <h1>
          <b style={{ color: "yellowgreen" }}>AI</b>deasLab (Jeremy Jouvance)
        </h1>
        <h1>Chat avec ChatGPT</h1>
      </header>
      <ChatInterface />
    </div>
  );
}

export default App;
