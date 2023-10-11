import React from "react";
import ClockOutModal from "../ClockOutModal";
import { useState } from "react";

function ClockOutBtn({ employee, employees, setEmployees, lastAction }) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showClockOutModal = () => {
    setIsModalVisible(true);
  };

  return (
    <>
      <button
        className="text-white bg-rose-700 hover:bg-rose-800 focus:outline-none focus:ring-4 focus:ring-rose-300 font-medium rounded-full text-sm px-2 py-3 text-center w-full dark:bg-rose-600 dark:hover:bg-rose-700 dark:focus:ring-rose-900"
        onClick={showClockOutModal}
      >
        Clock Out
      </button>
      {isModalVisible ? (
        <ClockOutModal
          employee={employee}
          employees={employees}
          setEmployees={setEmployees}
          setIsModalVisible={setIsModalVisible}
          lastAction={lastAction}
        />
      ) : (
        ""
      )}
    </>
  );
}

export default ClockOutBtn;
