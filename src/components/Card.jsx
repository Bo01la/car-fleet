import { useRef, useEffect, useState, useContext } from "react";
import { doc, updateDoc } from "firebase/firestore";

import EditModal from "./EditModal";
import { DataContext } from "../store/DataContext";
import { dateToSeconds, secondsToMonths } from "../utils/dateFunctions";
import { db } from "../firebase";

export default function Card({
  id,
  plateNumber,
  distanceUsedKm,
  status,
  driver,
  model,
  needsMaintenance,
  upcomingMaintenanceDate,
  lastMaintenanceDate,
  battery,
  onKM,
  onDate,
  cost,
}) {
  const [theModal, setTheModal] = useState(false);
  const modalRef = useRef();
  const { currentMonth, setCars } = useContext(DataContext);
  const sinceLastMaintenance = secondsToMonths(
    dateToSeconds(`01-${currentMonth}`) - dateToSeconds(lastMaintenanceDate)
  );

  console.log("current month", dateToSeconds(`01-${currentMonth}`));

  useEffect(() => {
    console.log(sinceLastMaintenance, id);

    const shouldSetTrue = sinceLastMaintenance >= 5;
    const shouldSetFalse =
      sinceLastMaintenance < 5 && needsMaintenance === true;

    const updateDb = async (newValue) => {
      try {
        const carDoc = doc(db, "vehicles", id);
        await updateDoc(carDoc, {
          "maintenanceStatus.needsMaintenance": newValue,
        });
        console.log(`Updated car ${id} to needsMaintenance = ${newValue}`);

        // تحديث الـ state محليًا
        setCars((prev) =>
          prev.map((car) =>
            car.id === id
              ? {
                  ...car,
                  maintenanceStatus: {
                    ...car.maintenanceStatus,
                    needsMaintenance: newValue,
                  },
                }
              : car
          )
        );
      } catch (error) {
        console.error("Error updating car:", error);
      }
    };

    if (shouldSetTrue && needsMaintenance === false) {
      updateDb(true);
    } else if (shouldSetFalse) {
      updateDb(false);
    }
  }, [sinceLastMaintenance, needsMaintenance]);

  useEffect(() => {
    if (theModal) {
      modalRef.current.open();
    }
  }, [theModal]);

  function show() {
    setTheModal(true);
  }

  function hide() {
    setTheModal(false);
  }

  return (
    <>
      {theModal && <EditModal ref={modalRef} id={id} onClose={hide} />}
      <div
        className={`relative flex flex-col gap-4 p-3.5 border-2 overflow-auto scrollbar-hide max-h-80 ${
          needsMaintenance || status === "maintenance"
            ? " border-red-600"
            : "border-green-600"
        } rounded-lg`}
      >
        <p className="font-semibold">
          plateNumber:
          <span className="font-light">{plateNumber}</span>
        </p>
        <p className="font-semibold">
          Model: <span className="font-light">{model}</span>
        </p>
        <p className="font-semibold">
          Driver: <span className="font-light">{driver}</span>
        </p>
        <p className="font-semibold">
          Status: <span className="font-light">{status}</span>
        </p>
        <p className="font-semibold">
          distance:
          <span className="font-light">{`${distanceUsedKm} km`}</span>
        </p>
        <p className="font-semibold">
          last maintenance:
          <span className="font-light">{lastMaintenanceDate}</span>
        </p>
        <p className="font-semibold">
          upcoming maintenance:
          <span className="font-light">{upcomingMaintenanceDate}</span>
        </p>
        <p className="font-semibold">
          last time changed tires:
          <span className="font-light">{` ${onDate}`}</span>
        </p>
        <p className="font-semibold">
          tires changed on:
          <span className="font-light">{`${onKM} km`}</span>
        </p>
        <p className="font-semibold">
          last time changed battery:
          <span className="font-light">{battery}</span>
        </p>
        <p className="font-semibold">
          cost:
          <span className="font-light">{cost}</span>
        </p>
        <button
          onClick={show}
          className="absolute right-1 opacity-65 cursor-pointer bg-cyan-300 rounded-full p-1"
        >
          <img src="/src/assets/media/edit.svg" alt="Edit icon" />
        </button>
      </div>
    </>
  );
}
