import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from 'react-toastify';
import { ConfirmOTPAction } from "../slices/UserSlices";

const ConfirmOTP = () => {
    const dispatch = useDispatch();
    const nav = useNavigate();
   
    const [otp, setOTP] = useState('');
  
    const {successO,phoneNumber} = useSelector(state => state.userReducer);
  
    // const phoneNumber = window.localStorage.getItem('phoneNumber');
    

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!phoneNumber) {
            toast.error("Phone number is missing. Please retry login.");
            return;
        }
        dispatch(ConfirmOTPAction({ otp, phoneNumber }));
    };

    useEffect(() => {
        if (successO) {
            // window.localStorage.clear(); 
            nav('/home', { replace: true });  // Prevents going back to OTP page
            toast.success("Login Success");
        }
    }, [successO, nav]);

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-row w-full min-h-96">
                <div className="card bg-base-100 w-full min-h-90 max-w-sm shrink-0 shadow-2xl ">
                <div className="card-body justify-center">
                <h1 className="text-3xl font-bold text-center ">Confirm OTP</h1>

                <fieldset className="fieldset">
                <label className="fieldset-label">OTP</label>
                <input type="text" className="w-full input" placeholder="OTP" value={otp}  onChange={(e) => setOTP(e.target.value)} />
                <button className="btn btn-neutral mt-3  hover:text-black-700 ">Confirm</button>

                </fieldset>


                </div>
                </div>
            </div>
            </div>
            </form>
        </div>
    );
};

export default ConfirmOTP;
