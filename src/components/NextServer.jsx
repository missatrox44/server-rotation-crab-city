import React from "react";

function NextServer({ employees }) {
  
  // Returns first employee who is not disabled
  const findNextAvaliable = (employee) => {
    return employee.value.disabled === false
  }

  // Finds next availabe server
  let nextAvaliable = employees.employeeData.find(findNextAvaliable)

  return (
    <div className="my-3">
      <h2 className="text-3xl">
        Next Server: {" "}
        <span className="font-bold">{nextAvaliable.value.employeeName}</span>
      </h2>
    </div>
  );
}

export default NextServer;
