import { createContext, useState, useEffect } from "react";
import {db, COLLECTION_REF} from "../firebase";
import { getDocs, collection } from "firebase/firestore";

export const DataContext = createContext();

export default function DataContextProvider({ children }) {
  const [cars, setCars] = useState([]);
  const [reports, setReports] = useState([]);

// fetching car data
  useEffect(
    () => async () => {
      try {
        const data = await getDocs(COLLECTION_REF);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setCars(() => filteredData);
      } catch (error) {
        console.log(error.message);
      }
    },
    []
  );

// fetching reports data
useEffect(
  () => async () => {
    try {
      const actionsRef = collection(db, "reports", "06-2025", "actions");
      const snapshot = await getDocs(actionsRef);

      const fetchedActions = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setReports(fetchedActions);
    } catch (error) {
      console.log("error is", error);
    }
  },
  []
);

  const ctxValue = {
    cars,
    setCars,
    reports,
    setReports
  };

  return <DataContext value={ctxValue}>{children}</DataContext>;
}
