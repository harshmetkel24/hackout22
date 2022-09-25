import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { Container, TextField, Button, FormControl } from "@mui/material";
import { Box } from "@mui/system";

import SendIcon from "@mui/icons-material/Send";

// importing typerwriter-effect package to display typing effect
import TypeWriter from "typewriter-effect";
// importing GraphemeSplitter to split emojis as seperate individual characters
import GraphemeSplitter from "grapheme-splitter";

const list = [
  "We predict your Bus🚌",
  "♥ Our Work?",
  "Or",
  "faced any issue?",
  "Then do Contact Us👋🏽",
];

const ContactMe = () => {
  const [error, setError] = useState(null);
  const [mailerState, setMailerState] = useState({
    mobile: "",
    message: "",
  });

  useEffect(() => {
    document.title = "Contact | Predict Bus";
  }, []);

  const handelStateChange = (event) => {
    setMailerState((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const sendEmail = (e) => {
    console.log(mailerState);
    e.preventDefault();

    const feedback = {
      mobile: mailerState.mobile,
      message: mailerState.message,
    };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(feedback),
    };
    const url =
      process.env.NODE_ENV === "production"
        ? "/feedback"
        : "http://localhost:2000/feedback";
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        if (data.success) {
          alert("Your message is sent Successfully🤝🏽.");
        } else {
          setError(data.message);
          alert(
            "some error occured while sending your message. Please try again after a while. Inconvineince caused is regretted🙇🏽‍♂️."
          );
        }
      })
      .catch((err) => {
        setError(err);
      });
  };
  return (
    <>
      <Navbar />
      <Container
        maxWidth={"lg"}
        sx={{
          minHeight: "80vh",
          marginTop: "6em",
          marginBottom: {
            sm: "0",
            xs: "8em",
          },
          padding: "2em 0",
          borderRadius: 2,
          width: {
            xs: "90vw",
          },
        }}
      >
        <Box
          className="typewriter"
          sx={{
            width: "fit-content",
            margin: "0 auto",
            fontSize: {
              md: "3em",
              sm: "2em",
              xs: "1.5em",
            },
            mb: 4,
            color: "#fff",
            animation: "text 6s infinite",
            fontWeight: 700,
          }}
        >
          <TypeWriter
            options={{
              strings: list,
              autoStart: true,
              loop: true,
              pauseFor: "1500",
              // graphemesplitter convert the multichar letters to single char
              stringSplitter: (str) => {
                const splitter = new GraphemeSplitter();
                return splitter.splitGraphemes(str);
              },
            }}
          />
        </Box>
        <Box
          sx={{
            width: "70%",
            // height: "450px",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            justifyContent: "space-around",
            margin: "auto",
          }}
        >
          <FormControl
            component="form"
            onSubmit={sendEmail}
            sx={{ width: "100%" }}
          >
            <TextField
              id="outlined-multiline-static"
              label="Contact No"
              rows={10}
              placeholder="Please Enter your Contact No here..."
              variant="filled"
              color="warning"
              fullWidth
              name="mobile"
              onChange={handelStateChange}
              value={mailerState.email}
              required
            />
            <TextField
              id="outlined-multiline-static"
              label="Message"
              multiline
              rows={10}
              placeholder="Please Enter your message here..."
              variant="filled"
              color="warning"
              fullWidth
              name="message"
              onChange={handelStateChange}
              value={mailerState.message}
              required
            />
            <Button
              type="submit"
              color="warning"
              variant="contained"
              sx={{ my: 2 }}
              endIcon={<SendIcon />}
            >
              Send
            </Button>
            {error && <p style={{ color: "red" }}>{error}</p>}
          </FormControl>
        </Box>
      </Container>
    </>
  );
};

export default ContactMe;
