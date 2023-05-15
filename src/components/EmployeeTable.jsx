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
    <table className="mx-auto w-full">
      <thead className="py-10">
        <tr>
          <th className="text-left min-w-0 md:min-w-[100px]">Name</th>
          <th className="text-left hidden-on-mobile">Status</th>
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
        {employees
          .filter((employee) => employee.trainee || !employee.trainee)
          .map((employee, index) => (
            <tr key={employee.id}>
              <td className="text-left py-2 pr-2">{employee.employeeName}</td>
              <td className="text-left py-2 pr-2 hidden-on-mobile">Status HERE</td>
              <td className="p-2 hidden-on-mobile">{employee.smallTopTotal}</td>
              <td className="p-2">
                <AssignBtn onClick={() => handleAssignSmall(employee.id)} />
              </td>
              <td className="p-2 hidden-on-mobile">{!employee.trainee && employee.bigTopTotal}</td>
              <td className="p-2">
                {!employee.trainee && (
                  <AssignBtn onClick={() => handleAssignBig(employee.id)} />
                )}
              </td>
              <td className="p-2">
                {index === 0 && (
                  <SkipBtn onClick={() => handleSkip(employee.id)} />
                )}
              </td>
              <td className="p-2">
                <BreakBtn onClick={() => handleBreak(employee.id)} />
              </td>
              <td className="p-2 hidden-on-mobile">
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
