import { useState } from "react";
import "./App.css";

import TableRotation from "./components/Sample";

function App() {
  const [isTrainee, setIsTrainee] = useState(false);

  const handleStatusChange = () => {
    setIsTrainee((prevState) => !prevState);
  };

  return (
    <div className="App">
      <header>
        <h1>Crab City Server Rotation</h1>
        <label for="name">Employee Name</label>
        <input
          type="text"
          name="name"
          placeholder="Enter Name Here"
          required
          // value={employeeName}
          // onChange={handleChange}
        />

        <label>
          <input
            type="radio"
            name="status"
            value="trainee"
            checked={isTrainee}
            onChange={handleStatusChange}
          />
          Trainee
        </label>

        <button>Add</button>
      </header>

      {/* up next */}
      <div>
        <h2>Next Server: Sylvester </h2>
      </div>
      <hr />

      {/* small tops */}
      <div>
        <h3>Small Tops</h3>
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
                <button>+</button>
              </td>
              <td>
                <button>Skip</button>
              </td>
              <td>
                <button>Break</button>
              </td>
              <td>
                <button>Clock Out</button>
              </td>
            </tr>
            <tr>
              <td>Chelsea</td>
              <td>4</td>
              <td>
                <button>+</button>
              </td>
              <td>
                <button>Skip</button>
              </td>
              <td>
                <button>Break</button>
              </td>
              <td>
                <button>Clock Out</button>
              </td>
            </tr>
            <tr>
              <td>Boswell</td>
              <td>4</td>
              <td>
                <button>+</button>
              </td>
              <td>
                <button>Skip</button>
              </td>
              <td>
                <button>Break</button>
              </td>
              <td>
                <button>Clock Out</button>
              </td>
            </tr>
            <tr>
              <td>Archimedes</td>
              <td>5</td>
              <td></td>
              <td></td>
              <td>
                <button>Break Over</button>
              </td>
              <td>
                <button>Clock Out</button>
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
      <hr />
      {/* big tops */}
      <div>
        <h3>Big Tops</h3>
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
                <button>+</button>
              </td>
              <td>
                <button>Skip</button>
              </td>
            </tr>
            <tr>
              <td>Chelsea</td>
              <td>1</td>
              <td>
                <button>Ready for more tables</button>
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
      <hr />
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
