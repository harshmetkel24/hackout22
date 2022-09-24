import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Predictor from "../components/Predictor";
import Tutorial from "../components/Tutorial";

const Home = () => {
  function getCookie() {
    var allcookies = document.cookie;
    let tokenCookie = allcookies.split(";")[0]
    return tokenCookie.substring(6)
  }
  const token = getCookie();
  return (
    <div>
      <Navbar token = {token}/>
      <div className="mt-5 pt-3">
        {token && <Predictor />}
        {/* <Predictor/> */}
        <Tutorial />
      </div>
    </div>
  );
};

export default Home;
