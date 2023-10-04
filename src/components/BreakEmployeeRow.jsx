import React from "react";
import BreakOverBtn from "./Btns/BreakOverBtn";

function BreakEmployeeRow({
  employee,
  employees,
  setEmployees,
  // lastAction,
  breakEmployees,
}) {
  const handleBreakOver = (employee) => {
    console.log("employee", employee);
    // lastAction.current = {
    //   action: "break over",
    //   employee: employee,
    //   currentEmployeeList: employees,
    //   currentBigTopEmployeeList: bigTopEmployees,
    //   currentBreakEmployeeList: breakEmployees,
    // };

    // const breakOverEmployee = [employee, ...employees.employeeData];
    // console.log("breakOverEmployee", breakOverEmployee);
    
    setEmployees( {employeeData: [...employees, employee]});
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
    <tr key={employee.key}>
      <td
        className={`text-left py-2 pr-2 ${
          employee.value.trainee ? "text-cyan-600" : ""
        }`}
      >
        {employee.value.employeeName}
      </td>
      <td className="p-2 hidden-on-mobile">{employee.value.smallTopTotal}</td>
      <td></td>
      <td className="p-2 hidden-on-mobile">
        {!employee.value.trainee && employee.value.bigTopTotal}
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
