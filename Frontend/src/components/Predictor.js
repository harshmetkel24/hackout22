import React from "react";
import Select from "./Select";

import { TextField } from "@mui/material";

const Predictor = () => {
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
          />
        </div>
      </div>
      <div className="d-flex justify-content-center">
        <button className="btn btn-warning btn-lg">Search</button>
      </div>
    </div>
  );
};

export default Predictor;
