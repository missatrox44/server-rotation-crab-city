import React, { useState } from "react";
import AssignBtn from "./Btns/AssignBtn";
import SkipBtn from "./Btns/SkipBtn";
import BreakBtn from "./Btns/BreakBtn";
import ClockOutBtn from "./Btns/ClockOutBtn";
import BreakOverBtn from "./Btns/BreakOverBtn";
import ReadyBtn from "./Btns/ReadyBtn";
import EmployeeRow from "./EmployeeRow";

import { getDatabase, ref, update, get } from "firebase/database";

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
  // const [isBreakModalVisible, setIsBreakModalVisible] = useState(false);
  // const [employeeOnBreak, setEmployeeOnBreak] = useState(null);

  // const handleAssignSmall = async (employeeId) => {
  //   const db = getDatabase();
  //   const employeeRef = ref(db, "employees/" + employeeId);

  //   try {
  //     // Fetch current data for the employee.
  //     const snapshot = await get(employeeRef);
  //     const data = snapshot.val();
  //     const currentSmallTopTotal = data.smallTopTotal;

  //     // Update smallTopTotal for the employee.
  //     await update(employeeRef, {
  //       smallTopTotal: currentSmallTopTotal + 1,
  //     });

  //     // Move the assigned employee to the end of the table
  //     const updatedEmployee = {
  //       ...employees.employeeData.find((e) => e.key === employeeId).value,
  //       smallTopTotal: currentSmallTopTotal + 1,
  //     };

  //     const updatedEmployeeData = employees.employeeData.filter(
  //       (e) => e.key !== employeeId
  //     );
  //     updatedEmployeeData.push({ key: employeeId, value: updatedEmployee });

  //     setEmployees({ employeeData: updatedEmployeeData });
  //   } catch (error) {
  //     console.log(error);
  //     // Handle error, if any.
  //   }
  // };

  const handleAssignBig = (employee) => {
    const employeesCopy = [...employees];
    const notBigTopEmployees = [];
    employeesCopy.map((currentEmployee) => {
      if (currentEmployee.id !== employee.id) {
        notBigTopEmployees.push(currentEmployee);
      } else {
        lastAction.current = {
          action: "big top",
          employee: employee,
          currentEmployeeList: employees,
          currentBigTopEmployeeList: bigTopEmployees,
          currentBreakEmployeeList: breakEmployees,
        };
        currentEmployee.bigTopTotal++;
        const newBigTopEmployees = [...bigTopEmployees, currentEmployee];
        setBigTopEmployees(newBigTopEmployees);
      }
      setEmployees(notBigTopEmployees);
    });
  };

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

  // const handleSkip = () => {
  //   // console.log("Skip button clicked");
  //   if (employees.length > 1) {
  //     const skippedEmployee = employees[nextServerIndex];
  //     const updatedEmployees = [
  //       ...employees.slice(0, nextServerIndex),
  //       ...employees.slice(nextServerIndex + 1),
  //       skippedEmployee,
  //     ];
  //     lastAction.current = {
  //       action: "skip",
  //       employee: skippedEmployee,
  //       currentEmployeeList: employees,
  //       currentBigTopEmployeeList: bigTopEmployees,
  //       currentBreakEmployeeList: breakEmployees,
  //     };
  //     setEmployees(updatedEmployees);
  //   }
  // };

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
        ))}
        {breakEmployees.map((employee, index) => (
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
        ))}
      </tbody>
    </table>
  );
}

export default EmployeeTable;
