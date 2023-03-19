import { useState } from "react";
import "./App.css";

import AssignBtn from "./components/Btns/AssignBtn";
import SkipBtn from "./components/Btns/SkipBtn";
import BreakBtn from "./components/Btns/BreakBtn";
import ReadyBtn from "./components/Btns/ReadyBtn";
import BreakOverBtn from "./components/Btns/BreakOverBtn";
import ClockOutBtn from "./components/Btns/ClockOutBtn";

function App() {
  const [isTrainee, setIsTrainee] = useState(false);

  const handleStatusChange = () => {
    setIsTrainee((prevState) => !prevState);
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
          placeholder="Enter Name Here"
          required
          // value={employeeName}
          // onChange={handleChange}
          className="p-2 mx-2 rounded-lg"
        />

        <label className="mx-2">
          <input
            className=" "
            type="checkbox"
            name="status"
            value="trainee"
            checked={isTrainee}
            onChange={handleStatusChange}
          />
          Training
        </label>

        <button className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Add
        </button>
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
            <tr>
              <td>Finn</td>
              <td>3</td>
              <td>
                <AssignBtn />
              </td>
              <td>
                <SkipBtn />
              </td>
              <td>
                <BreakBtn />
              </td>
              <td>
                <ClockOutBtn />
              </td>
            </tr>
            <tr>
              <td>Chelsea</td>
              <td>4</td>
              <td>
                <AssignBtn />
              </td>
              <td>
                <SkipBtn />
              </td>
              <td>
                <BreakBtn />
              </td>
              <td>
                <ClockOutBtn />
              </td>
            </tr>
            <tr>
              <td>Boswell</td>
              <td>4</td>
              <td>
                <AssignBtn />
              </td>
              <td>
                <SkipBtn />
              </td>
              <td>
                <BreakBtn />
              </td>
              <td>
                <ClockOutBtn />
              </td>
            </tr>
            <tr>
              <td>Archimedes</td>
              <td>5</td>
              <td></td>
              <td></td>
              <td>
                <BreakOverBtn />
              </td>
              <td>
                <ClockOutBtn />
              </td>
            </tr>
            <tr className="clocked-out">
              <td>Kyle</td>
              <td>5</td>
              <td>CLOCKED OUT</td>
            </tr>
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
            <tr>
              <td>Finn</td>
              <td>0</td>
              <td>
                <AssignBtn />
              </td>
              <td>
                <SkipBtn />
              </td>
            </tr>
            <tr>
              <td>Chelsea</td>
              <td>1</td>
              <td>
                <ReadyBtn />
              </td>
              <td>{/* <button>Skip</button> */}</td>
            </tr>
            <tr>
              <td>Archimedes</td>
              <td>1</td>
              <td>{/* <button>Break Over</button> */}</td>
              <td>{/* <button>Skip</button> */}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <hr className="my-8" />
      <footer>
        Created by{" "}
        <a target="_blank" href="https://github.com/missatrox44">
          S4R4
        </a>
      </footer>
    </div>
  );
}

export default App;
