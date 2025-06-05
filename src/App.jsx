import { useContext } from "react";

import { DataContext } from "./assets/store/DataContext";

function App() {
  // function dummy(id) {
  //   setCars((prevCars) =>
  //     prevCars.map((car) =>
  //       car.id === id ? { ...car, driver: "Mohamed Ali" } : car
  //     )
  //   );
  // }

  const cars = useContext(DataContext);

  return (
    <>
      <div>
        <h1 className="my-6 text-2xl text-center font-black ">Vehicles</h1>
        <div className="grid grid-cols-2 gap-5 mx-14">
          {cars.cars.map((car) => (
            <div
              key={car.id}
              className="flex flex-col gap-4 p-3.5 border-2 border-amber-950 rounded-lg"
            >
              <p className="font-semibold">
                plateNumber:
                <span className="font-light">{car.plateNumber}</span>
              </p>
              <p className="font-semibold">
                Model: <span className="font-light">{car.model}</span>
              </p>
              <p className="font-semibold">
                Driver: <span className="font-light">{car.driver}</span>
              </p>
              <p className="font-semibold">
                Status: <span className="font-light">{car.status}</span>
              </p>
              <p className="font-semibold">
                distance:
                <span className="font-light">{car.distanceUsedKm}</span>
              </p>
              <p className="font-semibold">
                last maintenance:
                <span className="font-light">
                  {car.maintenanceStatus.lastMaintenanceDate}
                </span>
              </p>
              <p className="font-semibold">
                upcoming maintenance:
                <span className="font-light">
                  {car.maintenanceStatus.upcomingMaintenanceDate}
                </span>
              </p>
              <p className="font-semibold">
                last time changed tyres:
                <span className="font-light">{car.tyres.lastChangedDate}</span>
              </p>
              <p className="font-semibold">
                last time changed battery:
                <span className="font-light">
                  {car.battery.lastChangedDate}
                </span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
