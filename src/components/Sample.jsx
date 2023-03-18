import React, { useState, useEffect } from "react";

const servers = ["Server 1", "Server 2", "Server 3"];
const tables = ["Table 1", "Table 2", "Table 3"];

const TableRotation = () => {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    const storedAssignments = JSON.parse(localStorage.getItem("assignments"));
    if (storedAssignments) {
      setAssignments(storedAssignments);
    } else {
      setAssignments(servers.map((server) => ({ serverName: server, currentTable: "" })));
    }
  }, []);

  const rotateTables = () => {
    const nextServerIndex = assignments.findIndex((assignment) => !assignment.currentTable);
    const nextTableIndex = assignments.filter((assignment) => assignment.currentTable).length;
    const nextServer = servers[nextServerIndex];
    const nextTable = tables[nextTableIndex];
    const updatedAssignments = [...assignments];
    updatedAssignments[nextServerIndex].currentTable = nextTable;
    setAssignments(updatedAssignments);
    localStorage.setItem("assignments", JSON.stringify(updatedAssignments));
  };

  return (
    <div>
      <h1>Table Rotation</h1>
      <ul>
        {assignments.map((assignment) => (
          <li key={assignment.serverName}>
            {assignment.serverName}: {assignment.currentTable}
          </li>
        ))}
      </ul>
      <button onClick={rotateTables}>Rotate Tables</button>
    </div>
  );
};

export default TableRotation;
