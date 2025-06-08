import { useContext, useState, useRef, useEffect } from "react";
import { DataContext } from "./assets/store/DataContext";

import Card from "./assets/components/Card";
import AddCar from "./assets/components/AddCar";

function App() {
  const { cars } = useContext(DataContext);

  const carRef = useRef();
  const [addCar, setAddCar] = useState(false);

  function formatDateFromSeconds(seconds) {
    return new Date(seconds * 1000).toLocaleDateString("en-GB");
  }

  useEffect(() => {
    if (addCar) {
      carRef.current.open();
    }
  }, [addCar]);

  function show() {
    setAddCar(true);
  }

  function hide() {
    setAddCar(false);
  }

  return (
    <>
      <div>
        <h1 className="my-6 text-2xl text-center font-black ">Vehicles</h1>
        {addCar && <AddCar ref={carRef} onClose={hide} />}
        <img
          src="/src/assets/media/add_circle_42dp_000000_FILL0_wght400_GRAD0_opsz40.svg"
          alt="Add Icon"
          className="cursor-pointer"
          onClick={show}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mx-14">
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
