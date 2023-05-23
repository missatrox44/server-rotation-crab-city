import React from 'react'

function BreakOverBtn({onClick}) {
  return (
    <button className="text-amber-700 hover:text-white border border-amber-700 hover:bg-amber-800 focus:ring-4 focus:outline-none focus:ring-amber-300 font-medium rounded-lg text-sm px-5 py-3 text-center dark:border-amber-500 dark:text-amber-500 dark:hover:text-white dark:hover:bg-amber-600 dark:focus:ring-amber-800"
    onClick={onClick}>
     Break Over
    </button>
  )
}

export default BreakOverBtn