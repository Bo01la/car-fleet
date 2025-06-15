import { useContext, useRef, useEffect, useState } from "react";

import ActionsTable from "./ActionsTable";
import AddReport from "./AddReport";
import { DataContext } from "../store/DataContext";

function Reports() {
  const { reports } = useContext(DataContext);

  const dialogRef = useRef();
  const [addReport, setReport] = useState(false);

  useEffect(() => {
    if (addReport) {
      dialogRef.current.open();
    }
  }, [addReport]);

  function show() {
    setReport(true);
  }

  function hide() {
    setReport(false);
  }

  return (
    <>
      <div
        className="flex gap-2 items-center ml-14 mb-4 cursor-pointer"
        onClick={show}
      >
        <img
          width={24}
          src="/src/assets/media/add_circle_42dp_000000_FILL0_wght400_GRAD0_opsz40.svg"
          alt="Add Icon"
        />
        <h3 className="font-bold text-lg">Add report</h3>
      </div>
      {addReport && <AddReport ref={dialogRef} onClose={hide} />}

      {reports.length === 0 && (
        <p className="mx-auto max-w-fit">no reports to be displayed...</p>
      )}
      {reports.length > 0 && <ActionsTable actions={reports} />}
    </>
  );
}

export default Reports;
