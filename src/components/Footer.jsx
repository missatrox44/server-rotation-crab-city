import React from "react";
import UndoBtn from "./Btns/UndoBtn"

function Footer() {

  const handleUndo = () => {
    console.log('undo button clicked');
  }

  return (
    <footer className="bottom-0 w-full my-4">
      <div>
        <UndoBtn onClick={() => handleUndo()}/>
      </div>
      Created by{" "}
      <a target="_blank" href="https://github.com/missatrox44">
        S4R4
      </a>
      {" - "}
      <a target="_blank" href="https://chelsea314.github.io/portfolio/">
        Chelsea
      </a>
      {" - "}
      <a target="_blank" href="https://andcooke.github.io/react-portfolio/">
        Andrew
      </a>
    </footer>
  );
}

export default Footer;
