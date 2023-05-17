import React from 'react'

function UndoBtn({onClick}) {




  return (
    <input
      className="text-white bg-emerald-700 hover:bg-emerald-800 focus:outline-none focus:ring-4 focus:ring-emerald-300 font-medium rounded-full text-sm px-10 py-3 text-center mr-2 mb-2 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"
      type="submit"
      value="Undo"
      onClick={onClick}
      onSubmit={onClick}
    />
  )
}

export default UndoBtn