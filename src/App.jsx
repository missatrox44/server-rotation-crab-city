import { useState, useEffect, useRef } from "react";
import { ref, onValue } from "firebase/database";
import "./App.css";
import { db } from './utils/firebase';

import Footer from "./components/Footer";
import HeaderForm from "./components/HeaderForm";
import NextServer from "./components/NextServer";
import EmployeeTable from "./components/EmployeeTable";

function App() {

  const [employees, setEmployees] = useState([]);
  const [bigTopEmployees, setBigTopEmployees] = useState([]);
  const [breakEmployees, setBreakEmployees] = useState([]);
  const [nextServerIndex, setNextServerIndex] = useState(0);

  let lastAction = useRef({});


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
    try {
      // const db = getDatabase();
      const getEmployees = ref(db, 'employees/');
      onValue(getEmployees, (snapshot) => {
      const data = snapshot.val();
      console.log('====================================');
      console.log('data', data);
      console.log('====================================');
      setEmployees(data)
    });
    } catch (error) {
      console.log(error);
    }
  }, [employees]);


  
  // const getEmployees = ref(db, 'employees/');
  // onValue(getEmployees, (snapshot) => {
  //   const data = snapshot.val();
  //   console.log('====================================');
  //   console.log('data', data);
  //   console.log('====================================');;
  // });

  return (
    <div className="App">
      <header>
        <h1 className="text-blue-600 text-6xl">Crab City Server Rotation</h1>
        <p className="text-xs mb-6">v.1.3.0</p>

        <HeaderForm employees={employees} setEmployees={setEmployees}/>
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
              nextServerIndex={nextServerIndex}
              lastAction={lastAction}
            />
          </main>

          <hr className="my-8" />

        </div>
      }

      <Footer employees={employees} handleUndo={handleUndo} />

    </div>
  );
}

export default App;
