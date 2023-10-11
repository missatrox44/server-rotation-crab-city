import React from "react";
import BreakOverBtn from "./Btns/BreakOverBtn";
import { getDatabase, ref, update } from "firebase/database";

function BreakEmployeeRow({
  employee,
  employees,
  setEmployees,
  breakEmployees,
  setBreakEmployees,
}) {
  // Function to handle 'Break Over' button click
  const handleBreakOver = async (employee) => {
    // Adds the off-break employee back to active employees list
    setEmployees({ employeeData: [...employees.employeeData, employee] });

    // Creates new onBreak array without the selected employee
    const updatedBreakEmployees = [...breakEmployees].filter(
      (currentEmployee) => {
        if (currentEmployee.key !== employee.key) {
          return currentEmployee;
        }
      }
    );

    // Find employee by ID
    const db = getDatabase();
    const employeeRef = ref(db, "employees/" + employee.key);

    try {
      // Update break status for the employee
      await update(employeeRef, {
        break: false,
      });

      // Updates state for employees on break
      setBreakEmployees([...updatedBreakEmployees]);
    } catch (error) {
      console.error(error);
    }
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
