import React from 'react';
import BreakOverBtn from "./Btns/BreakOverBtn";

function BreakEmployeeRow({employee, setEmployees, lastAction, breakEmployees}) {

  const handleBreakOver = (employee) => {
    // function body
  };

  return (
    <tr key={employee.id}>
      {/* rendering logic */}
    </tr>
  );
}

export default BreakEmployeeRow;
