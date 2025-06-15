import { useContext, useState, useRef, useEffect } from "react";
import { DataContext } from "./store/DataContext";

import Card from "./components/Card";
import AddCar from "./components/AddCar";
import Reports from "./components/Reports";
import { dmyDateFormat } from "./utils/dateFunctions";

function App() {
  const { cars } = useContext(DataContext);

  const carRef = useRef();
  const [addCar, setAddCar] = useState(false);
  const [section, setSection] = useState("cars");

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

  function sectionToggleHandler(name) {
    setSection(name);
  }

  return (
    <>
      <div>
        <h1 className="my-6 text-2xl text-center font-black ">Vehicles</h1>
        <div className=" flex m-auto max-w-94 border-1 rounded-lg ">
          <button
            className={`px-4 py-2 w-1/2 border-r-1 rounded-l-[7px] cursor-pointer ${
              section === "cars" ? "bg-green-800 text-white" : ""
            }`}
            onClick={() => sectionToggleHandler("cars")}
          >
            Cars
          </button>
          <button
            className={`px-4 py-2 w-1/2 cursor-pointer  ${
              section === "totals" ? "bg-green-800 text-white" : ""
            }`}
            onClick={() => sectionToggleHandler("totals")}
          >
            Total Values
          </button>
          <button
            className={`px-4 py-2 w-1/2 cursor-pointer rounded-r-[7px] ${
              section === "reports" ? "bg-green-800 text-white" : ""
            }`}
            onClick={() => sectionToggleHandler("reports")}
          >
            Reports
          </button>
        </div>

        <div
          className="flex gap-2 items-center ml-14 mb-4 cursor-pointer"
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
        {section === "cars" && (
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
        )}
        {section === "reports" && <Reports />}
      </div>
    </>
  );
}

export default App;
