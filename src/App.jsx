import { useState, useEffect } from "react";
import "./App.css";

import AssignBtn from "./components/Btns/AssignBtn";
import SkipBtn from "./components/Btns/SkipBtn";
import BreakBtn from "./components/Btns/BreakBtn";
// import ReadyBtn from "./components/Btns/ReadyBtn";
// import BreakOverBtn from "./components/Btns/BreakOverBtn";
import ClockOutBtn from "./components/Btns/ClockOutBtn";
import Footer from "./components/Footer";
import AddBtn from "./components/Btns/AddBtn";
// import Header from "./components/Header";

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

  const createRandomId = () => {
    return Math.floor(Math.random() * max);
  }

  const handleAddEmployee = () => {
    const newEmployee = {
      //WE NEED A DIFFERENT ID SYSTEM HERE
      id: employees.length + 1,
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

        <form>
          <label htmlFor="name">Employee Name: </label>
            <input
              type="text"
              name="name"
              required
              value={employeeName}
              onChange={handleNameChange}
              className="p-2 mx-2 rounded-lg text-black"
            />

          <label className="mx-2">
            <input
              type="checkbox"
              checked={isTrainee}
              onChange={handleTraineeChange}
            />
            Training
          </label>

          <AddBtn onClick={handleAddEmployee} />
        </form>
        
      </header>

      {/* up next */}
      <div className="my-3">
        <h2 className="text-3xl">
          Next Server: {employees[nextServerIndex]?.employeeName || "N/A"}{" "}
        </h2>
      </div>
      <hr className="my-8" />

      {/* TABLE */}
      <div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Status</th>
              <th>Small Tops</th>
              <th>Assign Small</th>
              <th>Big Tops</th>
              <th>Assign Big</th>
              <th>Skip</th>
              <th>Break</th>
              <th>Clock Out</th>
            </tr>
          </thead>
          <tbody>
            {employees
              .filter((employee) => employee.trainee || !employee.trainee)
              .map((employee, index) => (
                <tr key={employee.id}>
                  <td>{employee.employeeName}</td>
                  <td>Status HERE</td>
                  <td>{employee.smallTopTotal}</td>
                  <td>
                    <AssignBtn onClick={() => handleAssignSmall(employee.id)} />
                  </td>
                  <td>{!employee.trainee && employee.bigTopTotal}</td>
                  <td>
                    {!employee.trainee && (
                      <AssignBtn onClick={() => handleAssignBig(employee.id)} />
                    )}
                  </td>
                  <td>
                    {index === 0 && (
                      <SkipBtn onClick={() => handleSkip(employee.id)} />
                    )}
                  </td>
                  <td>
                    <BreakBtn onClick={() => handleBreak(employee.id)} />
                  </td>
                  <td>
                    <ClockOutBtn employee={employee} employees={employees} setEmployees={setEmployees}/>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <hr className="my-8" />

      <Footer />
    </div>
  );
}

export default App;
