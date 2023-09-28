import React from "react";
import AssignBtn from "./Btns/AssignBtn";
import SkipBtn from "./Btns/SkipBtn";
import BreakBtn from "./Btns/BreakBtn";
import ClockOutBtn from "./Btns/ClockOutBtn";
import ReadyBtn from "./Btns/ReadyBtn";
import { getDatabase, ref, update, get } from "firebase/database";
import { useState } from "react";

function EmployeeRow({
  employee,
  index,
  setEmployees,
  lastAction,
  breakEmployees,
  setBreakEmployees,
  employees,
  bigTopEmployees,
}) {
  // State controls
  const [disabled, setDisabled] = useState(false);

  // Retrieves user, updates DB & browser for small tops
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

      // Filters out the selected employee
      const updatedEmployeeData = employees.employeeData.filter(
        (e) => e.key !== employeeId
      );

      // Adds the employee to the end of the list
      updatedEmployeeData.push({ key: employeeId, value: updatedEmployee });

      // Sets the state of the employee; updates the browser
      setEmployees({ employeeData: updatedEmployeeData });
    } catch (error) {
      console.log(error);
      // Handle error, if any.
    }
  };

  // CURRENTLY NOT FUllY FUNCTIONAL
  // Retrieves user, updates DB & browser for big tops, disables user
  // TO DO: update user to `disabled` in DB
  const handleAssignBig = async (employeeId) => {
    // Find employee by ID
    const db = getDatabase();
    const employeeRef = ref(db, "employees/" + employeeId);

    try {
      // Fetch current data for the employee.
      const snapshot = await get(employeeRef);
      const data = snapshot.val();
      const currentBigTopTotal = data.bigTopTotal;

      // Update bigTopTotal for the employee.
      await update(employeeRef, {
        bigTopTotal: currentBigTopTotal + 1,
      });

      // Move the assigned employee to the end of the table
      const updatedEmployee = {
        ...employees.employeeData.find((e) => e.key === employeeId).value,
        bigTopTotal: currentBigTopTotal + 1,
      };

      // Filters out the selected employee and creates a new array without selected employee
      const updatedEmployeeData = employees.employeeData.filter(
        (e) => e.key !== employeeId
      );

      // Adds the updated employee to the end of the list
      updatedEmployeeData.push({ key: employeeId, value: updatedEmployee });

      // Sets the state of the employee; updates the browser
      setEmployees({ employeeData: updatedEmployeeData });

      // Disable User Buttons
      setDisabled(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleReturn = async () => {
    setDisabled(false);
  };

  const handleSkip = async (employeeId) => {
    if (employees.employeeData.length > 1) {
      const db = getDatabase();

      // Create a copy of the array
      const updatedEmployees = [...employees.employeeData];
      // Find the index of the employee to be skipped
      const employeeIndex = updatedEmployees.findIndex(
        (e) => e.key === employeeId
      );
      // Extract the employee from the array
      const skippedEmployee = updatedEmployees.splice(employeeIndex, 1)[0];
      // Push the employee at the end of the array
      updatedEmployees.push(skippedEmployee);

      // update the order in Firebase for each employee
      for (let i = 0; i < updatedEmployees.length; i++) {
        const employeeRef = ref(db, "employees/" + updatedEmployees[i].key);
        await update(employeeRef, {
          order: i, // Set the order field for the current employee
        });
      }

      lastAction.current = {
        action: "skip",
        employee: skippedEmployee,
        currentEmployeeList: employees,
        currentBigTopEmployeeList: bigTopEmployees,
        currentBreakEmployeeList: breakEmployees,
      };

      setEmployees({ employeeData: updatedEmployees });
    }
  };

  return (
    <tr key={employee.key}>
      <td
        className={`text-left py-2 pr-2 ${
          employee.value.trainee ? "text-cyan-600" : ""
        }`}
      >
        {disabled ? (
          <ReadyBtn
            onClick={handleReturn}
          />
        ) : (
          ""
        )}
        {employee.value.employeeName}
      </td>
      <td className="p-2 hidden-on-mobile">{employee.value.smallTopTotal}</td>
      <td className="p-2">
        <AssignBtn
          disabled={disabled}
          onClick={() => {
            handleAssignSmall(employee.key);
          }}
        />
      </td>
      <td className="p-2 hidden-on-mobile">
        {!employee.value.trainee && employee.value.bigTopTotal}
      </td>
      <td className="p-2">
        {!employee.value.trainee && (
          <AssignBtn
            onClick={() => handleAssignBig(employee.key)}
            bigTop={true}
            disabled={disabled}
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
