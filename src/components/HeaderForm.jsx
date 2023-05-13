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
  );
}

export default HeaderForm;
