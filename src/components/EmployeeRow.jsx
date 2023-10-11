import React from 'react';
import AssignBtn from './Btns/AssignBtn';
import SkipBtn from './Btns/SkipBtn';
import BreakBtn from './Btns/BreakBtn';
import ClockOutBtn from './Btns/ClockOutBtn';
import ReadyBtn from './Btns/ReadyBtn';
import { getDatabase, ref, update, get } from 'firebase/database';
import { useState } from 'react';

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
  const [disabled, setDisabled] = useState(employee.value.disabled);


  const updateEmployeeOrderInFirebase = async (updatedEmployees) => {
    const db = getDatabase();
  
    for (let i = 0; i < updatedEmployees.length; i++) {
      const employeeRef = ref(db, 'employees/' + updatedEmployees[i].key);
      await update(employeeRef, {
        order: i,
      });
    }
  };
  

  // Retrieves user, updates DB & browser for small tops
  const handleAssignSmall = async (employeeId) => {
    const db = getDatabase();
    const employeeRef = ref(db, 'employees/' + employeeId);
  
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
  
      // Call the function to update order in Firebase
      await updateEmployeeOrderInFirebase(updatedEmployeeData);
    } catch (error) {
      console.log(error);
      // Handle error, if any.
    }
  };
  

  // Retrieves user, updates DB & browser for big tops, disables user
  // BUG ISSUE - quick flash of first added employee's name as 'Next Server' screen before displaying correctly. I think something is off with how the employees are being set.
  // ADDED NEW FUNCTION updateEmployeeOrderInFirebase in order to set their order and the changes persist after page refresh
  const handleAssignBig = async (employeeId) => {
    const db = getDatabase();
    const employeeRef = ref(db, 'employees/' + employeeId);
  
    try {
      // Fetch current data for the employee.
      const snapshot = await get(employeeRef);
      const data = snapshot.val();
      const currentBigTopTotal = data.bigTopTotal;
  
      // Update bigTopTotal for the employee.
      await update(employeeRef, {
        bigTopTotal: currentBigTopTotal + 1,
        disabled: true,
      });
  
      employee.value.disabled = true;
  
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
  
      // Call the function to update order in Firebase
      await updateEmployeeOrderInFirebase(updatedEmployeeData);
    } catch (error) {
      console.log(error);
    }
  };
  
  // Returns server into rotation when ready for more tables
  // BUG ISSUE - employee order does not persist, seems to return user to previous position.
  // To Do: Keep user in same position in the rotation
  const handleReturn = async (employeeId) => {
    // Find employee by ID
    const db = getDatabase();
    const employeeRef = ref(db, 'employees/' + employeeId);

    try {
      // Update bigTopTotal for the employee.
      await update(employeeRef, {
        disabled: false,
      });

      setDisabled(false);
    } catch (error) {
      console.log(error);
    }
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
  
      lastAction.current = {
        action: 'skip',
        employee: skippedEmployee,
        currentEmployeeList: employees,
      };
  
      setEmployees({ employeeData: updatedEmployees });
      
      // Call the function to update order in Firebase
      await updateEmployeeOrderInFirebase(updatedEmployees);
    }
  };

  return (
    <tr key={employee.key}>
      <td
        className={`text-left py-2 pr-2 ${
          employee.value.trainee ? 'text-cyan-600' : ''
        }`}
      >
        {employee.value.disabled ? (
          <ReadyBtn onClick={() => handleReturn(employee.key)} />
        ) : (
          ''
        )}
        {employee.value.employeeName}
      </td>

      <td className="p-2 hidden-on-mobile">{employee.value.smallTopTotal}</td>
      {employee.value.disabled ? (
        <td className="p-2">
          <AssignBtn
            disabled={true}
            onClick={() => {
              handleAssignSmall(employee.key);
            }}
          />
        </td>
      ) : (
        <td className="p-2">
          <AssignBtn
            disabled={false}
            onClick={() => {
              handleAssignSmall(employee.key);
            }}
          />
        </td>
      )}

      <td className="p-2 hidden-on-mobile">
        {!employee.value.trainee && employee.value.bigTopTotal}
      </td>
      <td className="p-2">
        {!employee.value.trainee ? (
          <AssignBtn
            onClick={() => handleAssignBig(employee.key)}
            bigTop={true}
            disabled={employee.value.disabled}
          />
        ) : (
        " "
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
