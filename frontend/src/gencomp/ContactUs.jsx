import React from 'react';
import './contactus.css'; // Import CSS file for styling

const ContactUs = () => {
  return (
    <div className="contact-us">
      <h1 className="contact-header">Contact Us</h1>
      <div className="contact-list">
        <div className="contact-item">
          <h2>Angel Koradiya</h2>
          <p>Email: angel@example.com</p>
          <p>Contact: +91 1234567890</p>
          <p>Contact: +91 1234567890</p>
          <p>Contact: +91 1234567890</p>
          <p>Description: Full Stack Developer</p>
        </div>
        <div className="contact-item">
          <h2>Bhargav Panchal</h2>
          <p>Email: angel@example.com</p>
          <p>Contact: +91 1234567890</p>
          <p>Contact: +91 1234567890</p>
          <p>Contact: +91 1234567890</p>
          <p>Description: Full Stack Developer</p>
        </div>
        <div className="contact-item">
          <h2>Parch Chavda</h2>
          <p>Email: angel@example.com</p>
          <p>Contact: +91 1234567890</p>
          <p>Contact: +91 1234567890</p>
          <p>Contact: +91 1234567890</p>
          <p>Description: Full Stack Developer</p>
        </div>
        <div className="contact-item">
          <h2>Meet</h2>
          <p>Email: angel@example.com</p>
          <p>Contact: +91 1234567890</p>
          <p>Contact: +91 1234567890</p>
          <p>Contact: +91 1234567890</p>
          <p>Description: Full Stack Developer</p>
        </div>
        
      </div>
      <div className="github-section">
        <h2>GitHub Repository</h2>
        <p>Check out our project on GitHub:</p>
        <a href="https://github.com/your-username/your-project" target="_blank" rel="noopener noreferrer">GitHub Repo</a>
      </div>

      <div className="feedback-section">
        <h2>Query / Feedback</h2>
        <p>If you have any questions or feedback, feel free to reach out to us:</p>
        <form>
          <div>

          <label htmlFor="query">Query / Feedback:</label>
          <textarea id="query" name="query" rows="4" cols="50"></textarea>
          </div>
          <div>

          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" />
          </div>
          <button className="submit-button" type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
