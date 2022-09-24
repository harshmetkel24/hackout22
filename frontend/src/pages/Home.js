import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Predictor from "../components/Predictor";
import Tutorial from "../components/Tutorial";

const Home = () => {
  function getCookie() {
    var allcookies = document.cookie;
    var arrayb = allcookies.split(";");
      arrayb.forEach(item => {
        if (item.startsWith("token")){
          return item;
      }
    })
  }
  const token = getCookie();
  console.log(token);
  return (
    <div>
      <Navbar />
      <div className="mt-5 pt-3">
        {token && <Predictor />}
        {/* <Predictor/> */}
        <Tutorial />
      </div>
    </div>
  );
};

export default Home;
