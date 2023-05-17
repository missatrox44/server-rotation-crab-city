import React from "react";

function AssignBtn({onClick, bigTop}) {

  return (
    <button 
      className={`text-white focus:outline-none focus:ring-4 font-medium rounded-full text-sm px-5 py-3 text-center 

        ${bigTop ? 
          "bg-teal-800 hover:bg-teal-800 focus:ring-teal-300 dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800" 
        :
          "bg-cyan-600 hover:bg-cyan-800 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-600 dark:focus:ring-cyan-800"
        }`
      }

      onClick={onClick}
      >
      +
    </button>
  );
}

export default AssignBtn;
