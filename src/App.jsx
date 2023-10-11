import { useState, useEffect, useRef } from "react";
import { ref, onValue, set } from "firebase/database";
import "./App.css";
import { db } from "./utils/firebase";
import Footer from "./components/Footer";
import HeaderForm from "./components/HeaderForm";
import NextServer from "./components/NextServer";
import EmployeeTable from "./components/EmployeeTable";
import ClearFirebaseModal from "./components/ClearFirebaseModal";

function App() {
  const [employees, setEmployees] = useState({ employeeData: [] });
  const [breakEmployees, setBreakEmployees] = useState([]);
  const [error, setError] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);

  let lastAction = useRef({});

  // On page load, employees retrieved from database
  useEffect(() => {
    getAllEmployees();
  }, []);

  // Retireves all employees from DB
  const getAllEmployees = () => {
    try {
      // Finds employees DB
      const getEmployees = ref(db, "employees");

      // Creates lists for working employees & employees on break
      onValue(getEmployees, (snapshot) => {
        let employeesArr = [];
        let breakEmployees = [];

        // Iterates through DB employee list, adds employee to correct list
        snapshot.forEach((employeeSnapshot) => {
          const employeeKey = employeeSnapshot.key;
          const employeeData = employeeSnapshot.val();

          // If not on break, employee is placed in employees array
          // If on break, employee is placed in breakEmployees array
          !employeeData.break
            ? employeesArr.push({ key: employeeKey, value: employeeData })
            : breakEmployees.push({ key: employeeKey, value: employeeData });
        });

        // Sort the array by the order field
        employeesArr.sort((a, b) => a.value.order - b.value.order);

        // State handling for on and off break employees
        setBreakEmployees([...breakEmployees]);
        setEmployees({ employeeData: [...employeesArr] });
      });
    } catch (error) {
      setError(`Error fetching employees data: ${error.message}`);
    }
  };

  // Modal Controls for Reset Btn
  const handleClearFirebase = () => {
    setModalVisible(true);
  };

  // Function to remove all employees from database
  const handleClearFirebaseConfirm = async () => {
    try {
      const employeesRef = ref(db, "employees");
      // Clears out db
      await set(employeesRef, null);
      setModalVisible(false);
    } catch (error) {
      console.error("Error clearing database:", error);
    }
  };

  // Modal Controls for Reset Btn
  const handleClearFirebaseCancel = () => {
    setModalVisible(false);
  };

  return (
    <div className="App">
      <button
        onClick={handleClearFirebase}
        className="fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded"
      >
        Reset
      </button>

      <ClearFirebaseModal
        isVisible={isModalVisible}
        onConfirm={handleClearFirebaseConfirm}
        onCancel={handleClearFirebaseCancel}
      />

      <header>
        <h1 className="text-blue-600 text-6xl mt-6">
          Server Rotation
        </h1>
        <h2 className="text-white-600 text-3xl m-2">Crab City | Odessa</h2>
        <p className="text-blue-600 text-xs mb-6">v.2.0.0</p>

        <HeaderForm employees={employees} setEmployees={setEmployees} />
      </header>
      {error && <p className="error-message">{error}</p>}

      {(employees.employeeData.length > 0 || breakEmployees.length > 0) && (
        <div>
          <hr className="my-8" />

          <NextServer employees={employees} />

          <hr className="my-8" />
          <main className="overflow-x-auto">
            <EmployeeTable
              employees={employees}
              setEmployees={setEmployees}
              breakEmployees={breakEmployees}
              setBreakEmployees={setBreakEmployees}
              lastAction={lastAction}
            />
          </main>

          <hr className="my-8" />
        </div>
      )}

      <Footer employees={employees} />
    </div>
  );
}

export default App;
