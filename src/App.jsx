import { useState, useEffect } from "react";
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
  const [nextServerIndex, setNextServerIndex] = useState(0);

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

  const handleAssignSmall = () => {
    console.log("small assign button clicked");
  };

  const handleAssignBig = () => {
    console.log("Big assign button clicked");
  };

  const handleSkip = () => {
    console.log("Skip button clicked");
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

  const handleBreak = () => {
    console.log("Break button clicked");
  };

  useEffect(() => {
    console.log("employees arr: ", employees);
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

      <NextServer employees={employees} nextServerIndex={nextServerIndex} />

      <hr className="my-8" />

      <EmployeeTable
        employees={employees}
        handleAssignSmall={handleAssignSmall}
        handleAssignBig={handleAssignBig}
        handleSkip={handleSkip}
        handleBreak={handleBreak}
        setEmployees={setEmployees}
      />

      <hr className="my-8" />

      <Footer />
    </div>
  );
}

export default App;
