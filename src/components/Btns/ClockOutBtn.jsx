import React from "react";

function ClockOutBtn({employee, employees, setEmployees}) {

  const handleClockOut = () => {
    const employeesCopy = [...employees];
    const clockedInEmployees = employeesCopy.filter((clockedInEmployee) => {
      if (clockedInEmployee.id !== employee.id) {
        return clockedInEmployee;
      }
    })
    setEmployees(clockedInEmployees);
  };


  return (
    <button 
      className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
      onClick={handleClockOut}>
      Clock Out
    </button>
  );
}

export default ClockOutBtn;
