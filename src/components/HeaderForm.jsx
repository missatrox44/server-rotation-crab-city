import React from "react";
import AddBtn from "./Btns/AddBtn";

function HeaderForm({
  employeeName,
  handleNameChange,
  isTrainee,
  handleTraineeChange,
  handleAddEmployee,
}) {
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