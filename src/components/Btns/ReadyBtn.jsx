import React from "react";

function ReadyBtn({onClick}) {

  return (
    <button className="text-teal-700 hover:text-white border border-teal-700 hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-3 py-2 text-center mb-2 mr-2 dark:border-teal-500 dark:text-teal-500 dark:hover:text-white dark:hover:bg-teal-600 dark:focus:ring-teal-800"
    onClick={onClick}>
      Return
    </button>
  );
}

export default ReadyBtn;
