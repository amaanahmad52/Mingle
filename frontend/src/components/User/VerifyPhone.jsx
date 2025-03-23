import { useState } from "react";
import OtpInput from "react-otp-input";
import { RxCountdownTimer } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { verifyPhoneNumber, sendotpbysms } from "../../slices/authSlice";
import { useNavigate } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import { Backdrop, Popover, Typography } from "@mui/material";

const VerifyPhone = ({ isOpen, onClose }) => {
  const [otp, setOtp] = useState("");
  const { user } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleVerifyPhone = (e) => {
    e.preventDefault();
   // dispatch(verifyPhoneNumber({ otp, phoneNumber: user.phoneNumber }));
    onClose();
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
        <div >
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
          >
            <AiOutlineClose size={20} />
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
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderInput={(props) => (
                <input
                  {...props}
                  placeholder="-"
                  className="w-12 h-12 text-center text-lg font-semibold border border-gray-300 rounded-md focus:outline-none bg-white/40 backdrop-blur-md"
                />
              )}
              containerStyle={{ gap: "8px" }}
            />

            <button
              type="submit"
              className="w-full mt-6 py-2 bg-blue-500 text-white font-medium rounded-lg shadow-md hover:bg-blue-600 transition-all"
            >
              Verify Phone
            </button>
          </form>

          <div className="mt-6 flex justify-center text-sm">
            <button
              className="flex items-center gap-x-2 text-blue-200 hover:text-blue-300"
              onClick={() => dispatch(sendotpbysms(user.phoneNumber))}
            >
              <RxCountdownTimer /> Resend it
            </button>
          </div>
        </div>
      </Popover>
    </div>
  );
};

export default VerifyPhone;




