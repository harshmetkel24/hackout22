import React from "react";
import Navbar from "../components/Navbar";

const About = () => {
  return (
    <>
      <Navbar />
      <div class="company mt-5">
        <div class="img">
          <img src="/assets/images/about-us.gif" alt="" />
        </div>
        <div class="company-info">
          <span>
            PHOTOS <span class="our">FOR EVERYONE</span>
          </span>
          <p>
            <b>Pico</b> is a India-based website dedicated for sharing stock
            photography under the Pico license. Pico allows photographers to
            upload photos to its website, which are then curated by a team of
            photo editors. In Pico we are aspiring to be one of the largest
            photography suppliers on the internet.
          </p>
        </div>
      </div>
    </>
  );
};

export default About;
