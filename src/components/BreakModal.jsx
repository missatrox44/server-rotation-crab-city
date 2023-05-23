import React from "react";

export default function BreakModal({
  employee,
  employees,
  setEmployees,
  setIsBreakModalVisible,
  lastAction,
  breakEmployees,
  setBreakEmployees,
}) {
  const handleBreak = () => {
    lastAction.current = {
      action: "break",
      employee: employee,
      currentEmployeeList: employees,
      currentBreakEmployeeList: breakEmployees,
    };
    const employeesCopy = [...employees];
    const workingEmployees = employeesCopy.filter((currentEmployee) => {
      if (currentEmployee.id !== employee.id) {
        return currentEmployee;
      }
    });
    const newBreakingEmployees = [...breakEmployees, employee];
    setBreakEmployees(newBreakingEmployees);
    setEmployees(workingEmployees);
    setIsBreakModalVisible(false);
  };

  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center w-full sm:ml-4 sm:mt-0 sm:text-left">
                  <h3
                    className="text-base font-bold leading-10 text-5xl text-gray-900"
                    id="modal-title"
                  >
                    {employee.employeeName}
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500 my-5 text-xl">
                      Are you sure you want to go on break?
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                className="inline-flex w-full justify-center rounded-full bg-blue-600 px-3 py-2.5 px-5 text-md font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                onClick={handleBreak}
              >
                Start Break
              </button>
              <button
                type="button"
                className="mt-3 mx-2 inline-flex w-full justify-center rounded-md bg-white px-3 py-2.5 text-md font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                onClick={() => setIsBreakModalVisible(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}