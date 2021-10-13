import React from "react";
import "../assets/css/Home.css";
import Chat from "./Chat";
import Sidebar from "./Sidebar";

function Home() {
  return (
    <div className="home">
      {/* sidebar */}
      <Sidebar />
      {/* chat */}
      <Chat />
    </div>
  );
}

export default Home;
