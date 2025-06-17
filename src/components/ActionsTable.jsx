import { dmyDateFormat } from "../utils/dateFunctions";

function ActionsTable({ actions }) {
  return (
    <div className="mb-6 overflow-x-auto">
      <table className="table-auto w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="px-4 py-2 border">Plate Number</th>
            <th className="px-4 py-2 border">Date</th>
            <th className="px-4 py-2 border">Cost</th>
            <th className="px-4 py-2 border">Description</th>
          </tr>
        </thead>
        <tbody>
          {actions.map((action) => (
            <tr key={action.id} className="border-t">
              <td className="px-4 py-2 border">{action.plateNumber}</td>
              <td className="px-4 py-2 border">
                {dmyDateFormat(action.date.seconds)}
              </td>
              <td className="px-4 py-2 border ">{action.cost}</td>
              <td className="px-4 py-2 border max-w-3 whitespace-pre-wrap">
                {action.costdescription}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ActionsTable;
