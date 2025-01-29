import React, { useContext } from "react";
import "./Works.css";
import Upwork from "../../img/Upwork.png";
import NewWave from "../../img/New Wave logo.jpg";
import Fiverr from "../../img/fiverr.png";
import Amazon from "../../img/amazon.png";
import Shopify from "../../img/Shopify.png";
import Facebook from "../../img/Facebook.png";
import { themeContext } from "../../Context";
import { motion } from "framer-motion";
import { Link } from "react-scroll";

//
import laravel from "../../img/works/laravel.png";
import react from "../../img/works/React_Native_Logo.png";
import ug_gov from "../../img/works/ug_gov.jpg";

//
import ReactGA from "react-ga4";

const Works = () => {
  // context
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;

  // transition
  return (
    <div className="works" id="works">
      {/* left side */}
      <div className="w-left">
        <div className="awesome">
          {/* dark Mode */}
          <span style={{ color: darkMode ? "white" : "" }}>Some of the</span>
          <span>Brands & Clients</span>
          <span>I work with</span>
          <span style={{ color: darkMode ? "white" : "", fontSize: "1rem" }}>
            Through my journey, I have worked on various web development
            <br />
            projects using React.js and modern JavaScript frameworks.
            <br />
            These projects have helped numerous companies achieve their goals,
            <br />
            while also allowing me to grow and gain valuable experience.
            <br />
            So far, I’ve had the privilege of collaborating with many different
            <br />
            companies to execute diverse tasks, implement new features,
            <br />
            and create intuitive user interfaces that enhance user experiences.
          </span>

          <a
            href="mailto:kimerafarouk8@gmail.com"
            onClick={() => {
              ReactGA.event({
                category: "Contact",
                action: "Click Hire Me",
                label: "Email Hire"
              });
            }}
          >
            <button className="button s-button">Hire Me</button>
          </a>

          <div
            className="blur s-blur1"
            style={{ background: "#ABF1FF94" }}
          ></div>
        </div>

        {/* right side */}
      </div>
      <div className="w-right">
        <motion.div
          initial={{ rotate: 45 }}
          whileInView={{ rotate: 0 }}
          viewport={{ margin: "-40px" }}
          transition={{ duration: 3.5, type: "spring" }}
          className="w-mainCircle"
        >
          <div className="w-secCircle">
            <img
              src={react}
              alt=""
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "50%"
              }}
            />
          </div>
          <div className="w-secCircle">
            <img
              src={laravel}
              alt=""
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "50%"
              }}
            />
          </div>
          <div className="w-secCircle">
            <img
              src={NewWave}
              alt=""
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "50%"
              }}
            />
          </div>{" "}
          <div className="w-secCircle">
            <img
              src={ug_gov}
              alt=""
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "50%"
              }}
            />
          </div>
          <div className="w-secCircle">
            <img
              src={Facebook}
              alt=""
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "50%"
              }}
            />
          </div>
        </motion.div>
        {/* background Circles */}
        <div className="w-backCircle blueCircle"></div>
        <div className="w-backCircle yellowCircle"></div>
      </div>
    </div>
  );
};

export default Works;
