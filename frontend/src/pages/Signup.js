import React , {useState} from "react";
import axios from 'axios'
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBInput,
} from "mdb-react-ui-kit";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

function App() {

  const [userName,setUserName] = useState('')
  const [contact,setContact] = useState('');
  const [password,setPassword] = useState('');
  const [spassword,setSpassword] = useState('');

  const handleSubmit = () => {
    if(password !== spassword) {
      
    }
    const user = {
      name : userName,
      mobile : contact,
      password : password
    }
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    };
    fetch('http://localhost:2000/auth/signup', requestOptions)
      .then(response => response.json())
      .then(data => console.log(data));
  }

  return (
    <MDBContainer
      fluid
      className="vh-100 p-0"
      style={{ overflow: "hidden", backgroundColor: "whitesmoke" }}
    >
      <Navbar />
      <MDBRow className="d-flex align-items-center px-5 h-100">
        <MDBCol col="8" className="d-flex justify-content-center">
          <img
            src="/assets/images/school-bus.gif"
            className="img-fluid rounded-circle border border-5 border-warning"
            alt="Sample image"
          />
        </MDBCol>

        <MDBCol
          col="4"
          md="6"
          className="border border-warning p-5 border-3 rounded-3 shadow-lg"
          style={{ backgroundColor: "white" }}
        >
          <MDBInput
            wrapperClass="mb-4"
            label="Username"
            id="formControlLg"
            type="text"
            size="lg"
            placeholder="Enter Your Username"
            required
            onChange={(e) => setUserName(e.target.value)}
          />
          <MDBInput
            wrapperClass="mb-4"
            label="Contant No"
            id="formControlLg"
            type="tel"
            size="lg"
            placeholder="Enter Your Contact Number"
            required
            onChange={(e) => setContact(e.target.value)}

          />
          <MDBInput
            wrapperClass="mb-4"
            label="Password"
            id="formControlLg"
            type="password"
            placeholder="Enter Your Password"
            size="lg"
            required
            onChange={(e) => setPassword(e.target.value)}

          />
          <MDBInput
            wrapperClass="mb-4"
            label="Confirm Password"
            id="formControlLg"
            type="password"
            placeholder="Confirm Your Password"
            size="lg"
            required
            onChange={(e) => setSpassword(e.target.value)}

          />
          {/* implement only if time permits */}
          {/* <div className="d-flex justify-content-between mb-4">
            <MDBCheckbox
              name="flexCheck"
              value=""
              id="flexCheckDefault"
              label="Remember me"
            />
            <a href="!#">Forgot password?</a>
          </div> */}

          <div className="text-center text-md-start mt-4 pt-2">
            <Link to="/">
              <MDBBtn className="mb-0 px-5 btn-warning" size="lg" onClick={handleSubmit}>
                Sign Up
              </MDBBtn>
            </Link>
            <p className="small fw-bold mt-2 pt-1 mb-2">
              Password not matching
            </p>
            <p className="small fw-bold mt-2 pt-1 mb-2">
              Already have an Account?{" "}
              <Link to="/login" className="link-danger">
                Login
              </Link>
            </p>
          </div>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default App;
