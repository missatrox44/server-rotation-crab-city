import { useState } from "react";
import AddBtn from "./Btns/AddBtn";

// import { db } from '../utils/firebase';
// import { onValue, ref, set, getDatabase } from "firebase/database";
import { getDatabase, ref, set, push } from 'firebase/database';
const db = getDatabase();

function HeaderForm({ employees, setEmployees }) {

  const [employeeName, setEmployeeName] = useState("");
  const [isTrainee, setIsTrainee] = useState(false);

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
    writeUserData(newEmployees, newEmployee);
  };
  

  function writeUserData(employees, newEmployee ) {

    console.log('====================================');
    console.log(newEmployee);
    console.log('====================================');
    // const reference = ref(db);
    // employeesReference.set(employeeId: newEmployee})
    // set(reference).push(newEmployee);
    let employeesRef = ref(db, 'employees/')
    push(employeesRef, newEmployee);
  }



  return (
    <form>
      <label 
      htmlFor="name">Employee Name: </label>
      <input
        type="text"
        name="name"
        required
        value={employeeName}
        onChange={handleNameChange}
        className="p-2 mx-2 mb-5 rounded-lg text-black bg-neutral-100 text-netural-800 dark:bg-neutral-700 dark:text-neutral-100"
      />

      <label className="mx-5">
        <input
          className="mr-2"
          type="checkbox"
          checked={isTrainee}
          onChange={handleTraineeChange}
        />
        Training
      </label>

      <AddBtn onClick={handleAddEmployee} />
    </form>
  );
}

export default HeaderForm;
