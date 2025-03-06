import { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { RxCountdownTimer } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { sendOtp, signUp } from "../../slices/authSlice";
import { useNavigate } from "react-router-dom";
import { BsSun, BsMoon } from "react-icons/bs";


const Verify_Email_on_Signup = () => {
    const [otp, setOtp] = useState("");
  const { signUpdata, loading ,success} = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(true);
 
  useEffect(() => {
    // Only allow access of this route when user has filled the signup form
    if (!signUpdata ) {
      navigate("/signup");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    // Only allow access of this route when user has filled the signup form
    if (success ) {
      navigate('/login')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success]);

  const handleVerifyAndSignup = (e) => {
    e.preventDefault();
   // setOtp(otp);
   console.log("my otp is",otp);
    const {
     
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
      confirmPassword,
    } = signUpdata;
    // console.log("helloooo",phoneNumber)
console.log(signUpdata);
    dispatch(
      signUp({
        firstName,
        lastName,
        email,
        phoneNumber,
        password,
        confirmPassword,otp}
      )
    );
   
  };

  return (
    <div className={`${darkMode ? "bg-gradient-to-br from-black via-richblack-900 to-gray-900" : "bg-gradient-to-br from-white via-gray-100 to-gray-300"} min-h-screen flex flex-col items-center justify-center p-6 transition-all duration-300`}>
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="absolute top-4 right-4 p-2 bg-white/20 dark:bg-black/30 rounded-full shadow-md backdrop-blur-md"
    >
      {darkMode ? "🌞" : "🌙"}
    </button>
    <div className="max-w-md p-6 lg:p-8 rounded-xl shadow-2xl backdrop-blur-md bg-white/10 dark:bg-black/30 border border-white/20">
      <h1 className={`${darkMode ? "text-white" : "text-black"} text-center font-bold text-2xl mb-4`}>Verify Email</h1>
      <p className={`${darkMode ? "text-gray-300" : "text-gray-700"} text-center mb-6`}>A verification code has been sent to you. Enter the code below</p>
      
      {loading ? (
        <div className="flex justify-center">
          <div className="spinner"></div>
        </div>
      ) : (
        <form onSubmit={handleVerifyAndSignup} className="flex flex-col items-center">
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderInput={(props) => (
              <input
                {...props}
                placeholder="-"
                className={`w-[70px] lg:w-[70px] aspect-square text-center text-lg font-semibold rounded-md focus:outline-none border bg-white/10 ${darkMode ? "text-white border-white/20" : "text-black border-gray-500"}`}
              />
            )}
            containerStyle={{  gap: "6px" }}
          />
          <button
            type="submit"
            className="w-full mt-6 py-2 bg-yellow-500 text-black font-medium rounded-lg shadow-md hover:bg-yellow-600 transition-all"
          >
            Verify Email
          </button>
        </form>
      )}
      <div className="mt-6 flex items-center justify-between text-sm">
        <Link to="/signup" className={`${darkMode ? "text-white" : "text-black"} flex items-center gap-x-2 hover:underline`}>
          <BiArrowBack /> Back To Signup
        </Link>
        <button className="flex items-center gap-x-2 text-blue-400 hover:text-blue-500" onClick={() => sendOtp(signUpdata.email)}>
          <RxCountdownTimer /> Resend it
        </button>
      </div>
    </div>
  </div>
  );
}

export  default Verify_Email_on_Signup