import React from "react";

function BreakBtn({onClick}) {
  return (
    <button className="text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-4 focus:ring-amber-800 font-medium rounded-full text-sm px-5 py-3 text-center dark:focus:ring-amber-900"
    onClick={onClick}>
      Break
    </button>
  );
}

export default BreakBtn;
