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

  let lastAction = useRef({});

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


  const handleUndo = () => {

    if (!lastAction.current.action) {
      return;
    }

    const {action, employee, currentEmployeeList, currentBigTopEmployeeList, currentBreakEmployeeList} = lastAction.current;

    if (action === "big top") {
      employee.bigTopTotal = employee.bigTopTotal - 1;
    }
    setEmployees(currentEmployeeList);
    setBigTopEmployees(currentBigTopEmployeeList);
    setBreakEmployees(currentBreakEmployeeList);
    lastAction.current = {};
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
              lastAction={lastAction}
            />
          </main>

          <hr className="my-8" />

        </div>
      }

      <Footer handleUndo={handleUndo} />

    </div>
  );
}

export default App;
