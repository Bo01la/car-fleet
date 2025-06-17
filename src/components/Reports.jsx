import { useContext, useRef, useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";

import ActionsTable from "./ActionsTable";
import AddReport from "./AddReport";
import { DataContext } from "../store/DataContext";
import { db } from "../firebase";

function Reports() {
  const { reports } = useContext(DataContext);

  const dialogRef = useRef();
  const [addReport, setReport] = useState(false);
  const [options, setOptions] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [filteredReports, setFilteredReports] = useState([]);

  useEffect(() => {
    if (addReport) {
      dialogRef.current.open();
    }
  }, [addReport]);

  useEffect(() => async () => {
    try {
      const reportsCollection = collection(db, "reports");
      const availableDates = await getDocs(reportsCollection);
      const optionsSet = availableDates.docs.map((option) => option.id);
      setOptions(optionsSet);
    } catch (error) {
      console.log(error);
    }
  });

  async function handleFilteredReports(date) {
    try {
      const actionsRef = collection(db, "reports", date, "actions");
      const snapshot = await getDocs(actionsRef);

      const fetchedActions = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(fetchedActions);
      setFilteredReports(fetchedActions);
      setShowFilters(true);
    } catch (error) {
      console.log("error is", error);
    }
  }

  function show() {
    setReport(true);
  }

  function hide() {
    setReport(false);
  }

  return (
    <>
      <div
        className="flex gap-2 items-center ml-14 mb-4 w-fit cursor-pointer"
        onClick={show}
      >
        <img
          width={24}
          src="/src/assets/media/add_circle_42dp_000000_FILL0_wght400_GRAD0_opsz40.svg"
          alt="Add Icon"
        />
        <h3 className="font-bold text-lg">Add report</h3>
      </div>
      <label className="ml-14 w-fit">
        Filter by date:
        <select
          onChange={(e) => handleFilteredReports(e.target.value)}
          name="date"
          className=" ml-14 mb-4 w-fit p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent "
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>

      {addReport && <AddReport ref={dialogRef} onClose={hide} />}

      {reports.length === 0 && (
        <p className="mx-auto max-w-fit">no reports to be displayed...</p>
      )}
      {reports.length > 0 && !showFilters && <ActionsTable actions={reports} />}
      {showFilters && <ActionsTable actions={filteredReports} />}
    </>
  );
}

export default Reports;
