import React from "react";
import BreakModal from "../BreakModal";
import { useState } from "react";

function BreakBtn({
  employee,
  employees,
  setEmployees,
  // lastAction,
  breakEmployees,
  setBreakEmployees,
}) {
  const [isBreakModalVisible, setIsBreakModalVisible] = useState(false);

  const showBreakModal = () => {
    setIsBreakModalVisible(true);
  };

  return (
    <>
      <button
        className="text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-4 focus:ring-amber-800 font-medium rounded-full text-sm px-5 py-3 text-center dark:focus:ring-amber-900"
        onClick={showBreakModal}
      >
        Break
      </button>
      {isBreakModalVisible ? (
        <BreakModal
          employee={employee}
          employees={employees}
          setEmployees={setEmployees}
          setIsBreakModalVisible={setIsBreakModalVisible}
          // lastAction={lastAction}
          breakEmployees={breakEmployees}
          setBreakEmployees={setBreakEmployees}
        />
      ) : null}
    </>
  );
}

export default BreakBtn;
