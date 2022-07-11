import React, { Link } from "react";
import { Toolbar } from "@mui/material";




export default function Footer(){
  return(
    <div className="footerComponents">
  <Toolbar
    className="footerToolBar"
    // style={{
    //   // display: "flex",
    //   // flexDirection: "column",
    //   // position: "static",
    //   backgroundColor: "#525252",
    //   height: "15vh",
    //   color: "white"}}
      >
    {/* <div className="footerComponents"> */}
      <div className="footerInfo">
        <div className="infoColumns">
          <ul style={{fontSize: "12px", listStyle: "none"}}>
            <div style={{fontSize: "16px", fontWeight: "bold"}}>
              Community
            </div>
            <br/>
            <li>Friends</li>
            <li>Friends</li>
            <li>Friends</li>
          </ul>
        </div>
        <div className="infoColumns">
          <ul style={{fontSize: "11px", listStyle: "none"}}>
            <div style={{fontSize: "16px", fontWeight: "bold"}}>
              Community
            </div>
            <br/>
            <li>Friends</li>
            <li>Friends</li>
            <li>Friends</li>
          </ul>
        </div>
        <div className="infoColumns">
          <ul style={{fontSize: "12px", listStyle: "none"}}>
            <div style={{fontSize: "16px", fontWeight: "bold"}}>
              Follow Us
            </div>
            <br/>
            {/* <Link to="https://github.com/nMPP-2204/ChartMyJog">Github</Link> */}
            <li>Friends</li>
            <li>Friends</li>
          </ul>
        </div>
      </div>
      <div style={{fontSize: "12px", display: "flex", justifyContent: "center"}}>Copyright @ 2022 Chart My Jog</div>
    {/* </div> */}
  </Toolbar>
  </div>
  )
};
