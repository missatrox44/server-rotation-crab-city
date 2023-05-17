import { useState, useEffect, useRef } from "react";
import "./App.css";

import Footer from "./components/Footer";
import HeaderForm from "./components/HeaderForm";
import NextServer from "./components/NextServer";
import EmployeeTable from "./components/EmployeeTable";

// import ReadyBtn from "./components/Btns/ReadyBtn";
// import BreakOverBtn from "./components/Btns/BreakOverBtn";

function App() {
  const [employeeName, setEmployeeName] = useState("");
  const [isTrainee, setIsTrainee] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [bigTopEmployees, setBigTopEmployees] = useState([]);
  const [breakEmployees, setBreakEmployees] = useState([]);
  const [nextServerIndex, setNextServerIndex] = useState(0);

  const actionList = useRef([]);

  const handleNameChange = (event) => {
    setEmployeeName(event.target.value);
  };

  const handleTraineeChange = (event) => {
    setIsTrainee(event.target.checked);
  };

  const handleAddEmployee = () => {
    const newEmployee = {
      id: Date.now(),
      employeeName: employeeName,
      smallTopTotal: 0,
      bigTopTotal: 0,
      break: false,
      clockOut: false,
      trainee: isTrainee,
    };

    const newEmployees = [...employees, newEmployee];

    setEmployees(newEmployees);
    setEmployeeName("");
    setIsTrainee(false);
  };

  const handleAssignSmall = (employeeId) => {
    const employeeIndex = employees.findIndex((e) => e.id === employeeId);
    const lastAction = {
      action: "small top", 
      employee: employees[employeeIndex],
      currentEmployeeList: employees,
      time: Date.now(),
    }
    actionList.current.push(lastAction);
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

  const handleSkip = () => {
    // console.log("Skip button clicked");
    if (employees.length > 1) {
      const skippedEmployee = employees[nextServerIndex];
      const updatedEmployees = [
        ...employees.slice(0, nextServerIndex),
        ...employees.slice(nextServerIndex + 1),
        skippedEmployee,
      ];
      setEmployees(updatedEmployees);
    }
  };

  const handleUndo = () => {
    let actions = actionList.current;
    const lastAction = actions.pop();
    if (!lastAction) {
      console.log(actions);
      return;
    }
    if (lastAction.action === "big top") {
      handleUndoBigTop(lastAction);
    }
    if (lastAction.action === "small top") {
      handleUndoSmallTop(lastAction);
    }
  }

  const handleUndoSmallTop = ({action, employee, currentEmployeeList, time}) => {
    const removedEmployeeList = employees.slice(0, -1);
    // console.log(removedEmployeeList);
    currentEmployeeList.map((currentEmployee, index) => {
      if (currentEmployee.id === employee.id) {
       const updatedEmployeeList = [
         ...removedEmployeeList.slice(0, index),
         employee,
         ...removedEmployeeList.slice(index, currentEmployeeList.length)
       ];
       setEmployees(updatedEmployeeList);
      }
    })
  }

  const handleUndoBigTop = (action) => {
    console.log(action);
  }


  useEffect(() => {
    // console.log("employees arr: ", employees);
  }, [employees]);


  return (
    <div className="App">
      <header>
        <h1 className="text-blue-600 text-6xl">Crab City Server Rotation</h1>
        <p className="text-xs mb-6">v.1.3.0</p>

        <HeaderForm
          employeeName={employeeName}
          handleNameChange={handleNameChange}
          isTrainee={isTrainee}
          handleTraineeChange={handleTraineeChange}
          handleAddEmployee={handleAddEmployee}
        />
      </header>

      {
        (employees.length > 0 || bigTopEmployees.length > 0 || breakEmployees.length > 0) && 
      
        <div>
          <hr className="my-8" />

            <NextServer employees={employees} nextServerIndex={nextServerIndex} />

          <hr className="my-8" />

          <main className="overflow-x-auto">
            <EmployeeTable
              employees={employees}
              setEmployees={setEmployees}
              bigTopEmployees={bigTopEmployees}
              setBigTopEmployees={setBigTopEmployees}
              breakEmployees={breakEmployees}
              setBreakEmployees={setBreakEmployees}
              handleAssignSmall={handleAssignSmall}
              handleSkip={handleSkip}
              actionList={actionList}
            />
          </main>

          <hr className="my-8" />

        </div>
      }

      <Footer handleUndo={handleUndo} actionList={actionList}/>

    </div>
  );
}

export default App;
