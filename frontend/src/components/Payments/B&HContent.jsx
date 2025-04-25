import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import TuneIcon from "@mui/icons-material/Tune";
import HistoryTiles from "./HistoryTiles";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  addBalanceAction,
  getPaymentHistoryAction,
} from "../../slices/paymentSlice";
import { toast } from "react-toastify";
import { Dialog, DialogContent } from "@mui/material";
import SecureIcon from "@mui/icons-material/VerifiedUser";

import BAndHFilter from "./B&H_Filter";

const BAndHContent = () => {
  const { user } = useSelector((state) => state.userReducer);
  const [checkBalance, setCheckBalance] = useState(false);
  const dispatch = useDispatch();
  const { paymentHistory } = useSelector((state) => state.paymentReducer);

  useEffect(() => {
    dispatch(getPaymentHistoryAction());
  }, []);

  //adding money to wallet

  const { balanceAdded } = useSelector((state) => state.paymentReducer);

  const [amount, setAmount] = useState(0); // <-- Add this line
  const handleAddMoneyModal = () => {
    setOpenModal(true);
  };
  const handleAddMoney = async () => {
    dispatch(addBalanceAction({ amount: Number(amount) }));
    setOpenModal(false);
  };
  useEffect(() => {
    if (balanceAdded) {
      toast.success(`₹${amount} Added Successfully`);
    }
  }, []);
  const [openModal, setOpenModal] = useState(false);



  //for searching
  const [searchQuery, setSearchQuery] = useState("");

  //for filters
  const [openFilter,setOpenFilter]=useState(false)
  const[updatedPaymentHistory,setUpdatedPaymentHistory]=useState(null)  

  return (
    <>
      <div className="flex flex-col text-white gap-4 overflow-hidden h-screen">
        <div className="flex flex-row justify-around max-sm:text-sm static">
          <h1 className="font-bold text-2xl ">Payment History</h1>
          {checkBalance ? (
            <div className=" flex flex-col justify-center  items-center text-center  font-bold text-white">
              <p className="text-xl">₹ {user.balance}</p>
              <p className="text-xs font-thin">Net Balance</p>
            </div>
          ) : (
            <AccountBalanceIcon
              className="scale-110 cursor-pointer hover:scale-130 mt-1"
              onClick={() => setCheckBalance((prev) => !prev)}
            />
          )}
        </div>

        {/* searchbar bar and filter icon */}
        <div className="flex flex-row justify-around gap-2" >
          <label className="input">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input type="search" value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)} className="grow" placeholder="Search" />
            <ManageSearchIcon />
          </label>
          <div onClick={(e)=>setOpenFilter(!openFilter)} className="flex flex-row gap-1 items-center justify-around cursor-pointer hover:scale-95">
            <TuneIcon className="scale-130  text-[#605dff]" />
            <p className="text-[#605dff] text-xs font-bold">Filter</p>
          </div>
        </div>

        {openFilter ? (
          //filter box 
          
          <BAndHFilter setOpenFilter={setOpenFilter} setUpdatedPaymentHistory={setUpdatedPaymentHistory}/>
        ) : (
          // payment history box
          <div className="flex flex-col scrollbar-hidden items-center overflow-auto">
            {updatedPaymentHistory?
              updatedPaymentHistory.map((payment) => (
                <HistoryTiles key={payment._id} payment={payment} searchItem={searchQuery} />
              )):(
                paymentHistory && paymentHistory.map((payment) => (
                  <HistoryTiles key={payment._id} payment={payment} searchItem={searchQuery} />
                ))
              )}
          </div>
        )}

        {/* Addmoney withdrawMoney boxes */}
        <div className={`${openFilter ? "hidden " : ""}flex flex-row justify-between py-2 max-sm:flex-col max-md:flex-col`}>
          <button
            onClick={handleAddMoneyModal}
            className="btn bg-green-500 text-black cursor-pointer hover:bg-green-600"
          >
            Add Money
          </button>
          <button className="btn bg-red-500 text-black cursor-pointer hover:bg-red-600">
            Withdraw Money
          </button>
        </div>
      </div>


      {/* Dialogue box for add money  */}
      <Dialog
        open={openModal}
        onClose={() => setOpenModal(false)}
        maxWidth="xs"
        sx={{
          "& .MuiPaper-root": {
            background: "transparent",
            backdropFilter: "blur(10px)",
            borderRadius: "12px",
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.9)",
            width: "30%",
            height: "auto", // Change height to auto
          },
        }}
      >

        <DialogContent className="p-4 flex justify-center items-center">
          <div className="flex flex-col gap-4  w-2/3 h-2/3 ">
            <input
              type="text"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="p-2 rounded border bg-white text-black"
            />

            <div className="flex items-center justify-start gap-4 px-4 py-2 bg-transparent max-sm:flex-col max-sm:scale-70">
              <button
                onClick={handleAddMoney}
                className="btn flex items-center gap-2 px-5 py-2 text-green-700 text-sm font-medium border border-green-700 
                              rounded-full transition duration-300 hover:text-green-800 hover:border-green-800 cursor-pointer"
              >
                <SecureIcon className="text-green-700 text-sm transition duration-300 hover:text-green-800 cursor-pointer" />
                Proceed Securely
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default BAndHContent;
