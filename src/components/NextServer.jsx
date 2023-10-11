import React from "react";
import { useState } from "react";

function NextServer({ employees }) {
  const findNextAvaliable = (employee) => {
    return employee.value.disabled === false
  }

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
