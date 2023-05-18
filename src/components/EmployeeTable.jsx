import React from "react";
import AssignBtn from "./Btns/AssignBtn";
import SkipBtn from "./Btns/SkipBtn";
import BreakBtn from "./Btns/BreakBtn";
import ClockOutBtn from "./Btns/ClockOutBtn";
import BreakOverBtn from "./Btns/BreakOverBtn";
import ReadyBtn from "./Btns/ReadyBtn";

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

  const handleAssignSmall = (employeeId) => {
    const employeeIndex = employees.findIndex((e) => e.id === employeeId);
    lastAction.current = {
      action: "small top", 
      employee: employees[employeeIndex],
      currentEmployeeList: employees,
      currentBigTopEmployeeList: bigTopEmployees,
      currentBreakEmployeeList: breakEmployees
    }
    if (employeeIndex !== -1) {
      const updatedEmployee = {
        ...employees[employeeIndex],
        smallTopTotal: employees[employeeIndex].smallTopTotal + 1,
      };

      const updatedEmployees = [
        ...employees.slice(0, employeeIndex),
        ...employees.slice(employeeIndex + 1),
        updatedEmployee,
      ];

      // console.log("Small top assigned to:", updatedEmployee.employeeName);

      setEmployees(updatedEmployees);
    }
  };

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
          currentBreakEmployeeList: breakEmployees
        };
        currentEmployee.bigTopTotal++;
        const newBigTopEmployees = [...bigTopEmployees, currentEmployee]
        setBigTopEmployees(newBigTopEmployees)
      }
      setEmployees(notBigTopEmployees);
    })
  };

  const handleReady = (employee) => {
    const addedReadyEmployee = [employee, ...employees];
    setEmployees(addedReadyEmployee);
    const removedReadyEmployee = [...bigTopEmployees].filter((currentEmployee) => {
      if (currentEmployee.id !== employee.id) {
        return currentEmployee;
      }
    })
    lastAction.current = {
      action: "ready", 
      employee: employee,
      currentEmployeeList: employees,
      currentBigTopEmployeeList: bigTopEmployees,
      currentBreakEmployeeList: breakEmployees
    };
    setBigTopEmployees(removedReadyEmployee);
  }


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
        currentBreakEmployeeList: breakEmployees
      }
      setEmployees(updatedEmployees);
    }
  };

  const handleBreak = (employee) => {
    lastAction.current = {
      action: "break", 
      employee: employee,
      currentEmployeeList: employees,
      currentBigTopEmployeeList: bigTopEmployees,
      currentBreakEmployeeList: breakEmployees,
    }
    const employeesCopy = [...employees];
    const workingEmployees = [];
    employeesCopy.map((currentEmployee) => {
      if (currentEmployee.id !== employee.id) {
        workingEmployees.push(currentEmployee);
      } else {
        const newBreakingEmployees = [...breakEmployees, currentEmployee]
        setBreakEmployees(newBreakingEmployees)
      }
      setEmployees(workingEmployees);
    })
  };

  const handleBreakOver = (employee) => {
    lastAction.current = {
      action: "break over", 
      employee: employee,
      currentEmployeeList: employees,
      currentBigTopEmployeeList: bigTopEmployees,
      currentBreakEmployeeList: breakEmployees,
    }
    const breakOverEmployee = [employee, ...employees];
    setEmployees(breakOverEmployee);
    const removedBreakEmployee = [...breakEmployees].filter((currentEmployee) => {
      if (currentEmployee.id !== employee.id) {
        return currentEmployee;
      }
    })
    setBreakEmployees(removedBreakEmployee);
  }

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
    
        {employees
          .map((employee, index) => (
            <tr key={employee.id}>
              <td className="text-left py-2 pr-2">{employee.employeeName}</td>
              <td className="p-2 hidden-on-mobile">{employee.smallTopTotal}</td>
              <td className="p-2">
                <AssignBtn onClick={() => handleAssignSmall(employee.id)} />
              </td>
              <td className="p-2 hidden-on-mobile">{!employee.trainee && employee.bigTopTotal}</td>
              <td className="p-2">
                {!employee.trainee && (
                  <AssignBtn onClick={() => handleAssignBig(employee)} bigTop={true} />
                )}
              </td>
              <td className="p-2">
                {index === 0 && (
                  <SkipBtn onClick={() => handleSkip(employee.id)} />
                )}
              </td>
              <td className="p-2">
                <BreakBtn onClick={() => handleBreak(employee)} />
              </td>
              <td className="p-2 hidden-on-mobile">
                <ClockOutBtn
                  employee={employee}
                  employees={employees}
                  setEmployees={setEmployees}
                  lastAction={lastAction}
                />
              </td>
            </tr>
        ))}
        {bigTopEmployees
          .map((employee, index) => (
            <tr key={employee.id}>
              <td className="text-left py-2 pr-2">{employee.employeeName}</td>
              <td className="p-2 hidden-on-mobile">{employee.smallTopTotal}</td>
              <td className="p-2"></td>
              <td className="p-2 hidden-on-mobile">{!employee.trainee && employee.bigTopTotal}</td>
              <td className="p-2">
                <ReadyBtn onClick={() => handleReady(employee)}/>
              </td>
              <td className="p-2"></td>
              <td className="p-2"></td>
              <td className="p-2 hidden-on-mobile"></td>
            </tr>
          ))
        }
        {breakEmployees
          .map((employee, index) => (
            <tr key={employee.id}>
              <td className="text-left py-2 pr-2">{employee.employeeName}</td>
              <td className="p-2 hidden-on-mobile">{employee.smallTopTotal}</td>
              <td></td>
              <td className="p-2 hidden-on-mobile">{!employee.trainee && employee.bigTopTotal}</td>
              <td></td>
              <td></td>
              <td className="p-2">
                <BreakOverBtn onClick={() => handleBreakOver(employee)} />
              </td>
              <td></td>
            </tr>
          ))
        }

      </tbody>
    </table>
  );
}

export default EmployeeTable;
