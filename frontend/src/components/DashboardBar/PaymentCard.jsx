import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

export const PaymentCardBack = ({handlePayment}) => {
  return (
    <div className="cursor-pointer flex flex-col items-center justify-center p-4 gap-3 border-2 rounded-2xl border-[#f43098] h-30 w-50" onClick={()=>handlePayment()}>
      <p className=" font-bold text-center text-green-600 hover:text-green-700">
        Balance and History
      </p>
    </div>
  );
};

export const PaymentCardFront = () => {
  return (
    <div className="cursor-pointer flex flex-col items-center justify-center p-4 gap-3 rounded-2xl border-2 border-[#f43098] h-30 w-50 text-center font-bold text-green-600">
      <CurrencyRupeeIcon className="scale-170" />
      Payments
    </div>
  );
};
