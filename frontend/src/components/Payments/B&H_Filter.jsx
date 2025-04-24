import CancelIcon from "@mui/icons-material/Cancel";
import { useState } from "react";

const BAndHFilter = ({ setOpenFilter }) => {
  const [konsaFilter, setKonsaFilter] = useState("");

  return (
    <div className="flex flex-col gap-0">
      <div className="flex flex-row justify-between">
        <h1 className="text-xl font-extrabold">Filter by</h1>
        <CancelIcon
          onClick={(e) => setOpenFilter(false)}
          className="scale-110 cursor-pointer hover:scale-95"
        />
      </div>
      <div className="divider"></div>
      <div className="flex flex-row justify-between">
        <div className="flex flex-row items-start">
          <div className="flex flex-col gap-4 justify-start font-bold">
            <div onClick={() => setKonsaFilter("Type")} className={`${konsaFilter === "Type" ? "bg-[#605dff] ring-2 mx-1" : ""}  hover:scale-95 cursor-pointer text-center rounded-xl `}>Type</div>
            <div onClick={() => setKonsaFilter("Amount")} className={`${konsaFilter === "Amount" ? "bg-[#605dff] ring-2 mx-1" : ""}  hover:scale-95 cursor-pointer text-center rounded-xl `}>Amount</div>
            <div onClick={() => setKonsaFilter("Date Range")} className={`${konsaFilter === "Date Range" ? "bg-[#605dff] ring-2 mx-1 p-0.5" : ""}  hover:scale-95 cursor-pointer text-center rounded-xl `}>Date Range</div>
          </div>
          <div className="divider lg:divider-horizontal mx-4" />{" "}
        </div>
        <div>
        {
                konsaFilter === "Type" ? (
                    <div className="flex flex-col gap-3 p-2 justify-center">
                        <div>Paid</div>
                        <div>Received</div>
                    </div>
                ) : konsaFilter === "Amount" ? (
                    <div className="flex flex-col gap-3 p-2">
                     <input className="ring-1 rounded-xl p-1 pl-4" type="text"  placeholder="Min Amount"/>
                     <input className="ring-1 rounded-xl p-1 pl-4" type="text" placeholder="Max Amount" />
                    </div>
                ) : konsaFilter === "Date Range" ? (
                    <div className="flex flex-row gap-2">
                    <div className="form-control">
                        <label className="label cursor-pointer">
                        <span className="label-text">From</span>
                        </label>
                    </div>
                    <div className="form-control">
                        <label className="label cursor-pointer">
                        <span className="label-text">To</span>
                        </label>
                    </div>
                    </div>
                ) : null
                }

        </div>
      </div>

      <div className="flex flex-row justify-between my-10">
        <button className="btn btn-primary-outline">Clear All</button>
        <button className="btn btn-primary">Apply</button>
      </div>
    </div>
  );
};

export default BAndHFilter;
