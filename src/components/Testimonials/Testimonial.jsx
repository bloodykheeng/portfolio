import React from "react";
import "./Testimonial.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { Pagination } from "swiper";
import "swiper/css/pagination";
import profilePic1 from "../../img/profile1.jpg";
import profilePic2 from "../../img/profile2.jpg";
import profilePic3 from "../../img/profile3.jpg";
import profilePic4 from "../../img/profile4.jpg";

import client1 from "../../img/client1.avif";
import client2 from "../../img/client2.jpeg";
import client3 from "../../img/client3.webp";
import client4 from "../../img/client4.webp";

const Testimonial = () => {
  const clients = [
    {
      img: client1,
      review:
        "Bk You Know What , You’re really good at following up with the client so as to ensure that they are never left in the dark. Keep it up!."
    },
    {
      img: client2,
      review:
        "Your loyal customer base is outstanding. Customers often ask for you by name and you have a lot of repeat customers as a result. Great job!."
    },
    {
      img: client3,
      review:
        "Bk I cant believe that Even when customers are difficult, you still manage to give them feedback in a timely and constructive manner.."
    },
    {
      img: client4,
      review:
        "You have the natural ability to understand and feel what your customers are experiencing, and you are able to meet their needs effectively. Well done!."
    }
  ];

  return (
    <div className="t-wrapper" id="testimonial">
      <div className="t-heading">
        <span>Clients always get </span>
        <span>Exceptional Work </span>
        <span>from me...</span>
        <div
          className="blur t-blur1"
          style={{ background: "var(--purple)" }}
        ></div>
        <div className="blur t-blur2" style={{ background: "skyblue" }}></div>
      </div>
      <Swiper
        // install Swiper modules
        modules={[Pagination]}
        slidesPerView={1}
        pagination={{ clickable: true }}
      >
        {clients.map((client, index) => {
          return (
            <SwiperSlide key={index}>
              <div className="testimonial">
                <div
                  style={{
                    background: `url(${client.img})`,
                    backgroundSize: "cover"
                  }}
                  className="testimonialImage"
                ></div>

                <span>{client.review}</span>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default Testimonial;
