import { useContext } from "react";
import { DataContext } from "./assets/store/DataContext";

import Card from "./assets/components/Card";

function App() {
  const { cars } = useContext(DataContext);

  function formatDateFromSeconds(seconds) {
    return new Date(seconds * 1000).toLocaleDateString("en-GB");
  }

  return (
    <>
      <div>
        <h1 className="my-6 text-2xl text-center font-black ">Vehicles</h1>
        <div className="grid grid-cols-2 gap-5 mx-14">
          {cars.map((car) => (
            <Card
              key={car.id}
              {...car}
              lastMaintenanceDate={formatDateFromSeconds(
                car.maintenanceStatus.lastMaintenanceDate.seconds
              )}
              upcomingMaintenanceDate={formatDateFromSeconds(
                car.maintenanceStatus.upcomingMaintenanceDate.seconds
              )}
              needsMaintenance={car.maintenanceStatus.needsMaintenance}
              battery={formatDateFromSeconds(car.battery.seconds)}
              onKM={car.tires.onKM}
              onDate={formatDateFromSeconds(car.tires.onDate.seconds)}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
