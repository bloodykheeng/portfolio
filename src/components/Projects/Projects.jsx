import React, { useContext } from "react";
import "./Projects.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Sidebar from "../../img/sidebar.png";
import Ecommerce from "../../img/ecommerce.png";
import HOC from "../../img/hoc.png";
import MusicApp from "../../img/musicapp.png";
import { themeContext } from "../../Context";

//
import OagDb from "../../img/projects/oag_db.png";
import Mwe from "../../img/projects/mwe.png";
import OagLogin from "../../img/projects/oag_login.png";
import ElevatePesa from "../../img/projects/elevate_pesa.png";
import MbararaCitySite from "../../img/projects/mbarara_city_site.png";

const Projects = () => {
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;
  return (
    <div className="portfolio" id="projects">
      {/* heading */}
      <span style={{ color: darkMode ? "white" : "" }}>Recent Projects</span>
      {/* <span>Portfolio</span> */}

      {/* slider */}
      <Swiper
        spaceBetween={30}
        slidesPerView={3}
        grabCursor={true}
        autoplay={{
          delay: 3000, // Time between slides in milliseconds (3 seconds here)
          disableOnInteraction: false // Swiping manually won't stop autoplay
        }}
        loop={true} // Enable looping so it swipes continuously
        className="portfolio-slider"
      >
        <SwiperSlide>
          <img src={MbararaCitySite} alt="Mbarara City Site Project" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={OagLogin} alt="OAG Login Project" />
        </SwiperSlide>

        <SwiperSlide>
          <img src={OagDb} alt="OAG Citizen Feedback Project" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={Mwe} alt="MWE Project" />
        </SwiperSlide>

        <SwiperSlide>
          <img src={ElevatePesa} alt="Elevate Pesa Project" />
        </SwiperSlide>
        {/* 
        <SwiperSlide>
          <img src={Sidebar} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={Ecommerce} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={MusicApp} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={HOC} alt="" />
        </SwiperSlide> */}
      </Swiper>
    </div>
  );
};

export default Projects;
