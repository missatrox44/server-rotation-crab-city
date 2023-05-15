import React from "react";

function NextServer({ employees, nextServerIndex }) {
  return (
    <div className="my-3">
      <h2 className="text-3xl">
        Next Server: <span className="font-bold">{employees[nextServerIndex]?.employeeName}</span>
      </h2>
    </div>
  );
}

export default NextServer;
