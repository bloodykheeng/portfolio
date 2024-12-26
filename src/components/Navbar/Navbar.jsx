import React, { useState, useContext } from "react";
import Toggle from "../Toggle/Toggle";
import "./Navbar.css";
import { Link } from "react-scroll";
import { themeContext } from "../../Context";
import { FiMenu, FiX } from "react-icons/fi"; // Hamburger icons

//
import ReactGA from "react-ga4";

const Navbar = () => {
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleOutsideClick = () => {
    setIsMobileMenuOpen(false); // Close the mobile menu when clicking outside
  };

  return (
    <div
      className="n-wrapper"
      id="Navbar"
      style={{ backgroundColor: darkMode ? "#333" : "#fff" }}
    >
      {/* left */}
      <div className="n-left">
        <div className="n-name" style={{ color: darkMode ? "#fff" : "#000" }}>
          BoodyKheeng
        </div>
        <Toggle />
      </div>

      {/* right */}
      <div className="n-right">
        {/* Desktop menu */}
        <div className="n-list">
          <div className="n-links-container">
            <span className="n-link">
              <Link activeClass="active" to="Intro" spy={true} smooth={true}>
                Home
              </Link>
            </span>
            <span className="n-link">
              <Link activeClass="active" to="services" spy={true} smooth={true}>
                Services
              </Link>
            </span>
            <span className="n-link">
              <Link activeClass="active" to="works" spy={true} smooth={true}>
                Experience
              </Link>
            </span>
            <span className="n-link">
              <Link activeClass="active" to="projects" spy={true} smooth={true}>
                Projects
              </Link>
            </span>
            <span className="n-link">
              <Link
                activeClass="active"
                to="testimonial"
                spy={true}
                smooth={true}
              >
                Testimonials
              </Link>
            </span>
          </div>
        </div>

        {/* Contact button */}
        <div className="nav-contact-btn">
          <a
            href="https://wa.me/256707860666"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              ReactGA.event({
                category: "Contact",
                action: "Click WhatsApp Contact",
                label: "WhatsApp"
              });
            }}
          >
            <button
              className="button n-button"
              style={{ color: darkMode ? "#fff" : "#000" }}
            >
              Contact
            </button>
          </a>
        </div>

        {/* Hamburger icon (mobile) */}
        <div className="hamburger-icon" onClick={handleMenuToggle}>
          {isMobileMenuOpen ? (
            <FiX size={30} color={darkMode ? "#fff" : "#000"} />
          ) : (
            <FiMenu size={30} color={darkMode ? "#fff" : "#000"} />
          )}
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div
            className="mobile-menu"
            onClick={handleOutsideClick}
            style={{
              backgroundColor: darkMode ? "#333" : "#fff", // Set background color dynamically
              color: darkMode ? "#fff" : "#000" // Adjust text color accordingly
            }}
          >
            <div className="mobile-links-container">
              <span className="mobile-link">
                <Link
                  activeClass="active"
                  to="Intro"
                  spy={true}
                  smooth={true}
                  onClick={handleOutsideClick}
                >
                  Home
                </Link>
              </span>
              <span className="mobile-link">
                <Link
                  activeClass="active"
                  to="services"
                  spy={true}
                  smooth={true}
                  onClick={handleOutsideClick}
                >
                  Services
                </Link>
              </span>
              <span className="mobile-link">
                <Link
                  activeClass="active"
                  to="works"
                  spy={true}
                  smooth={true}
                  onClick={handleOutsideClick}
                >
                  Experience
                </Link>
              </span>
              <span className="mobile-link">
                <Link
                  activeClass="active"
                  to="projects"
                  spy={true}
                  smooth={true}
                  onClick={handleOutsideClick}
                >
                  Projects
                </Link>
              </span>
              <span className="mobile-link">
                <Link
                  activeClass="active"
                  to="testimonial"
                  spy={true}
                  smooth={true}
                  onClick={handleOutsideClick}
                >
                  Testimonials
                </Link>
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
