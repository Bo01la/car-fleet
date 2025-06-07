import { useRef, useEffect, useState } from "react";

import Modal from "./Modal";

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
      {theModal && <Modal ref={modalRef} id={id} onClose={hide} />}
      <div
        className={`flex flex-col gap-4 p-3.5 border-2 ${
          needsMaintenance ? " border-red-600" : "border-green-600"
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
          <span className="font-light">{`since ${onDate}`}</span>
        </p>
        <p className="font-semibold">
          tires changed on:
          <span className="font-light">{`on ${onKM} km`}</span>
        </p>
        <p className="font-semibold">
          last time changed battery:
          <span className="font-light">{battery}</span>
        </p>
        <p className="font-semibold">
          cost:
          <span className="font-light">{cost}</span>
        </p>
        <button onClick={show}>Edit</button>
      </div>
    </>
  );
}
