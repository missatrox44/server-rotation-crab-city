import React from "react";
import BreakOverBtn from "./Btns/BreakOverBtn";

function BreakEmployeeRow({
  employee,
  setEmployees,
  lastAction,
  breakEmployees,
}) {
  const handleBreakOver = (employee) => {
    lastAction.current = {
      action: "break over",
      employee: employee,
      currentEmployeeList: employees,
      currentBigTopEmployeeList: bigTopEmployees,
      currentBreakEmployeeList: breakEmployees,
    };
    const breakOverEmployee = [employee, ...employees];
    setEmployees(breakOverEmployee);
    const removedBreakEmployee = [...breakEmployees].filter(
      (currentEmployee) => {
        if (currentEmployee.id !== employee.id) {
          return currentEmployee;
        }
      }
    );
    setBreakEmployees(removedBreakEmployee);
  };

  return (
    <tr key={employee.id}>
      <td
        className={`text-left py-2 pr-2 ${
          employee.trainee ? "text-cyan-600" : ""
        }`}
      >
        {employee.employeeName}
      </td>
      <td className="p-2 hidden-on-mobile">{employee.smallTopTotal}</td>
      <td></td>
      <td className="p-2 hidden-on-mobile">
        {!employee.trainee && employee.bigTopTotal}
      </td>
      <td></td>
      <td></td>
      <td className="p-2">
        <BreakOverBtn onClick={() => handleBreakOver(employee)} />
      </td>
      <td></td>
    </tr>
  );
}

export default BreakEmployeeRow;
