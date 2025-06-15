import React, {
  useRef,
  useContext,
  useImperativeHandle,
  useState,
} from "react";
import { collection, doc, getDoc, setDoc, addDoc } from "firebase/firestore";

import { db } from "../firebase";
import { DataContext } from "../store/DataContext";
import { dateToSeconds } from "../utils/dateFunctions";

function AddReport({ ref, onClose }) {
  const dialogRef = useRef();
  const plateNumber = useRef();
  const date = useRef();
  const costdescription = useRef();
  const cost = useRef();

  const { setReports, currentMonth } = useContext(DataContext);

  const [disabled, setDisabled] = useState(false);

  useImperativeHandle(ref, () => {
    return {
      open: () => dialogRef.current.showModal(),
    };
  });

  async function onSubmitHandler(e) {
    e.preventDefault();
    const newReport = {
      plateNumber: plateNumber.current.value,
      date: {
        seconds: dateToSeconds(date.current.value),
      },
      cost: cost.current.value,
      costdescription: costdescription.current.value,
    };
    setDisabled(true);
    try {
      const reportDocRef = doc(db, "reports", currentMonth);
      const reportDocSnap = await getDoc(reportDocRef);

      if (!reportDocSnap.exists()) {
        await setDoc(reportDocRef, {});
        console.log("creating a new collection");
      }

      const actionsCollectionRef = collection(
        db,
        "reports",
        currentMonth,
        "actions"
      );

      await addDoc(actionsCollectionRef, newReport);
      setReports((prev) => [...prev, newReport]);
      console.log("added the doc", newReport);
      onClose();
    } catch (error) {
      console.log("error is ", error);
    }
  }

  return (
    <dialog
      ref={dialogRef}
      className="bg-black/35 max-w-screen max-h-fit flex justify-center py-4 overflow-y-auto w-full h-full fixed top-0 left-0 z-50 "
    >
      <form
        onSubmit={onSubmitHandler}
        className="grid grid-cols-1 gap-2 p-4 bg-white overflow-auto rounded-xl scrollbar-hide"
      >
        <label>
          Plate Number:
          <input
            ref={plateNumber}
            name="plateNumber"
            type="text"
            required
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
          />
        </label>

        <label>
          Date:
          <input
            ref={date}
            name="date"
            type="date"
            required
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
          />
        </label>

        <label>
          Cost Description:
          <textarea
            ref={costdescription}
            name="costdescription"
            rows="4"
            cols="50"
            required
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
          ></textarea>
        </label>

        <label>
          Cost:
          <input
            ref={cost}
            name="cost"
            type="number"
            step="0.01"
            required
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
          />
        </label>

        <button
          type="submit"
          className={`mt-4 bg-blue-600 text-white py-2 rounded hover:bg-green-600 ${
            disabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Submit
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

export default AddReport;
