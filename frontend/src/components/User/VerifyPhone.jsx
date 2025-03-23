import { useEffect, useState, useRef } from "react";
import OtpInput from "react-otp-input";
import { RxCountdownTimer } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { verifyPhoneNumber, sendotpbysms } from "../../slices/authSlice";
import { useNavigate } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import { Backdrop, Popover, Typography } from "@mui/material";

const VerifyPhone = ({ isOpen, onClose }) => {
  const [otp, setOtp] = useState(new Array(6).fill("")); // Track input values
  const inputRefs = useRef([]); // Store refs for each input field
  const { user } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const handleVerifyPhone = (e) => {
    e.preventDefault();
    dispatch(verifyPhoneNumber({ otp: otp.join(""), phoneNumber: user.phoneNumber }));
    onClose();
  };

  // Function to allow only numbers and move focus
  const handleChangeOtp = (value, index) => {
    if (value && !/^\d$/.test(value)) {
      alert("Only numbers are allowed!");
      return;
    }

    let newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to the next input if a number is entered
    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle backspace: Move focus to the previous input
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div>
      {/* Backdrop */}
      <Backdrop
        open={isOpen}
        onClick={onClose}
        sx={{
          zIndex: (theme) => theme.zIndex.drawer - 1,
          backgroundColor: "rgba(0,0,0,0.7)",
        }}
      />

      {/* Popover */}
      <Popover
        open={isOpen}
        anchorReference="anchorPosition"
        anchorPosition={{ top: window.innerHeight / 2, left: window.innerWidth / 2 }}
        onClose={onClose}
        transformOrigin={{ vertical: "center", horizontal: "center" }}
        sx={{
          mt: 2,
          zIndex: (theme) => theme.zIndex.drawer + 1,
          "& .MuiPaper-root": {
            backgroundColor: "transparent",
            boxShadow: "none",
            backdropFilter: "blur(10px)",
          },
        }}
      >
        <div>
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
          >
            <AiOutlineClose className="text-cyan-600 hover:text-cyan-700 cursor-pointer" size={20} />
          </button>

          <Typography
            variant="h5"
            align="center"
            sx={{ fontWeight: "bold", color: "#fff" }}
          >
            Verify Phone Number
          </Typography>

          <Typography align="center" sx={{ color: "#ddd", marginBottom: "16px" }}>
            A verification code has been sent to you. Enter the code below.
          </Typography>

          <form onSubmit={handleVerifyPhone} className="flex flex-col items-center">
            <div className="flex gap-2">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  value={digit}
                  maxLength={1}
                  onChange={(e) => handleChangeOtp(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className={`w-12 h-12 text-center text-white text-lg font-semibold border-2 rounded-md focus:outline-none bg-transparent backdrop-blur-md ${
                    digit ? "border-cyan-700" : "border-gray-500"
                  }`}
                />
              ))}
            </div>

            <button
              type="submit"
              className="cursor-pointer w-full mt-6 py-2 bg-cyan-600 text-white font-medium rounded-lg shadow-md hover:bg-cyan-700 transition-all"
            >
              Verify Phone
            </button>
          </form>

          <div className="mt-6 flex justify-center text-sm">
            <button
              className="flex items-center gap-x-2 text-blue-200 cursor-pointer hover:text-blue-300"
              // onClick={() => dispatch(sendotpbysms(user.phoneNumber))}
            >
              <RxCountdownTimer/> Resend it
            </button>
          </div>
        </div>
      </Popover>
    </div>
  );
};

export default VerifyPhone;
