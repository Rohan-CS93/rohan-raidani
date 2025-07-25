import React from "react";

import {
  FaGithub,
  FaWhatsapp,
  FaLinkedin,
  FaInstagram,
  FaFilePdf,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export const Menu = (props) => {
  const { onSectionChange, menuOpened, setMenuOpened } = props;

  return (
    <>
      {/* Menu button */}
      <button
        onClick={() => setMenuOpened(!menuOpened)}
        className="z-20 fixed top-4 right-4 md:top-12  md:right-12 p-3 bg-indigo-600 w-11 h-11 rounded-md"
      >
        <div
          className={`bg-white h-0.5 rounded-md w-full transition-all ${
            menuOpened ? "rotate-45 translate-y-0.5" : ""
          }`}
        />
        <div
          className={`bg-white h-0.5 rounded-md w-full my-1 ${
            menuOpened ? "hidden" : ""
          }`}
        />
        <div
          className={`bg-white h-0.5 rounded-md w-full transition-all ${
            menuOpened ? "-rotate-45" : ""
          }`}
        />
      </button>

      {/* Side menu */}
      <div
        className={`z-10 fixed top-0 right-0 bottom-0 bg-white transition-all overflow-hidden flex flex-col ${
          menuOpened ? "w-full md:w-80" : "w-0"
        }`}
      >
        <div className="flex-1 flex items-start justify-center flex-col gap-6 px-8">
          <MenuButton label="About" onClick={() => onSectionChange(0)} />
          <MenuButton label="Skills" onClick={() => onSectionChange(1)} />
          <MenuButton label="Projects" onClick={() => onSectionChange(2)} />
          <MenuButton label="Contact" onClick={() => onSectionChange(3)} />
        </div>

        {/* Social Media Buttons (Only Icons) */}
        <div className="px-6">
          <ul className="flex justify-center gap-4 wrapper flex-wrap">
            <SocialMediaButton
              platform="Github"
              tooltip="Github"
              onClick={() =>
                window.open("https://github.com/Rohan-Raidani", "_blank")
              }
            >
              <FaGithub size={24} />
            </SocialMediaButton>
            <SocialMediaButton
              platform="Linkdin"
              tooltip="Linkdin"
              onClick={() =>
                window.open(
                  "https://www.linkedin.com/in/rohan-raidani-59b57923b/",
                  "_blank"
                )
              }
            >
              <FaLinkedin size={24} />
            </SocialMediaButton>
            <SocialMediaButton
              platform="Mail"
              tooltip="Mail"
              onClick={() => onSectionChange(3)}
            >
              <MdEmail size={24} />
            </SocialMediaButton>
            <SocialMediaButton
              platform="CV"
              tooltip="Resume"
              onClick={() =>
                // window.open(
                //   "https://rohan-raidani-ten.vercel.app/resume/Rohan-Raidani.pdf",
                //   "_blank"
                // )
                window.open(
                  "https://drive.google.com/file/d/1uoOpliWPYC3TQtXX249qBAg_2zah2HPb/view?usp=sharing",
                  "_blank"
                )
              } // Replace with your actual resume URL
            >
              <FaFilePdf size={24} />
            </SocialMediaButton>
            <SocialMediaButton
              platform="Whatsapp"
              tooltip="Share"
              onClick={() =>
                window.open(
                  "https://api.whatsapp.com/send?text=I%20just%20came%20across%20Rohan%20Raidani%27s%20portfolio.%20If%20you%20appreciate%20great%20design%2C%20you%27re%20going%20to%20love%20this!%0ALink%20=>%20https%3A%2F%2Frohan-raidani-ten.vercel.app%2F",
                  "_blank"
                )
                
              }
            >
              <FaWhatsapp size={24} />
            </SocialMediaButton>
          </ul>
        </div>
      </div>
    </>
  );
};

const MenuButton = ({ label, onClick }) => (
  <button
    onClick={onClick}
    className="text-2xl font-bold cursor-pointer hover:text-indigo-600 transition-colors"
  >
    {label}
  </button>
);

const SocialMediaButton = ({ platform, tooltip, onClick, children }) => (
  <li className={`icon ${platform}`}>
    <button onClick={onClick}>{children}</button>
    <span
      className={`${tooltip} tooltip absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full  text-white text-sm rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity`}
    >
      {tooltip}
    </span>
  </li>
);
