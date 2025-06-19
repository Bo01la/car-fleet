import { createContext, useState, useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";

import { db, COLLECTION_REF } from "../firebase";
import { getCurrentMonthYear } from "../utils/dateFunctions";

export const DataContext = createContext();
export const currentMonth = getCurrentMonthYear();

export default function DataContextProvider({ children }) {
  const [cars, setCars] = useState([]);
  const [reports, setReports] = useState([]);

  // fetching car data
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getDocs(COLLECTION_REF);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setCars(filteredData);
      } catch (error) {
        console.log("Error fetching cars:", error.message);
      }
    }

    fetchData();
  }, []);

  // fetching reports data
  useEffect(() => {
    async function fetchedReports() {
      try {
        const actionsRef = collection(db, "reports", currentMonth, "actions");
        const snapshot = await getDocs(actionsRef);

        const fetchedActions = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setReports(fetchedActions);
      } catch (error) {
        console.log("error is", error);
      }
    }
    fetchedReports();
  }, []);

  const ctxValue = {
    cars,
    setCars,
    reports,
    setReports,
    currentMonth,
  };

  return <DataContext value={ctxValue}>{children}</DataContext>;
}
