import React from "react";
import ClockOutModal from "../ClockOutModal";
import { useState } from "react";

function ClockOutBtn({employee, employees, setEmployees, actionList}) {

  const [isModalVisible, setIsModalVisible] = useState(false)

  const showClockOutModal = () => {
    setIsModalVisible(true);
  }

  return (
    <>
      <button 
        className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-2 py-3 text-center w-full dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
        // onClick={handleClockOut}
        onClick={showClockOutModal}
        >
        Clock Out
      </button>
      {isModalVisible ? <ClockOutModal employee={employee} employees={employees} setEmployees={setEmployees} setIsModalVisible={setIsModalVisible} actionList={actionList}/> : ""}
    </>
  );
}

export default ClockOutBtn;
