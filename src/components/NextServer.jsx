import React from "react";

function NextServer({ employees, nextServerIndex }) {
  return (
    <div className="my-3">
      <h2 className="text-3xl">
        Next Server: {employees[nextServerIndex]?.employeeName || "N/A"}{" "}
      </h2>
    </div>
  );
}

export default NextServer;
