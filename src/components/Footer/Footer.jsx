import React, { useState, useEffect } from "react";
import "./Footer.css";
import Wave from "../../img/wave.png";
import Insta from "@iconscout/react-unicons/icons/uil-instagram";
import Gitub from "@iconscout/react-unicons/icons/uil-github";
import LinkedIn from "@iconscout/react-unicons/icons/uil-linkedin";
import { FaArrowUp } from "react-icons/fa"; // You can use any arrow icon here
import { Link } from "react-scroll";

const Footer = () => {
  const [showScroll, setShowScroll] = useState(false);

  // Function to check scroll position
  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 300) {
      setShowScroll(true);
    } else if (showScroll && window.pageYOffset <= 300) {
      setShowScroll(false);
    }
  };

  // Scroll event listener
  useEffect(() => {
    window.addEventListener("scroll", checkScrollTop);
    return () => {
      window.removeEventListener("scroll", checkScrollTop);
    };
  }, [showScroll]);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="footer">
      <img src={Wave} alt="" style={{ width: "100%" }} />
      <div className="f-content">
        <span>
          <br />
          <br />
          <a
            href="mailto:kimerafarouk@nwt.ug"
            style={{
              cursor: "pointer",
              textDecoration: "none",
              color: "inherit"
            }}
            onMouseEnter={(e) => (e.target.style.color = "blue")}
            onMouseLeave={(e) => (e.target.style.color = "inherit")}
          >
            kimerafarouk@nwt.ug
          </a>
          <br />
          <a
            href="mailto:kimerafarouk8@nwt.ug"
            style={{
              cursor: "pointer",
              textDecoration: "none",
              color: "inherit"
            }}
            onMouseEnter={(e) => (e.target.style.color = "blue")}
            onMouseLeave={(e) => (e.target.style.color = "inherit")}
          >
            kimerafarouk8@nwt.ug
          </a>
          <br />
          <a
            href="mailto:bloodykheeng@gmail.com"
            style={{
              cursor: "pointer",
              textDecoration: "none",
              color: "inherit"
            }}
            onMouseEnter={(e) => (e.target.style.color = "blue")}
            onMouseLeave={(e) => (e.target.style.color = "inherit")}
          >
            bloodykheeng@gmail.com
          </a>

          <br />
          <a
            href="tel:+256774542872"
            style={{
              cursor: "pointer",
              textDecoration: "none",
              color: "inherit"
            }}
            onMouseEnter={(e) => (e.target.style.color = "blue")}
            onMouseLeave={(e) => (e.target.style.color = "inherit")}
          >
            +256 774 542 872
          </a>

          <br />
          <a
            href="tel:+256707860666"
            style={{
              cursor: "pointer",
              textDecoration: "none",
              color: "inherit"
            }}
            onMouseEnter={(e) => (e.target.style.color = "blue")}
            onMouseLeave={(e) => (e.target.style.color = "inherit")}
          >
            +256 707 860 666
          </a>
        </span>

        <div className="f-icons">
          <a
            href="https://www.instagram.com/bloody_kheeng/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Insta color="white" size={"3rem"} />
          </a>
          <a
            href="https://github.com/bloodykheeng"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Gitub color="white" size={"3rem"} />
          </a>
          <a
            href="https://www.linkedin.com/in/kimerafarouk"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkedIn color="white" size={"3rem"} />
          </a>
        </div>
      </div>

      {/* Back to top button */}
      {showScroll && (
        <button
          className="scrollTop"
          onClick={scrollToTop}
          style={{
            position: "fixed",
            bottom: "100px",
            right: "10px",
            backgroundColor: "#333",
            color: "#fff",
            border: "none",
            borderRadius: "50%",
            padding: "10px",
            fontSize: "20px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: "100"
          }}
        >
          <Link activeClass="active" to="Intro" spy={true} smooth={true}>
            <FaArrowUp />
          </Link>
        </button>
      )}
    </div>
  );
};

export default Footer;
