import React from "react";

function NextServer({ employees }) {
  if (!employees || !Array.isArray(employees.employeeData)) {
    return <div>Loading next server...</div>;
  }

  // Returns first employee who is not disabled
  const findNextAvailable = (employee) => {
    return employee?.value?.disabled === false;
  };

  // Finds next available server
  let nextAvailable = employees.employeeData.find(findNextAvailable);

  if (!nextAvailable) {
    return <div>No available servers.</div>;
  }

  return (
    <div className="my-3">
      <h2 className="text-3xl">
        Next Server:{" "}
        <span className="font-bold">{nextAvailable.value.employeeName}</span>
      </h2>
    </div>
  );
}

export default NextServer;