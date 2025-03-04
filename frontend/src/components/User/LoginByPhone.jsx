import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { LoginByPhoneAction } from "../../slices/UserSlices";

const LoginByPhone = () => {
    const dispatch = useDispatch();
    const nav = useNavigate();
    const [phoneNumber, setPhoneNumber] = useState('');
    
    const { successP } = useSelector(state => state.userReducer);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(LoginByPhoneAction(phoneNumber));
    };

    useEffect(() => {
        if (successP) {
            // window.localStorage.setItem('phoneNumber', phoneNumber);
            nav('/confirmOTP');
            toast.success("OTP Sent Successfully");
        }
    }, [successP, nav, phoneNumber]);

    return (
            <>
            <div>
            <form onSubmit={handleSubmit}>
                <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-row w-full min-h-96">
                <div className="card bg-base-100 w-full min-h-90 max-w-sm shrink-0 shadow-2xl ">
                <div className="card-body justify-center">
                <h1 className="my-2 text-3xl font-bold text-center ">Login</h1>
                <fieldset className="fieldset">
              
                <input type="text" className="w-full input selection:bg-cyan-500" placeholder="Phone Number" value={phoneNumber}  onChange={(e) => setPhoneNumber(e.target.value)} />
                <button className="btn btn-neutral mt-3  hover:text-cyan-700 tramsition ease-in-out duration-600 ">Send OTP</button>
                
                </fieldset>
                <div className="flex flex-row justify-between">
                <Link className="text-left mt-3 text-green-500 hover:text-green-700" to="/login">Login by email </Link>
                <Link className="text-left mt-3 text-cyan-500 hover:text-cyan-700" to="/signUp">Don`t have an account ?</Link>
                </div>
                </div>
                </div>
            </div>
            </div>
            </form>
            </div>
               
           </>
    );
};

export default LoginByPhone;
