import { useRef, useImperativeHandle, useEffect, useContext } from "react";
import { getDoc, doc } from "firebase/firestore";

import { db } from "../../firebase";
import { DataContext } from "../store/DataContext";

export default function Modal({ ref, id, onClose }) {
  const DOC_REF = doc(db, "vehicles", id);

  const dialogRef = useRef();
  useImperativeHandle(ref, () => {
    return {
      open: () => dialogRef.current.showModal(),
    };
  });

  const { cars } = useContext(DataContext);

  const car = cars.find((car) => car.id === id);
  console.log(car);

  function onSubmitHandler() {}

  function formatDateFromSeconds(seconds) {
    const date = new Date(seconds * 1000);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); 
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  return (
    <dialog ref={dialogRef} className="bg-amber-950">
      <form onSubmit={onSubmitHandler}>
        <label>
          Plate Number:
          <input
            name="plateNumber"
            type="text"
            defaultValue={car.plateNumber || ""}
            required
          />
        </label>

        <label>
          Distance Used (km):
          <input
            name="distanceUsedKm"
            type="number"
            defaultValue={car.distanceUsedKm || 0}
            min={0}
            required
          />
        </label>

        <label>
          Status:
          <select name="status" defaultValue={car.status || "active"} required>
            <option value="active">Active</option>
            <option value="maintenance">Maintenance</option>
          </select>
        </label>

        <label>
          Driver:
          <input
            name="driver"
            type="text"
            defaultValue={car.driver || ""}
            required
          />
        </label>

        <label>
          Model:
          <input
            name="model"
            type="text"
            defaultValue={car.model || ""}
            required
          />
        </label>

        <label>
          Needs Maintenance:
          <select
            name="needsMaintenance"
            defaultValue={car.maintenanceStatus.needsMaintenance ? "yes" : "no"}
            required
          >
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </label>

        <label>
          Upcoming Maintenance Date:
          <input
            name="upcomingMaintenanceDate"
            type="date"
            defaultValue={
              formatDateFromSeconds(
                car.maintenanceStatus.upcomingMaintenanceDate.seconds
              ) || ""
            }
          />
        </label>

        <label>
          Last Maintenance Date:
          <input
            name="lastMaintenanceDate"
            type="date"
            defaultValue={
              formatDateFromSeconds(
                car.maintenanceStatus.lastMaintenanceDate.seconds
              ) || ""
            }
          />
        </label>

        <label>
          Battery:
          <input
            name="battery"
            type="date"
            defaultValue={formatDateFromSeconds(car.battery.seconds) || ""}
          />
        </label>

        <label>
          Last Time Changed Tires (Date):
          <input
            name="onDate"
            type="date"
            defaultValue={formatDateFromSeconds(car.tires.onDate.seconds) || ""}
          />
        </label>

        <label>
          Tires Changed On (km):
          <input
            name="onKM"
            type="number"
            defaultValue={car.tires.onKM || 0}
            min={0}
          />
        </label>

        <label>
          Cost:
          <input
            name="cost"
            type="number"
            step="0.01"
            defaultValue={car.cost || 0}
            min={0}
          />
        </label>

        <button
          type="submit"
          className="mt-4 bg-blue-600 text-white py-2 rounded"
        >
          Update
        </button>
        <button type="button" onClick={onClose} className="mt-2">
          Cancel
        </button>
      </form>
    </dialog>
  );
}
