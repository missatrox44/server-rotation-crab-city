import React from "react";
import AssignBtn from "./Btns/AssignBtn";
import SkipBtn from "./Btns/SkipBtn";
import BreakBtn from "./Btns/BreakBtn";
import ClockOutBtn from "./Btns/ClockOutBtn";

function EmployeeTable({
  employees,
  handleAssignSmall,
  handleAssignBig,
  handleSkip,
  handleBreak,
  setEmployees,
}) {

  return (
    <table className="mx-auto">
      <thead className="py-10">
        <tr>
          <th className="pr-20 pb-5 text-left">Name</th>
          <th className="pr-20 pb-5 text-left">Status</th>
          <th className="px-9 pb-5">Small Tops</th>
          <th className="px-9 pb-5">Assign Small</th>
          <th className="px-9 pb-5">Big Tops</th>
          <th className="px-9 pb-5">Assign Big</th>
          <th className="px-9 pb-5">Skip</th>
          <th className="px-9 pb-5">Break</th>
          <th className="px-9 pb-5">Clock Out</th>
        </tr>
      </thead>
      <tbody>
        {employees
          .filter((employee) => employee.trainee || !employee.trainee)
          .map((employee, index) => (
            <tr key={employee.id}>
              <td className="px-1 text-left">{employee.employeeName}</td>
              <td className="px-1 text-left">Status HERE</td>
              <td className="px-1">{employee.smallTopTotal}</td>
              <td className="px-1">
                <AssignBtn onClick={() => handleAssignSmall(employee.id)} />
              </td>
              <td className="px-1">{!employee.trainee && employee.bigTopTotal}</td>
              <td className="px-1">
                {!employee.trainee && (
                  <AssignBtn onClick={() => handleAssignBig(employee.id)} />
                )}
              </td>
              <td className="px-1">
                {index === 0 && (
                  <SkipBtn onClick={() => handleSkip(employee.id)} />
                )}
              </td>
              <td className="px-1">
                <BreakBtn onClick={() => handleBreak(employee.id)} />
              </td>
              <td className="px-1">
                <ClockOutBtn
                  employee={employee}
                  employees={employees}
                  setEmployees={setEmployees}
                />
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}

export default EmployeeTable;
