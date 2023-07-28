import React from "react";
import ReadyBtn from "./Btns/ReadyBtn";

function BigTopEmployeeRow({
  employee,
  setEmployees,
  lastAction,
  bigTopEmployees,
}) {
  const handleReady = (employee) => {
    const addedReadyEmployee = [employee, ...employees];
    setEmployees(addedReadyEmployee);
    const removedReadyEmployee = [...bigTopEmployees].filter(
      (currentEmployee) => {
        if (currentEmployee.id !== employee.id) {
          return currentEmployee;
        }
      }
    );
    lastAction.current = {
      action: "ready",
      employee: employee,
      currentEmployeeList: employees,
      currentBigTopEmployeeList: bigTopEmployees,
      currentBreakEmployeeList: breakEmployees,
    };
    setBigTopEmployees(removedReadyEmployee);
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
      <td className="p-2"></td>
      <td className="p-2 hidden-on-mobile">
        {!employee.trainee && employee.bigTopTotal}
      </td>
      <td className="p-2">
        <ReadyBtn onClick={() => handleReady(employee)} />
      </td>
      <td className="p-2"></td>
      <td className="p-2"></td>
      <td className="p-2 hidden-on-mobile"></td>
    </tr>
  );
}

export default BigTopEmployeeRow;
