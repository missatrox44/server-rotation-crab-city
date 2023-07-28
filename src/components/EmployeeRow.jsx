import React from "react";
import AssignBtn from "./Btns/AssignBtn";
import SkipBtn from "./Btns/SkipBtn";
import BreakBtn from "./Btns/BreakBtn";
import ClockOutBtn from "./Btns/ClockOutBtn";
import { getDatabase, ref, update, get } from "firebase/database";

function EmployeeRow({
  employee,
  index,
  setEmployees,
  lastAction,
  breakEmployees,
  setBreakEmployees,
  employees,
  bigTopEmployees
}) {
  const handleAssignSmall = async (employeeId) => {
    const db = getDatabase();
    const employeeRef = ref(db, "employees/" + employeeId);

    try {
      // Fetch current data for the employee.
      const snapshot = await get(employeeRef);
      const data = snapshot.val();
      const currentSmallTopTotal = data.smallTopTotal;

      // Update smallTopTotal for the employee.
      await update(employeeRef, {
        smallTopTotal: currentSmallTopTotal + 1,
      });

      // Move the assigned employee to the end of the table
      const updatedEmployee = {
        ...employees.employeeData.find((e) => e.key === employeeId).value,
        smallTopTotal: currentSmallTopTotal + 1,
      };

      const updatedEmployeeData = employees.employeeData.filter(
        (e) => e.key !== employeeId
      );
      updatedEmployeeData.push({ key: employeeId, value: updatedEmployee });

      setEmployees({ employeeData: updatedEmployeeData });
    } catch (error) {
      console.log(error);
      // Handle error, if any.
    }
  };

  const handleSkip = () => {
    // console.log("Skip button clicked");
    if (employees.length > 1) {
      const skippedEmployee = employees[nextServerIndex];
      const updatedEmployees = [
        ...employees.slice(0, nextServerIndex),
        ...employees.slice(nextServerIndex + 1),
        skippedEmployee,
      ];
      lastAction.current = {
        action: "skip",
        employee: skippedEmployee,
        currentEmployeeList: employees,
        currentBigTopEmployeeList: bigTopEmployees,
        currentBreakEmployeeList: breakEmployees,
  
      };
      setEmployees(updatedEmployees);
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
      <td className="p-2">
        <AssignBtn onClick={() => handleAssignSmall(employee.key)} />
      </td>
      <td className="p-2 hidden-on-mobile">
        {!employee.value.trainee && employee.value.bigTopTotal}
      </td>
      <td className="p-2">
        {!employee.value.trainee && (
          <AssignBtn
            onClick={() => handleAssignBig(employee.key)}
            bigTop={true}
          />
        )}
      </td>
      <td className="p-2">
        {index === 0 && <SkipBtn onClick={() => handleSkip(employee.key)} />}
      </td>
      <td className="p-2">
        <BreakBtn
          employee={employee}
          employees={employees}
          setEmployees={setEmployees}
          lastAction={lastAction}
          breakEmployees={breakEmployees}
          setBreakEmployees={setBreakEmployees}
        />
      </td>
      <td className="p-2">
        <ClockOutBtn
          employee={employee}
          employees={employees}
          setEmployees={setEmployees}
          bigTopEmployees={bigTopEmployees}
          breakEmployees={breakEmployees}
          lastAction={lastAction}
        />
      </td>
    </tr>
  );
}

export default EmployeeRow;
