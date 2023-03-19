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

  useEffect(() => {
    console.log("employees arr: ", employees);
  }, [employees]);

  const handleNameChange = (event) => {
    setEmployeeName(event.target.value);
  };

  const handleTraineeChange = (event) => {
    setIsTrainee(event.target.checked);
  };

  const handleAddEmployee = () => {
    const newEmployee = {
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

  const handleSkipSmall = () => {
    console.log("Small Skip button clicked");
  };

  const handleSkipBig = () => {
    console.log("Big Skip button clicked");
  };

  const handleBreak = () => {
    console.log("Break button clicked");
  };

  const handleClockOut = () => {
    console.log("Clock Out button clicked");
  };

  return (
    <div className="App">
      <header>
        <h1 className="text-blue-600 text-6xl">Crab City Server Rotation</h1>
        <p className="text-xs mb-6">v.1.2.0</p>

        <label for="name">Employee Name: </label>
        <input
          type="text"
          name="name"
          required
          value={employeeName}
          onChange={handleNameChange}
          className="p-2 mx-2 rounded-lg"
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
      </header>

      {/* up next */}
      <div className="my-3">
        <h2 className="text-3xl">Next Server: Finn </h2>
      </div>
      <hr className="my-8" />

      {/* small tops */}
      <div>
        <h3 className="text-2xl mb-3">Small Tops</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Total Tables</th>
              <th>Assign</th>
              <th>Skip</th>
              <th>Break</th>
              <th>Clock Out</th>
            </tr>
          </thead>
          <tbody>
            {employees
              .filter((employee) => employee.trainee || !employee.trainee)
              .map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.employeeName}</td>
                  <td>{employee.smallTopTotal}</td>
                  <td>
                    <AssignBtn onClick={() => handleAssignSmall(employee.id)} />
                  </td>
                  <td>
                    <SkipBtn onClick={() => handleSkipSmall(employee.id)} />
                  </td>
                  <td>
                    <BreakBtn onClick={() => handleBreak(employee.id)} />
                  </td>
                  <td>
                    <ClockOutBtn onClick={() => handleClockOut(employee.id)} />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <hr className="my-8" />
      {/* big tops */}
      <div>
        <h3 className="text-2xl mb-3">Big Tops</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Total Tables</th>
              <th>Assign</th>
              <th>Skip</th>
            </tr>
          </thead>
          <tbody>
            {employees
              .filter((employee) => !employee.trainee)
              .map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.employeeName}</td>
                  <td>{employee.bigTopTotal}</td>
                  <td>
                    <AssignBtn onClick={() => handleAssignBig(employee.id)} />
                  </td>
                  <td>
                    <SkipBtn onClick={() => handleSkipBig(employee.id)} />
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
