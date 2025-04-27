import { createContext,useState } from "react";
export const PaymentFilterContext = createContext();

export const PaymentFilterProvider = (props) => {
    const [paymentType, setPaymentType] = useState("");
    const [{ minAmount, maxAmount }, setAmount] = useState({ minAmount: "", maxAmount: "" });
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
  return (
    <PaymentFilterContext.Provider value={{paymentType,setPaymentType,minAmount,maxAmount,setAmount,startDate,setStartDate,endDate,setEndDate}}>
      {props.children}
    </PaymentFilterContext.Provider>
  );
};