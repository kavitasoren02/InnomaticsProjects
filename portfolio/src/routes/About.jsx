import React, { useState } from 'react';

const About = () => {
  // State to manage the active tab
  const [activeTab, setActiveTab] = useState("skills");

  // Function to set the active tab
  const openTab = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div id="about">
      <div className="container">
        <div className="row">
          {/* Image Section */}
          <div className="about-col-1">
            {/* <img src="" alt="" /> */}
          </div>
          {/* Content Section */}
          <div className="about-col-2">
            <h1 className="sub-title">About Me</h1>
            <p>
              My name is Kavita, and I am currently pursuing a Master of Computer Applications from CIT
              Bangalore. I have knowledge in web development, encouraging collaborative contributions. Additionally, I am dedicated to continuously improving my proficiency in data structures
              and algorithms through consistent practice on platforms such as GeeksforGeeks.
            </p>

            {/* Tab Titles */}
            <div className="tab-titles">
              <p
                className={`tab-links ${activeTab === "skills" ? "active-link" : ""}`}
                onClick={() => openTab("skills")}
              >
                Skills
              </p>
              <p
                className={`tab-links ${activeTab === "education" ? "active-link" : ""}`}
                onClick={() => openTab("education")}
              >
                Education
              </p>
            </div>

            {/* Tab Contents */}
            <div className="tab-contents">
              {activeTab === "skills" && (
                <table style={{ width: "100%" }}>
                  <thead>
                    <tr id="headings">
                      <th>Web Technologies</th>
                      <th>Language</th>
                      <th>Database</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>HTML</td>
                      <td>C</td>
                      <td>MySQL</td>
                    </tr>
                    <tr>
                      <td>CSS</td>
                      <td>C++</td>
                      <td>MongoDB</td>
                    </tr>
                    <tr>
                      <td>JavaScript</td>
                      <td>Java</td>
                    </tr>
                    <tr>
                      <td>ReactJs</td>
                      <td>SQL</td>
                    </tr>
                    <tr>
                      <td>Node.js</td>
                      <td>Python (Basic)</td>
                    </tr>
                  </tbody>
                </table>
              )}
                
              {activeTab === "education" && (
                <table style={{ width: "100%" }}>
                  <thead>
                    <tr id="headings">
                      <th>Institution</th>
                      <th>CGPA/Percentage</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>MCA , Bangalore</td>
                      <td>9.31</td>
                    </tr>
                    <tr>
                      <td>BCA, JRU Ranchi</td>
                      <td>8.05</td>
                    </tr>
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
