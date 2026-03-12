import React, { useContext } from "react";
import "./Services.css";
import Card from "../Card/Card";
import HeartEmoji from "../../img/heartemoji.png";
import Glasses from "../../img/glasses.png";
import Humble from "../../img/humble.png";
import { themeContext } from "../../Context";
import { motion } from "framer-motion";
import Resume from "./bloodykheeng_cv.pdf";

//
import ReactGA from "react-ga4";

const Services = () => {
  // context
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;

  // Fade-up animation — works with flex/grid layout (no left/top offsets
  // which only work when position:absolute is set).
  // Each card staggers in 0.15s apart for a clean cascade effect.
  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 60 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: false, amount: 0.2 },
    transition: {
      duration: 0.7,
      delay,
      type: "spring",
      stiffness: 70,
      damping: 14,
    },
  });

  return (
    <div className="services" id="services">
      {/* ── Left side: heading + download ─────────────────────────────── */}
      <div className="awesome">
        <span style={{ color: darkMode ? "white" : "" }}>Technologies &</span>
        <span>services</span>

        <a
          href={Resume}
          download
          onClick={() => {
            ReactGA.event({
              category: "Download",
              action: "Click Download CV",
              label: "Resume",
            });
          }}
        >
          <button className="button s-button">Download CV</button>
        </a>

        <div className="blur s-blur1" style={{ background: "#ABF1FF94" }} />
      </div>

      {/* ── Right side: cards ─────────────────────────────────────────── */}
      <div className="cards">
        {/* Card 1 — Design */}
        <motion.div {...fadeUp(0)}>
          <Card
            emoji={HeartEmoji}
            heading={"Design"}
            detail={"Adobe xd, Photoshop, Adobe Illustrator, "}
          />
        </motion.div>

        {/* Card 2 — Front End */}
        <motion.div {...fadeUp(0.15)}>
          <Card
            emoji={Glasses}
            heading={"Front End"}
            detail={
              "Html, Css, JavaScript, Nextjs, Reactjs, Bootstrap, Tailwind, Material Ui"
            }
          />
        </motion.div>

        {/* Card 3 — Backend */}
        <motion.div {...fadeUp(0.3)}>
          <Card
            emoji={Humble}
            heading={"Backend"}
            detail={"Laravel, Node Js, Php, MySql"}
            color="rgba(252, 166, 31, 0.45)"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Services;
