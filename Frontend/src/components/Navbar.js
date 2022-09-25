import React, { useContext } from "react";
import { LoginContext } from "../Contexts/LoginContext";

import { Link } from "react-router-dom";

const Navbar = () => {
  const { userName, setUserName, token, setToken } = useContext(LoginContext);
  const handleSubmit = () => {
    document.cookie = `token=${token}; max-age=-60;SameSite:None;secure;`;
    setToken(null);
  };
  return (
    <nav
      className="navbar navbar-expand-lg position-fixed vw-100"
      style={{ top: 0, zIndex: 1 }}
    >
      <div className="container-fluid">
        <Link
          className="navbar-brand px-5"
          style={{ fontWeight: "bold", fontSize: "1.5em" }}
          to="/"
        >
          Predict Bus
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About Us
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">
                Contact Us
              </Link>
            </li>
          </ul>
          <div className="d-flex">
            {!token && (
              <>
                <Link to="/login">
                  <button className="btn me-3 btn-outline-dark">Login</button>
                </Link>
                <Link to="/signup">
                  <button className="btn me-5 btn-outline-dark">Sign up</button>
                </Link>
              </>
            )}
            {token && (
              <>
                <ul
                  className="navbar-nav me-auto mb-2 mb-lg-0"
                  style={{ paddingRight: "8px", marginTop: "5px" }}
                >
                  <li className="nav-item mx-5">Welcome {userName}</li>
                </ul>
                <Link to="/login">
                  <button
                    className="btn me-3 btn-outline-dark"
                    onClick={handleSubmit}
                  >
                    Log out
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
