import React, { useState } from "react";
import Select from "./Select";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";

import stationsData from "./station_names.json";

const Predictor = () => {
  let dataarr = [];
  for (let x in stationsData) {
    dataarr.push(stationsData[x]);
  }

  const [source, setSource] = useState(0);
  const [destination, setDestination] = useState(0);
  const [waitingTime, setWaitingTime] = useState(0);
  const [error, setError] = useState(0);
  const [visible, setVisible] = useState(false);

  const giveTime = (arrivalTime) => {
    let currentDate = new Date();
    const new_date = new Date(currentDate.getTime() + arrivalTime * 60000);
    const hours = new_date.getHours();
    const minutes = new_date.getMinutes();
    const seconds = new_date.getSeconds();
    return `${hours}:${minutes}:${seconds}`;
  };

  const [final, setFinal] = useState(null);

  const handleSearch = () => {
    if (loading) return;
    SetLoading(true);
    if (source === 0 || destination === 0 || waitingTime === 0) {
      setError(1);
      SetLoading(false);
      return;
    }
    if (source === destination) {
      SetLoading(false);
      setError(2);
      return;
    }
    setError(0);
    const predictor = {
      source: source,
      destination: destination,
      wait_time: waitingTime * 15,
    };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(predictor),
    };
    const url =
      process.env.NODE_ENV === "production"
        ? "/find/predict"
        : "http://localhost:2000/find/predict";

    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        SetLoading(false);
        setVisible(true);
        if (data.least_time.length) {
          setFinal(preference ? data.least_time : data.earliest);
        } else {
          setFinal(null);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // filtering data
  const [preference, setPreference] = React.useState(true);
  const [loading, SetLoading] = React.useState(false);
  // true means earliest
  // false means least time
  function handlePreference() {
    console.log(preference);
    setPreference((old) => !old);
  }

  return (
    <div
      className="contaier-fluid bg-light border  d-block d-md-flex flex-column justify-content-around"
      style={{ minHeight: "90vh" }}
    >
      <div className="display-4 text-center d-flex justify-content-center align-items-center mt-5 heading">
        Select Your Source And Destination
      </div>

      {visible && final && (
        <>
          <div className="results px-2 py-4 my-5 rounded-5 border border-dark shadow-lg">
            <div className="display-5 text-center"> Your Optimal Bus! </div>
            <div className="px-5 fw-bold">Bus Number: {final[0][0]}</div>
            <div className="px-5 fw-bold">
              Will arrive at: {giveTime(final[0][1])}
            </div>
          </div>
        </>
      )}
      {visible && !final && (
        <>
          <div className="results px-2 py-4 my-5 rounded-5 border border-dark shadow-lg">
            <div className="display-5 text-center">
              {" "}
              Sorry! No buses available{" "}
            </div>
          </div>
        </>
      )}

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
          <ArrowCircleRightIcon style={{ height: "80px", width: "80px" }} />
          {/* <i
            class="fa-solid fa-arrows-left-right-to-line text-warning d-none d-lg-block"
            style={{ fontSize: "3em" }}
          ></i> */}
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
            data={[15, 30, 45, 60, 75, 90, 105, 120]}
            setter={setWaitingTime}
            value={waitingTime}
          />
        </div>
      </div>
      {error === 1 && (
        <p className="fw-bold text-danger text-center">
          Please ensure all the above fields are selected before searching for
          Bus.
        </p>
      )}
      {error === 2 && (
        <p className="fw-bold text-danger text-center">
          Source And Destination Cannot be same
        </p>
      )}
      <div className="d-flex flex-column align-items-center justify-content-center">
        <FormControlLabel
          sx={{
            display: "block",
          }}
          control={
            <Switch
              checked={preference}
              onChange={handlePreference}
              color="warning"
            />
          }
          label="Set Preference"
        />
        {preference && (
          <div className="text-warning fw-bold h3">Early Arrival Time</div>
        )}
        {!preference && (
          <div className="text-warning fw-bold h3">Least Travel Time </div>
        )}

        <button
          className="btn btn-warning btn-lg"
          style={{ marginTop: "10px", marginBottom: "10px" }}
          onClick={() => handleSearch()}
        >
          {loading && (
            <div className="spinner-border text-light" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          )}
          {!loading && <>Search</>}
        </button>
      </div>
    </div>
  );
};

export default Predictor;
