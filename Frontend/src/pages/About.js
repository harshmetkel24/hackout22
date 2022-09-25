import React from "react";
import Navbar from "../components/Navbar";

const About = () => {
  return (
    <>
      <Navbar />
      <div
        class="company d-flex flex-column flex-md-row  mt-5"
        style={{
          minHeight: "90vh",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div class="img" style={{ maxWidth: "50%", minWidth: "300px" }}>
          <img src="/assets/images/about-us.gif" alt="" />
        </div>
        <div class="company-info " style={{ width: "50%", minWidth: "300px" }}>
          <span>
            OUR <span class="our">GOAL</span>
          </span>
          <p>
            <b>Predict Bus</b> is an idea that came from a problem I (Harsh)
            faced while traveling on local government buses. During Peak hours,
            many people were traveling, and more buses served them. But as
            everyone is in a hurry to reach their destination, everyone takes
            the same bus. And some future buses with vacancies may go empty and
            some with too many people.
            <br />
            <br />
            So we created <b>Predict Bus</b> to predict the most optimal bus you
            should choose based on your traveling preferences.
          </p>
        </div>
      </div>
    </>
  );
};

export default About;
