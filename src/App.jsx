import { useState } from "react";

import Reports from "./components/Reports";
import Totals from "./components/Totals";
import AllCars from "./components/AllCars";

function App() {
  const [section, setSection] = useState("cars");

  function sectionToggleHandler(name) {
    setSection(name);
  }
  

  return (
    <>
      <div>
        <h1 className="my-6 text-2xl text-center font-black ">Vehicles</h1>
        <div className=" flex m-auto max-w-94 border-1 rounded-lg mb-8 ">
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

        {section === "cars" && <AllCars />}
        {section === "totals" && <Totals />}
        {section === "reports" && <Reports />}
      </div>
    </>
  );
}

export default App;
