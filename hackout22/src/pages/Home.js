import React from "react";
import Card from "../components/Card";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="container">
        <div
          className="text-center display-5 font-weight-bold"
          style={{ fontWeight: 500, color: "  #f37335" }}
        >
          What services we provide?
        </div>
        <div className="tutorial-container container-fluid d-flex justify-content-around flex-wrap">
          <Card
            icon={<i class="fa-solid fa-route"></i>}
            step={"Select Route"}
          />
          <Card
            icon={<i class="fa-solid fa-clock"></i>}
            step={"Select Waiting Time"}
          />
          <Card
            icon={<i class="fa-solid fa-square-poll-vertical"></i>}
            step={"Our Prediction"}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
