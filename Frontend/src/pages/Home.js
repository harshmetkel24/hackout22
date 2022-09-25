import React, { useContext, useEffect } from "react";
import { LoginContext } from "../Contexts/LoginContext";

import Navbar from "../components/Navbar";

import Predictor from "../components/Predictor";
import Tutorial from "../components/Tutorial";

const Home = () => {
  const { userName, setUserName, token, setToken } = useContext(LoginContext);

  function getCookie() {
    var allcookies = document.cookie;
    let arr = allcookies.split(";");
    for (let i = 0; i < arr.length; ++i) {
      if (arr[i][0] === " ") {
        arr[i] = arr[i].substring(1);
      }
    }
    let _token = "";
    for (let i = 0; i < arr.length; ++i) {
      if (arr[i].slice(0, 6) === "token=") {
        _token = arr[i].substring(6);
        break;
      }
    }
    return { _token };
  }
  let { _token } = getCookie();
  setToken(_token);
  useEffect(() => {
    document.title = "Home | Predict Bus";
  }, []);
  return (
    <>
      <Navbar />
      <div className="mt-5 pt-3">
        {token && <Predictor />}
        <Tutorial />
      </div>
    </>
  );
};

export default Home;
