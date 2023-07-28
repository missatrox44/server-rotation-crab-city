import React, { useState } from "react";
// import AssignBtn from "./Btns/AssignBtn";
// import SkipBtn from "./Btns/SkipBtn";
// import BreakBtn from "./Btns/BreakBtn";
// import ClockOutBtn from "./Btns/ClockOutBtn";
// import BreakOverBtn from "./Btns/BreakOverBtn";
// import ReadyBtn from "./Btns/ReadyBtn";
import EmployeeRow from "./EmployeeRow";
import BreakEmployeeRow from "./BreakEmployeeRow";
import BigTopEmployeeRow from "./BigTopEmployeeRow";

// import { getDatabase, ref, update, get } from "firebase/database";

function EmployeeTable({
  employees,
  setEmployees,
  bigTopEmployees,
  setBigTopEmployees,
  breakEmployees,
  setBreakEmployees,
  nextServerIndex,
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
        {bigTopEmployees.map((employee, index) => (
          <BigTopEmployeeRow
            employee={employee}
            setEmployees={setEmployees}
            lastAction={lastAction}
            bigTopEmployees={bigTopEmployees}
          />
        ))}
        {breakEmployees.map((employee, index) => (
          <BreakEmployeeRow
            employee={employee}
            setEmployees={setEmployees}
            lastAction={lastAction}
            breakEmployees={breakEmployees}
          />
        ))}
      </tbody>
    </table>
  );
}

export default EmployeeTable;
