import React from "react";

const Card = ({ step, icon }) => {
  return (
    <div
      className="card-container col-4 rounded-5 shadow-lg px-5 py-4 m-4 my-5"
      style={{ width: "300px" }}
    >
      <div className="card-header">
        <div className="card-title h1">
          <div className="d-flex justify-content-center"> {icon}</div>
          <div className="mb-2 text-center mt-5">{step}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
