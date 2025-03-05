import React from "react";
import Project1 from "../img/project1.jpeg";
import Project2 from "../img/project2.jpeg";
import Project3 from "../img/project3.jpeg";
import "font-awesome/css/font-awesome.min.css";

// import { FiMenu, FiX, FiHome, FiUser, FiPhone, FiBriefcase } from "react-icons/fi";

const Project = () => {
  return (
    <div id="projects">
      <div className="container">
        <h1 className="sub-title">My Projects</h1>
        <div className="work-list">
          <div className="work">
            {/* <img src alt="project1" /> */}
            <img src={Project1} alt="NewsApp Project" />
            <div className="layer">
              <h3>NewsApp</h3>
              <p>
                News API App is a React-based web application designed to fetch
                and display the latest news articles from various sources using
                a public News API. It serves as a platform for users to explore
                trending news, categorized headlines, and read detailed articles
                in a user-friendly interface.
              </p>
              <a
                href="https://github.com/kavitasoren02/news-api"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa-solid fa-up-right-from-square"></i>
              </a>
            </div>
          </div>
          <div className="work">
            <img src={Project2} alt="TextUtilsProject" />
            <div className="layer">
              <h3>Text-Utils</h3>
              <p>
                Text-Utils is a versatile text manipulation tool built to
                enhance productivity. It allows users to perform various text
                operations like converting case (uppercase/lowercase), counting
                characters and more. The application is user-friendly,
                efficient, and designed with a clean interface for seamless
                usage.
              </p>
              <a
                href="https://github.com/kavitasoren02/textutil"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa-solid fa-up-right-from-square"></i>
              </a>
            </div>
          </div>
          <div className="work">
            <img src={Project3} alt="BookMyShow Project" />
            <div className="layer">
              <h3>BookMyShow</h3>
              <p>
                A movie application built with React.js, offering users a
                platform to browse, search, and explore movies in detail.The app
                features dynamic listings,and detailed movie pages.
                Administrators can manage movie listings through a dedicated
                dashboard, allowing them to add, edit,movies effortlessly.
              </p>
              <a
                href="https://github.com/kavitasoren02/bookmyshowFrontend"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa-solid fa-up-right-from-square"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Project;
