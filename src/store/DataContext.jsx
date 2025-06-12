import { createContext, useState, useEffect } from "react";
import {COLLECTION_REF} from "../firebase";
import { getDocs } from "firebase/firestore";

export const DataContext = createContext();

export default function DataContextProvider({ children }) {
  const [cars, setCars] = useState([]);

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

  const ctxValue = {
    cars,
    setCars,
  };

  return <DataContext value={ctxValue}>{children}</DataContext>;
}
