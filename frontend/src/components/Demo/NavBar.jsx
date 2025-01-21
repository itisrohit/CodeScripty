import React from "react";

const NavBar = () => {
  return (
    <div className="w-screen h-[13vh] flex justify-center  items-center">
      <div className="bg-navbar-background text-navbar-text w-[80em] h-[4.5em] rounded-[0.5em] flex justify-between">
        <div className="w-[20em] h-full flex justify-center items-center">
          <h1>CodeScripty</h1>
        </div>
        <div className="text-navbar-button-text w-[40em] h-full flex justify-evenly items-center">
          <div className="bg-navbar-button-bg w-[9em] h-[2.5em] flex justify-center items-center rounded-[0.5em]">
            <p>Light</p>
          </div>
          <div className="bg-navbar-button-bg w-[9em] h-[2.5em] flex justify-center items-center rounded-[0.5em]">
            <p>Javascript</p>
          </div>
          <div className="bg-navbar-button-bg w-[5em] h-[2.5em] flex justify-center items-center rounded-[0.5em]">
            <p>Pro</p>
          </div>
          <div className="bg-navbar-button-bg w-[6em] h-[2.5em] flex justify-center items-center rounded-[0.5em]">
            <p>Sign In</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
