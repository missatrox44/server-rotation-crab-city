import React from 'react'

function UndoBtn({onClick}) {

  return (
    <button
      className="text-white bg-pink-600 hover:bg-pink-800 focus:outline-none focus:ring-4 focus:ring-pink-300 font-medium rounded-full text-xl px-10 py-3 text-center mr-2 mb-2 dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800 hover:cursor-pointer"
      onClick={onClick}
      onSubmit={onClick}
    >
      <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M7.18,4,8.6,5.44,6.06,8h9.71a6,6,0,0,1,0,12h-2V18h2a4,4,0,0,0,0-8H6.06L8.6,12.51,7.18,13.92,2.23,9Z"></path></svg>
      {/* Undo */}
    </button>
  )
}

export default UndoBtn