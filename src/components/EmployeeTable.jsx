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
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Status</th>
          <th>Small Tops</th>
          <th>Assign Small</th>
          <th>Big Tops</th>
          <th>Assign Big</th>
          <th>Skip</th>
          <th>Break</th>
          <th>Clock Out</th>
        </tr>
      </thead>
      <tbody>
        {employees
          .filter((employee) => employee.trainee || !employee.trainee)
          .map((employee, index) => (
            <tr key={employee.id}>
              <td>{employee.employeeName}</td>
              <td>Status HERE</td>
              <td>{employee.smallTopTotal}</td>
              <td>
                <AssignBtn onClick={() => handleAssignSmall(employee.id)} />
              </td>
              <td>{!employee.trainee && employee.bigTopTotal}</td>
              <td>
                {!employee.trainee && (
                  <AssignBtn onClick={() => handleAssignBig(employee.id)} />
                )}
              </td>
              <td>
                {index === 0 && (
                  <SkipBtn onClick={() => handleSkip(employee.id)} />
                )}
              </td>
              <td>
                <BreakBtn onClick={() => handleBreak(employee.id)} />
              </td>
              <td>
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
