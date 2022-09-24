import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Predictor from "../components/Predictor";
import Tutorial from "../components/Tutorial";

const Home = () => {
  function getCookie() {
    var allcookies = document.cookie;
    let arr = allcookies.split(";")
    for (let i = 0; i < arr.length; ++i) {
      if (arr[i][0] === " ") {
        arr[i] = arr[i].substring(1)
      }
    }
    let token = ""
    for (let i = 0; i < arr.length; ++i) {
      if (arr[i].slice(0, 6) === "token=") {
        token = arr[i].substring(6)
        break
      }
    }
    return token
  }
  const token = getCookie();
  return (
    <div>
      <Navbar token={token} />
      <div className="mt-5 pt-3">
        {token && <Predictor />}
        <Tutorial />
      </div>
    </div>
  );
};

export default Home;
