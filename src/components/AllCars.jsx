import { useState, useRef, useContext, useEffect } from "react";

import { dmyDateFormat } from "../utils/dateFunctions";
import { DataContext } from "../store/DataContext";
import Card from "./Card";
import AddCar from "./AddCar";

function AllCars() {
  const { cars } = useContext(DataContext);

  const carRef = useRef();
  const [addCar, setAddCar] = useState(false);

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
      <div
        className="flex gap-2 w-fit items-center ml-14 mb-4 cursor-pointer"
        onClick={show}
      >
        <img
          width={24}
          src="/src/assets/media/add_circle_42dp_000000_FILL0_wght400_GRAD0_opsz40.svg"
          alt="Add Icon"
        />
        <h3 className="font-bold text-lg">Add Car</h3>
      </div>
      {addCar && <AddCar ref={carRef} onClose={hide} />}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mx-14 mb-5">
        {cars.map((car) => (
          <Card
            key={car.id}
            {...car}
            lastMaintenanceDate={dmyDateFormat(
              car.maintenanceStatus.lastMaintenanceDate.seconds
            )}
            upcomingMaintenanceDate={dmyDateFormat(
              car.maintenanceStatus.upcomingMaintenanceDate.seconds
            )}
            needsMaintenance={car.maintenanceStatus.needsMaintenance}
            battery={dmyDateFormat(car.battery.seconds)}
            onKM={car.tires.onKM}
            onDate={dmyDateFormat(car.tires.onDate.seconds)}
          />
        ))}
      </div>
    </>
  );
}

export default AllCars;
