import { dmyDateFormat } from "../utils/dateFunctions";

function ActionsTable({ actions }) {
  return (
    <div className="overflow-x-auto">
      {console.log("inner actions", actions)}
      <table className="table-auto w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="px-4 py-2 border">Plate Number</th>
            <th className="px-4 py-2 border">Date</th>
            <th className="px-4 py-2 border">Description</th>
            <th className="px-4 py-2 border">Cost</th>
          </tr>
        </thead>
        <tbody>
          {actions.map((action) => (
            <tr key={action.id} className="border-t">
              <td className="px-4 py-2 border">{action.plateNumber}</td>
              <td className="px-4 py-2 border">
                {dmyDateFormat(action.date.seconds)}
                {/* .toDate().toLocaleDateString("en-GB") */}
              </td>
              <td className="px-4 py-2 border">{action.costdescription}</td>
              <td className="px-4 py-2 border">{action.cost}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ActionsTable;
