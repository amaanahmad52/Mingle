import CancelIcon from "@mui/icons-material/Cancel";
import { useEffect, useState } from "react";
import DatePicker from 'react-date-picker';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';

const BAndHFilter = ({ setOpenFilter, setUpdatedPaymentHistory }) => {
  const [konsaFilter, setKonsaFilter] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [{ minAmount, maxAmount }, setAmount] = useState({ minAmount: "", maxAmount: "" });
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [activePicker, setActivePicker] = useState(null); // 'from' or 'to'

  // Format date as dd/mm/yyyy
  const formatDate = (date) => {
    if (!date) return "dd/mm/yyyy";
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const datePickerStyle = {
    width: '100%',
    maxWidth: '400px',
    backgroundColor: 'blue',
    color: 'white',
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '16px',
  };

  const handleDateSelect = (date) => {
    if (activePicker === 'from') {
      setStartDate(date);
      setActivePicker('to'); // Switch to "To" date selection
    } else {
      setEndDate(date);
      setOpenModal(false); // Close modal after selecting both dates
    }
  };

  useEffect(() => {
    console.log("Selected dates:", startDate, endDate);
  }, [startDate, endDate]);

  const openDateModal = (pickerType) => {
    setActivePicker(pickerType);
    setOpenModal(true);
  };

  return (
    <div className="flex flex-col gap-0">
      <div className="flex flex-row justify-between">
        <h1 className="text-xl font-extrabold">Filter by</h1>
        <CancelIcon
          onClick={() => setOpenFilter(false)}
          className="scale-110 cursor-pointer hover:scale-95"
        />
      </div>
      <div className="divider"></div>
      <div className="flex flex-row justify-between">
        <div className="flex flex-row items-start">
          <div className="flex flex-col gap-4 justify-start font-bold">
            <div onClick={() => setKonsaFilter("Type")} className={`${konsaFilter === "Type" ? "bg-[#605dff] ring-2 mx-1" : ""} hover:scale-95 cursor-pointer text-center rounded-xl`}>
              Type
            </div>
            <div onClick={() => setKonsaFilter("Amount")} className={`${konsaFilter === "Amount" ? "bg-[#605dff] ring-2 mx-1" : ""} hover:scale-95 cursor-pointer text-center rounded-xl`}>
              Amount
            </div>
            <div onClick={() => setKonsaFilter("Date Range")} className={`${konsaFilter === "Date Range" ? "bg-[#605dff] ring-2 mx-1 p-0.5" : ""} hover:scale-95 cursor-pointer text-center rounded-xl`}>
              Date Range
            </div>
          </div>
          <div className="divider lg:divider-horizontal mx-4" />
        </div>
        <div>
          {konsaFilter === "Type" ? (
            <div className="flex flex-col gap-3 px-18 pt-4">
              <div className="flex flex-row gap-2 items-center">
                <input
                  className="cursor-pointer"
                  type="checkbox"
                  value="Paid"
                  checked={paymentType === "Paid"}
                  onChange={(e) => setPaymentType(paymentType === e.target.value ? "" : e.target.value)}
                />
                <label>Paid</label>
              </div>
              <div className="flex flex-row gap-2 items-center">
                <input
                  className="cursor-pointer"
                  type="checkbox"
                  value="Received"
                  checked={paymentType === "Received"}
                  onChange={(e) => setPaymentType(paymentType === e.target.value ? "" : e.target.value)}
                />
                <label>Received</label>
              </div>
            </div>
          ) : konsaFilter === "Amount" ? (
            <div className="flex flex-col gap-3 p-2">
              <input
                value={minAmount}
                onChange={(e) => setAmount(prev => ({ ...prev, minAmount: e.target.value }))}
                className="ring-1 rounded-xl p-1 pl-4"
                type="text"
                placeholder="Min Amount"
              />
              <input
                value={maxAmount}
                onChange={(e) => setAmount(prev => ({ ...prev, maxAmount: e.target.value }))}
                className="ring-1 rounded-xl p-1 pl-4"
                type="text"
                placeholder="Max Amount"
              />
            </div>
          ) : konsaFilter === "Date Range" ? (
            <div className="flex flex-col gap-3 justify-center items-center px-7 pt-4">
              <div className="form-control cursor-pointer" onClick={() => openDateModal('from')}>
                <label className="label py-0">
                  <div className="label-text cursor-pointer text-[#605dff] rounded-xl items-center p-2 border-2 border-white">
                    From: {formatDate(startDate)}
                  </div>
                </label>
              </div>
              <div className="form-control cursor-pointer" onClick={() => openDateModal('to')}>
                <label className="label py-0">
                  <div className="label-text cursor-pointer text-[#605dff] rounded-xl items-center p-2 border-2 border-white">
                    To: {formatDate(endDate)}
                  </div>
                </label>
              </div>

              <Dialog
                open={openModal}
                onClose={() => setOpenModal(false)}
                maxWidth="lg"
                sx={{
                  "& .MuiPaper-root": {
                    background: "transparent",
                    backdropFilter: "blur(10px)",
                    borderRadius: "12px",
                    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.9)",
                    width: "30%",
                    height: "70%",
                  },
                }}
              >
                <DialogContent className="p-0">
                  <div className="p-4">
                    <h3 className="text-lg font-medium mb-4 text-[#605dff]">
                      Select {activePicker === 'from' ? 'Start' : 'End'} Date
                    </h3>
                    <DatePicker
                      onChange={handleDateSelect}
                      value={activePicker === 'from' ? startDate : endDate}
                      minDate={activePicker === 'to' ? startDate : null}
                      format="dd/MM/yyyy"
                      dayPlaceholder="dd"
                      monthPlaceholder="mm"
                      yearPlaceholder="yyyy"
                      className="custom-inline-date-picker"
                      style={datePickerStyle}
                    />
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          ) : null}
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
