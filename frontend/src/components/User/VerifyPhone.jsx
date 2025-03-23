import { useState } from "react";
import OtpInput from "react-otp-input";
import { RxCountdownTimer } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { verifyPhoneNumber, sendotpbysms } from "../../slices/authSlice";
import { useNavigate } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";

const VerifyPhone = ({ isOpen, onClose }) => {
  const [otp, setOtp] = useState("");
  const { user } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleVerifyPhone = (e) => {
    e.preventDefault();
    dispatch(verifyPhoneNumber({ otp, phoneNumber: user.phoneNumber }));
    onClose();
   // navigate("/home");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-800">
          <AiOutlineClose size={20} />
        </button>
        <h1 className="text-center font-bold text-2xl mb-4">Verify Phone Number</h1>
        <p className="text-center text-gray-600 mb-6">A verification code has been sent to you. Enter the code below</p>
        <form onSubmit={handleVerifyPhone} className="flex flex-col items-center">
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderInput={(props) => (
              <input
                {...props}
                placeholder="-"
                className="w-12 h-12 text-center text-lg font-semibold border border-gray-400 rounded-md focus:outline-none"
              />
            )}
            containerStyle={{ gap: "8px" }}
          />
          <button
            type="submit"
            className="w-full mt-6 py-2 bg-blue-500 text-white font-medium rounded-lg shadow-md hover:bg-blue-600 transition-all"
           // onClick={handleVerifyPhone}
          >
            Verify Phone
          </button>
        </form>
        <div className="mt-6 flex justify-center text-sm">
          <button className="flex items-center gap-x-2 text-blue-400 hover:text-blue-500" onClick={() => sendotpbysms(user.phoneNumber)}>
            <RxCountdownTimer /> Resend it
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyPhone;
