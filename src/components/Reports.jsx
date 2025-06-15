import { useContext } from "react";

import ActionsTable from "./ActionsTable";
import { DataContext } from "../store/DataContext";

function Reports() {
  const { reports } = useContext(DataContext);

  return (
    <>
      <ActionsTable actions={reports} />
    </>
  );
}

export default Reports;
