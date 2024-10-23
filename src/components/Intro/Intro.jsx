import React, { useContext } from "react";
import "./Intro.css";
import Vector1 from "../../img/Vector1.png";
import Vector2 from "../../img/Vector2.png";
import boy from "../../img/boy.png";
// // import bloodykheeng from "../../img/bloodykheeng.png";
// import bloodykheeng from "../../img/PicsArt_04-19-06.50.24.png";
// import bloodykheeng from "../../img/selfie_PicsArt_04-19-06.55.04.png";
import bloodykheeng from "../../img/69955065.jpeg";
import glassesimoji from "../../img/glassesimoji.png";
import thumbup from "../../img/thumbup.png";
import crown from "../../img/crown.png";
import FloatinDiv from "../FloatingDiv/FloatingDiv";
import Github from "../../img/github.png";
import LinkedIn from "../../img/linkedin.png";
import Instagram from "../../img/instagram.png";
import { themeContext } from "../../Context";
import { motion } from "framer-motion";
import { Link } from "react-scroll";

//
import ReactGA from "react-ga4";

const Intro = () => {
  // Transition
  const transition = { duration: 2, type: "spring" };

  // context
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;

  return (
    <div className="Intro" id="Intro">
      {/* left name side */}
      <div className="i-left">
        <div className="i-name">
          {/* yahan change hy darkmode ka */}
          <span style={{ color: darkMode ? "white" : "" }}>Hy! I Am</span>
          <span>BK</span>
          <span style={{ color: darkMode ? "white" : "black" }}>
            I am a versatile Full Stack Software Developer, passionate about
            creating intuitive user experiences through UI/UX design. I
            specialize in React.js, Laravel, and MySQL, with a proven ability to
            develop seamless, responsive, and visually engaging applications
            that meet both user needs and business objectives.
          </span>
        </div>

        <a
          href="https://ko-fi.com/bloodykheeng"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => {
            ReactGA.event({
              category: "User",
              action: "Click Hire Me or Buy Coffee", // Event action
              label: "Hire Me Button" // Optional: label to describe the event
            });
          }}
        >
          <button className="button">Hire me or Buy me a Coffee ☕☕☕</button>
        </a>

        {/* social icons */}
        <div className="i-icons">
          <a
            href="https://github.com/bloodykheeng"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              ReactGA.event({
                category: "Social Media",
                action: "Click GitHub Icon",
                label: "GitHub"
              });
            }}
          >
            <img src={Github} alt="Github" />
          </a>

          <a
            href="https://www.linkedin.com/in/kimerafarouk"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              ReactGA.event({
                category: "Social Media",
                action: "Click LinkedIn Icon",
                label: "LinkedIn"
              });
            }}
          >
            <img src={LinkedIn} alt="LinkedIn" />
          </a>

          <a
            href="https://www.instagram.com/bloody_kheeng/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              ReactGA.event({
                category: "Social Media",
                action: "Click Instagram Icon",
                label: "Instagram"
              });
            }}
          >
            <img src={Instagram} alt="Instagram" />
          </a>
        </div>
      </div>
      {/* right image side */}
      <div className="i-right">
        <img src={Vector1} alt="" />
        <img src={Vector2} alt="" />
        <img className="myimage" src={bloodykheeng} alt="" />
        {/* animation */}
        <motion.img
          initial={{ left: "-36%" }}
          whileInView={{ left: "-24%" }}
          transition={transition}
          src={glassesimoji}
          alt=""
        />

        <motion.div
          initial={{ top: "-4%", left: "74%" }}
          whileInView={{ left: "68%" }}
          transition={transition}
          className="floating-div"
        >
          <FloatinDiv img={crown} text1="Web" text2="Developer" />
        </motion.div>

        {/* animation */}
        <motion.div
          initial={{ left: "9rem", top: "18rem" }}
          whileInView={{ left: "0rem" }}
          transition={transition}
          className="floating-div"
        >
          {/* floatinDiv mein change hy dark mode ka */}
          <FloatinDiv img={thumbup} text1="UI/UX" text2="Expert" />
        </motion.div>

        <div className="blur" style={{ background: "rgb(238 210 255)" }}></div>
        <div
          className="blur"
          style={{
            background: "#C1F5FF",
            top: "17rem",
            width: "21rem",
            height: "11rem",
            left: "-9rem"
          }}
        ></div>
      </div>
    </div>
  );
};

export default Intro;
