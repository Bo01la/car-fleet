import { useRef, useImperativeHandle, useContext } from "react";
import { updateDoc, doc } from "firebase/firestore";

import { db } from "../firebase";
import { DataContext } from "../store/DataContext";
import { dateToSeconds, formatDateFromSeconds } from "../utils/dateFunctions";

export default function Modal({ ref, id, onClose }) {
  const DOC_REF = doc(db, "vehicles", id);
  const { cars, setCars } = useContext(DataContext);
  const car = cars.find((car) => car.id === id);
  const dialogRef = useRef();
  const plateNumber = useRef();
  const distance = useRef();
  const status = useRef();
  const driver = useRef();
  const model = useRef();
  const maintenanceStatus = useRef();
  const upcomingMaintenanceDate = useRef();
  const lastMaintenanceDate = useRef();
  const battery = useRef();
  const tiresOnDate = useRef();
  const tiresOnKm = useRef();
  const cost = useRef();

  useImperativeHandle(ref, () => {
    return {
      open: () => dialogRef.current.showModal(),
    };
  });

  async function onSubmitHandler(e) {
    e.preventDefault();
    const updatedCarValues = {
      maintenanceStatus: {
        needsMaintenance:
          maintenanceStatus.current.value === "yes" ? true : false,
        lastMaintenanceDate: {
          seconds: dateToSeconds(lastMaintenanceDate.current.value),
        },
        upcomingMaintenanceDate: {
          seconds: dateToSeconds(upcomingMaintenanceDate.current.value),
        },
      },
      distanceUsedKm: distance.current.value,
      cost: cost.current.value,
      model: model.current.value,
      driver: driver.current.value,
      battery: {
        seconds: dateToSeconds(battery.current.value),
      },
      status: status.current.value,
      tires: {
        onKM: tiresOnKm.current.value,
        onDate: {
          seconds: dateToSeconds(tiresOnDate.current.value),
        },
      },
      plateNumber: plateNumber.current.value,
      id: id,
    };
    try {
      await updateDoc(DOC_REF, updatedCarValues);
      console.log("Document successfully updated!", updatedCarValues);
      onClose();
      setCars((prevCars) =>
        prevCars.map((car) =>
          car.id === id ? { ...car, ...updatedCarValues } : car
        )
      );
    } catch (error) {
      console.log("Error updating document: ", error);
    }
  }

  
  return (
    <dialog
      ref={dialogRef}
      className="bg-black/35 max-w-screen max-h-fit flex justify-center py-4 overflow-y-auto w-full h-full fixed top-0 left-0 z-50 "
    >
      <form
        onSubmit={onSubmitHandler}
        className="grid grid-cols-2 gap-5 p-4 bg-white overflow-auto rounded-xl scrollbar-hide "
      >
        <label>
          Plate Number:
          <input
            ref={plateNumber}
            name="plateNumber"
            type="text"
            defaultValue={car.plateNumber || ""}
            required
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
          />
        </label>

        <label>
          Distance Used (km):
          <input
            ref={distance}
            name="distanceUsedKm"
            type="number"
            defaultValue={car.distanceUsedKm || 0}
            min={0}
            required
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
          />
        </label>

        <label>
          Status:
          <select
            ref={status}
            name="status"
            defaultValue={car.status || "active"}
            required
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
          >
            <option value="active">Active</option>
            <option value="maintenance">Maintenance</option>
          </select>
        </label>

        <label>
          Driver:
          <input
            ref={driver}
            name="driver"
            type="text"
            defaultValue={car.driver || ""}
            required
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
          />
        </label>

        <label>
          Model:
          <input
            ref={model}
            name="model"
            type="text"
            defaultValue={car.model || ""}
            required
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
          />
        </label>

        <label>
          Needs Maintenance:
          <select
            ref={maintenanceStatus}
            name="needsMaintenance"
            defaultValue={car.maintenanceStatus.needsMaintenance ? "yes" : "no"}
            required
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
          >
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </label>

        <label>
          Upcoming Maintenance Date:
          <input
            ref={upcomingMaintenanceDate}
            name="upcomingMaintenanceDate"
            type="date"
            defaultValue={
              formatDateFromSeconds(
                car.maintenanceStatus.upcomingMaintenanceDate.seconds
              ) || ""
            }
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
          />
        </label>

        <label>
          Last Maintenance Date:
          <input
            ref={lastMaintenanceDate}
            name="lastMaintenanceDate"
            type="date"
            defaultValue={
              formatDateFromSeconds(
                car.maintenanceStatus.lastMaintenanceDate.seconds
              ) || ""
            }
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
          />
        </label>

        <label>
          Battery:
          <input
            ref={battery}
            name="battery"
            type="date"
            defaultValue={formatDateFromSeconds(car.battery.seconds) || ""}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
          />
        </label>

        <label>
          Last Time Changed Tires (Date):
          <input
            ref={tiresOnDate}
            name="onDate"
            type="date"
            defaultValue={formatDateFromSeconds(car.tires.onDate.seconds) || ""}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
          />
        </label>

        <label>
          Tires Changed On (km):
          <input
            ref={tiresOnKm}
            name="onKM"
            type="number"
            defaultValue={car.tires.onKM || 0}
            min={0}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
          />
        </label>

        <label>
          Cost:
          <input
            ref={cost}
            name="cost"
            type="number"
            step="0.01"
            defaultValue={car.cost || 0}
            min={0}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
          />
        </label>

        <button
          type="submit"
          className="mt-4 bg-blue-600 text-white py-2 rounded hover:bg-green-600"
        >
          Update
        </button>
        <button
          type="button"
          onClick={onClose}
          className="mt-4 border border-gray-400 hover:border-gray-700 py-2 rounded"
        >
          Cancel
        </button>
      </form>
    </dialog>
  );
}
