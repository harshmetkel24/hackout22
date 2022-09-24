import React, { useState } from "react";
import Select from "./Select";

import stationsData from "./station_names.json";

const Predictor = () => {
  let dataarr = [];
  for (let x in stationsData) {
    dataarr.push(stationsData[x]);
  }
  const [source, setSource] = useState(0);
  const [destination, setDestination] = useState(0);
  const [waitingTime, setWaitingTime] = useState(0);
  console.log(source, destination, waitingTime);

  const handleSearch = () => {
    const predictor = {
      sourceId: source,
      destinationId: destination,
      waitingTime: waitingTime * 15,
    };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(predictor),
    };

    fetch("http://localhost:2000/find/predict", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div
      className="contaier-fluid bg-light border  d-block d-md-flex flex-column justify-content-around"
      style={{ minHeight: "90vh" }}
    >
      <div className="display-4 text-center d-flex justify-content-center align-items-center mt-5 heading">
        Select Your Source And Destination
      </div>
      <div className="row">
        <div className="col-lg-5 col-md-12 d-flex justify-content-center align-items-center mb-3 mb-md-0">
          <Select
            label={"Source"}
            helperText={"Select your starting position"}
            data={dataarr}
            setter={setSource}
            value={source}
          />
        </div>
        <div className="col-lg-2 col-md-12 d-flex justify-content-center align-items-center mb-3 mb-md-0">
          <i
            class="fa-solid fa-arrows-left-right-to-line text-warning d-none d-lg-block"
            style={{ fontSize: "3em" }}
          ></i>
        </div>
        <div className="col-lg-5 col-md-12 d-flex justify-content-center align-items-center mb-3 mb-md-0">
          <Select
            label={"Destination"}
            helperText={"Select your destination position"}
            data={dataarr}
            setter={setDestination}
            value={destination}
          />
        </div>
      </div>
      <div className="d-flex justify-content-center">
        <div className="col-lg-5 col-md-12 d-flex justify-content-center align-items-center mb-3 mb-md-0">
          <Select
            label={"Waiting Time"}
            helperText={
              "Enter the maximum time in minutes you can wait for the Bus"
            }
            data={[15, 30, 45, 60]}
            setter={setWaitingTime}
            value={waitingTime}
          />
        </div>
      </div>
      <div className="d-flex justify-content-center">
        <button className="btn btn-warning btn-lg" onClick={handleSearch}>
          Search
        </button>
      </div>
    </div>
  );
};

export default Predictor;
