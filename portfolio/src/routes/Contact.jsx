import React from "react";

const Contact = () => {
  return (
    <div id="contact">
      <div className="container">
        <div className="row">
          {/* Contact Left Section */}
          <div className="contact-left">
            <h1 className="sub-title">Contact Me</h1>
            <p>
              <i className="fa-solid fa-envelope"></i>kavitasoren2000@gmail.com
            </p>
            <p>
              <i className="fa-solid fa-phone"></i> (+91) 9693049193
            </p>
            <div className="social-icons">
              <a
                href="https://www.linkedin.com/in/kavita-soren-663181217/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa-brands fa-linkedin"></i>
              </a>
              <a
                href="mailto:kavitasoren2000@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa-solid fa-envelope"></i>
              </a>
              <a
                href="https://github.com/kavitasoren02"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa-brands fa-github"></i>
              </a>
              <a
                href="https://x.com/soren_kavita"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa-brands fa-twitter"></i>
              </a>
            </div>
            <a
              href="./CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              download
              className="btn3"
            >
              Download CV
            </a>
          </div>

          {/* Contact Right Section */}
          <div className="contact-right">
            <form name="submit-to-nodemailer">
              <input type="text" name="name" placeholder="Your Name" required />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                required
              />
              <textarea
                name="message"
                rows="9"
                placeholder="Your Message"
              ></textarea>
              <button type="submit" className="btn btn2">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="copyright">
        <p>Copyright © Kavita Soren</p>
      </div>
    </div>
  );
};

export default Contact;
