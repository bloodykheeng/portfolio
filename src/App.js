import Navbar from "./components/Navbar/Navbar";
import Intro from "./components/Intro/Intro";
import Services from "./components/Services/Services";
import "./App.css";
import Experience from "./components/Experience/Experience";
import Works from "./components/Works/Works";
import Projects from "./components/Projects/Projects";
import Testimonial from "./components/Testimonials/Testimonial";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";
import { useContext } from "react";
import { themeContext } from "./Context";
import Drift from "react-driftjs";

function App() {
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;
  return (
    <div
      className="App"
      style={{
        background: darkMode ? "black" : "",
        color: darkMode ? "white" : ""
      }}
    >
      <Navbar />
      <div className="app-container">
        <Intro />
        <Services />
        <Experience />
        <Works />
        <Projects />
        <Testimonial />
        {/* <Contact /> */}
        <Drift appId="n5g59y7awvaw" />
      </div>
      <Footer />
    </div>
  );
}

export default App;
