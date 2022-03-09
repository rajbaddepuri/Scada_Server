import "./styles.css";
import React, { useState } from "react";
import Popup from "./Popup";

export default function Scadapopup() {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className = "page">
      <input type="button" value="Click to Open Popup" onClick={togglePopup} />
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        
      </p>
      {isOpen && (
        <Popup
          content={
            <>
              <b>Design your Popup</b>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
               
              </p>
              <button>Test button</button>
            </>
          }
          handleClose={togglePopup}
        />
      )}
    </div>
  );
}

