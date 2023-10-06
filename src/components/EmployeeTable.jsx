import React, { useState } from "react";
import EmployeeRow from "./EmployeeRow";
import BreakEmployeeRow from "./BreakEmployeeRow";

function EmployeeTable({
  employees,
  setEmployees,
  bigTopEmployees,
  breakEmployees,
  setBreakEmployees,
  lastAction,
}) {
  return (
    <table className="mx-auto w-full">
      <thead className="py-10">
        <tr>
          <th className="text-left min-w-0 md:min-w-[100px]">Name</th>
          <th className="hidden-on-mobile">Small Tops</th>
          <th>Assign Small</th>
          <th className="hidden-on-mobile">Big Tops</th>
          <th>Assign Big</th>
          <th>Skip</th>
          <th>Break</th>
          <th className="hidden-on-mobile">Clock Out</th>
        </tr>
      </thead>
      <tbody>
        {employees.employeeData.map((employee, index) => (
          <EmployeeRow
            key={employee.key}
            employee={employee}
            index={index}
            setEmployees={setEmployees}
            lastAction={lastAction}
            breakEmployees={breakEmployees}
            setBreakEmployees={setBreakEmployees}
            employees={employees}
            bigTopEmployees={bigTopEmployees}
          />
        ))}
        
        {breakEmployees.map((employee, index) => (
          <BreakEmployeeRow
            key={employee.key}
            employee={employee}
            employees={employees}
            setEmployees={setEmployees}
            lastAction={lastAction}
            breakEmployees={breakEmployees}
            setBreakEmployees={setBreakEmployees}
          />
        ))}
      </tbody>
    </table>
  );
}

export default EmployeeTable;
