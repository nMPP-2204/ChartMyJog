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

    // <div classNameName="footerComponents">

    //   <footer
    //     classNameName="footerToolBar"
    //     // style={{
    //     //   // display: "flex",
    //     //   // flexDirection: "column",
    //     //   // position: "static",
    //     //   backgroundColor: "#525252",
    //     //   height: "15vh",
    //     //   color: "white"}}
    //   >
    //     <div classNameName="footerMian">
    //     <div classNameName="footerInfo">
    //       <div classNameName="infoColumns">
    //         <ul style={{ fontSize: "12px", listStyle: "none" }}>
    //           <div style={{ fontSize: "16px", fontWeight: "bold" }}>
    //             Community
    //           </div>
    //           <br />
    //           <li>Friends</li>
    //           <li>Friends</li>
    //           <li>Friends</li>
    //         </ul>
    //       </div>
    //       <div classNameName="infoColumns">
    //         <ul style={{ fontSize: "11px", listStyle: "none" }}>
    //           <div style={{ fontSize: "16px", fontWeight: "bold" }}>
    //             Community
    //           </div>
    //           <br />
    //           <li>Friends</li>
    //           <li>Friends</li>
    //           <li>Friends</li>
    //         </ul>
    //       </div>
    //       <div classNameName="infoColumns">
    //         {/* <ul style={{ fontSize: "12px", listStyle: "none" }}> */}
    //           <div style={{ fontSize: "16px", fontWeight: "bold" }}>
    //             Follow Us
    //           </div>
    //           <br />
    //           <a href=" "><i classNameName="fa-brands fa-facebook-f"></i></a>
    //           {/* <FontAwesomeIcon icon="fa-brands fa-facebook-f" /> */}
    //           <li>Friends</li>
    //         {/* </ul> */}
    //       </div>
    //     </div>
    //     <div
    //       style={{
    //         fontSize: "12px",
    //         display: "flex",
    //         justifyContent: "center",
    //       }}
    //     >
    //       Copyright @ 2022 Chart My Jog
    //     </div>
    //   </div>
    //   </footer>
    // </div>
  );
}
