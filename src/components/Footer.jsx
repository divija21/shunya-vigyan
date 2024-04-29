import React from "react";
import { Link } from "react-router-dom";

function Footer() {

  return (
    <footer className="footer text-center text-lg-start bg-dark text-light">
      <section className="">
        <div className="container text-center text-md-start mt-5">
          <div className="row mt-3">
            <div className="col-md-6 col-lg-6 col-xl-6 mx-auto mb-4">
              <div className="text-uppercase text-left fw-bold fs-2">
                Code.<span className="fs-5">com</span>
              </div>
              <div className="fs-6 text-left">by Shuniyavigyan</div>
              <div className="text-left text-secondary my-1">
                We are an online platform that aims to teach students coding in their native language. This is to help all those students out there who want to learn coding but can't because of a language barrier!
              </div>
            </div>

            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold mb-2">Legals</h6>
              <ul className="text-left">
                <Link to="/contact">
                  <li className="p-1">Contact Us</li>
                </Link>
                <Link to="/privacy-policy">
                  <li className="p-1">Privacy Policy</li>
                </Link>
                <Link to="/refund-policy">
                  <li className="p-1">Refund Policy</li>
                </Link>
                <Link to="/terms-conditions">
                  <li className="p-1">Terms & Conditions</li>
                </Link>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <div className="text-center p-4 bg-dark border-top border-secondary">
        <span className="text-secondary"> © 2023 Copyright: </span>
        <a
          className="text-secondary mx-1"
          href="https://shiniyavigyan.com/"
          target="_blank"
          rel="noreferrer"
        >
          shuniyavigyan.com
        </a>
      </div>
    </footer>
  );
}

export default Footer;
