import { createContext, useState, useEffect } from "react";
import { vehicles } from "../data/cards";

export const DataContext = createContext({
  cars: [],
});

export default function DataContextProvider({ children }) {
  const [cars, setCars] = useState(() => {
    const savedCars = localStorage.getItem("savedCars");
    return savedCars ? JSON.parse(savedCars) : vehicles;
  });

  useEffect(
    () => localStorage.setItem("savedCars", JSON.stringify(cars)),
    [cars]
  );

  const ctxValue = {
    cars: cars,
  };

  return <DataContext value={ctxValue}>{children}</DataContext>;
}
