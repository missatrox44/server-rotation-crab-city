import React from 'react'

function AddBtn({onClick}) {
  return (
    <input
      className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-10 py-3 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      type="submit"
      value="Add"
      onClick={onClick}
      onSubmit={onClick}
    />
  )
}

export default AddBtn