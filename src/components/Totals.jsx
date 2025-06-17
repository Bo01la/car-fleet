import { useContext } from "react";

import { DataContext } from "../store/DataContext";
import MiniCard from "./MiniCard.jsx";

export default function Totals() {
  const { cars, reports } = useContext(DataContext);
  console.log(reports);

  let totalCost = 0
  reports.map((report)=> totalCost+= report.cost)
  

  const needsMaintenance = cars.filter(
    (car) => car?.maintenanceStatus?.needsMaintenance === true
  );

  const inMaintenance = cars.filter((car) => car?.status === "maintenance");
  return (
    <>
      <div className="ml-6 mb-6 flex flex-col gap-8">
      <h2 className="font-bold">
        All Cars = <span className="font-extralight">{cars.length} cars</span>
      </h2>
      <h2 className="font-bold">
        Total Cost = <span className="font-extralight">SAR {totalCost}</span>
      </h2>

      <div>
        <h2>Cars neds maintenance {needsMaintenance.length}</h2>
        {needsMaintenance.map((car) => (
          <MiniCard key={car.id} car={car} bg={"bg-rose-300"} />
        ))}
      </div>
      <div>
        <h2>Cars in maintenance {inMaintenance.length}</h2>
        {inMaintenance.map((car) => (
          <MiniCard key={car.id} car={car} bg={"bg-orange-300"} />
        ))}
      </div>
      </div>
    </>
  );
}
