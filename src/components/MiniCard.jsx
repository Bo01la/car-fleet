import { dmyDateFormat } from "../utils/dateFunctions";

export default function MiniCard({ car, bg }) {
  return (
    <div className={`mb-2 w-1/3 p-2 rounded-md flex flex-col gap-2 ${bg}`}>
      <p className="font-bold">
        driver name :<span className="font-extralight">{car.driver}</span>
      </p>
      <p className="font-bold">
        plate number :<span className="font-extralight">{car.plateNumber}</span>
      </p>
      <p className="font-bold">
        upcoming maintenance :
        <span className="font-extralight">
          {dmyDateFormat(car.maintenanceStatus.upcomingMaintenanceDate.seconds)}
        </span>
      </p>
    </div>
  );
}
