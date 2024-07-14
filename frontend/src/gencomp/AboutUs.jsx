import React from 'react';
import './aboutus.css'; // Import CSS file for styling

const AboutUs = () => {
  return (
    <div className="about-us">
      <h1>About Us</h1>
      <div className="section">
        <h2>How We Came Up with the Idea</h2>
        <p>
          Our team, consisting of Angel, Tejas, Tushar, Yashrajsing, and me (your name), came together with a shared passion for education and technology.
          We wanted to create a platform that makes learning engaging and fun. Combining our skills in development, design, writing, and AI, we embarked on
          the journey to create this study and quiz app. By brainstorming ideas, conducting research, and iterating on prototypes, we eventually developed
          a product that we believe can make a positive impact on learners of all ages.
        </p>
      </div>
      <div className="section">
        <h2>How We Made This App</h2>
        <p>Insert your description here...</p>
      </div>
      <div className="section">
        <h2>Meet the Team</h2>
        <div className="team-members">
          <div className="team-member">
            <h3>Angel Koradiya</h3>
            <p>Full Stack Developer</p>
          </div>
          
         
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
