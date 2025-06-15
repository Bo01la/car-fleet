import { useContext } from "react";

import ActionsTable from "./ActionsTable";
import { DataContext } from "../store/DataContext";

function Reports() {
  const { reports } = useContext(DataContext);

  return (
    <>
      {reports.length === 0 && (
        <p className="mx-auto max-w-fit">no reports to be displayed...</p>
      )}
      {reports.length > 0 && <ActionsTable actions={reports} />}
    </>
  );
}

export default Reports;
