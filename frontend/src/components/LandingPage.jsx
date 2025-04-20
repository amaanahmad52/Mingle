
import React, { use } from "react";
import { Link, useNavigate } from "react-router-dom";
const LandingPage = () => {
    const nav=useNavigate();
  return (
    <>
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage:
            "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
        }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
            <p className="mb-5">
            "Welcome to Mingle – the ultimate place to connect, chat, and share moments effortlessly. Stay in touch with friends and family, meet new people, and enjoy real-time messaging with a seamless experience.
            </p>
            <button onClick={()=>nav("/login")} className="btn btn-secondary">Get Started</button>
          </div>
        </div>
      </div>
    </>
  );
};
export default LandingPage;
