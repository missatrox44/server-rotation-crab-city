import { useState, useEffect, useRef } from "react";
import { ref, onValue } from "firebase/database";
import "./App.css";
import { db } from "./utils/firebase";
import Footer from "./components/Footer";
import HeaderForm from "./components/HeaderForm";
import NextServer from "./components/NextServer";
import EmployeeTable from "./components/EmployeeTable";

function App() {
  const [employees, setEmployees] = useState({ employeeData: [] });
  const [breakEmployees, setBreakEmployees] = useState([]);
  const [nextServerIndex, setNextServerIndex] = useState(0);
  const [error, setError] = useState(null);

  let lastAction = useRef({});

  // Error reset function
  const resetError = () => {
    setError(null);
  };

  const handleUndo = () => {
    if (!lastAction.current.action) {
      return;
    }
    const {
      action,
      employee,
      currentEmployeeList,
      currentBreakEmployeeList,
    } = lastAction.current;
    if (action === "big top") {
      employee.bigTopTotal = employee.bigTopTotal - 1;
    }
    setEmployees(currentEmployeeList);
    setBreakEmployees(currentBreakEmployeeList);
    lastAction.current = {};
  };

  useEffect(() => {
    getAllEmployees();
  }, []);

  // Retireves all employees from DB
  const getAllEmployees = () => {
    try {
      const getEmployees = ref(db, "employees");
      onValue(getEmployees, (snapshot) => {
        let employeesArr = [];
        let breakEmployees = [];
        snapshot.forEach((employeeSnapshot) => {
          const employeeKey = employeeSnapshot.key;
          const employeeData = employeeSnapshot.val();
          console.log(employeeData);
          (!employeeData.break ? (
            employeesArr.push({ key: employeeKey, value: employeeData })
          ) : (
            breakEmployees.push({key: employeeKey, value: employeeData})
          )
            )
        });

        // Sort the array by the order field
        employeesArr.sort((a, b) => a.value.order - b.value.order);
        setBreakEmployees([...breakEmployees])
        setEmployees({ employeeData: [...employeesArr] });
      });
    } catch (error) {
      console.log(error);
      setError(`Error fetching employees data: ${error.message}`);
    }
  };

  return (
    <div className="App">
      <header>
        <h1 className="text-blue-600 text-6xl">Crab City Server Rotation</h1>
        <p className="text-xs mb-6">v.1.3.0</p>

        <HeaderForm employees={employees} setEmployees={setEmployees} />
      </header>
      {error && <p className="error-message">{error}</p>}

      {(employees.employeeData.length > 0 || breakEmployees.length > 0) && (
        <div>
          <hr className="my-8" />

          <NextServer employees={employees} nextServerIndex={nextServerIndex} />

          <hr className="my-8" />
          <main className="overflow-x-auto">
            <EmployeeTable
              employees={employees}
              setEmployees={setEmployees}
              breakEmployees={breakEmployees}
              setBreakEmployees={setBreakEmployees}
              nextServerIndex={nextServerIndex}
              lastAction={lastAction}
            />
          </main>

          <hr className="my-8" />
        </div>
      )}

      <Footer employees={employees} handleUndo={handleUndo} />
    </div>
  );
}

export default App;
