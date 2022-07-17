import React, { Link } from "react";
import { Toolbar } from "@mui/material";

export default function Footer() {
  return (
    <div>
      <footer className="footerToolBar">
        <div className="social">
          <div className="circleStyle">
            <a href="#">
              <i className="icon ion-social-instagram"></i>
            </a>
          </div>
          <div className="circleStyle">
            <a href="#">
              <i className="icon ion-social-snapchat"></i>
            </a>
          </div>
          <div className="circleStyle">
            <a href="#">
              <i className="icon ion-social-twitter"></i>
            </a>
          </div>
          <div className="circleStyle">
            <a href="#">
              <i className="icon ion-social-facebook"></i>
            </a>
          </div>
        </div>
        <ul className="list-inline">
          <li className="list-inline-item">
            <a href="#">Home</a>
          </li>
          <li className="list-inline-item">
            <a href="#">Services</a>
          </li>
          <li className="list-inline-item">
            <a href="#">About</a>
          </li>
          <li className="list-inline-item">
            <a href="#">Terms</a>
          </li>
          <li className="list-inline-item">
            <a href="#">Privacy Policy</a>
          </li>
        </ul>
        <p className="copyright">Copyright @ 2022 Chart My Jog</p>
      </footer>
    </div>
  );
}
