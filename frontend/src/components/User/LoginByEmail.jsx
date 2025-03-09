import { useState,useEffect } from "react";
import { useNavigate,Link } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import {LoginByEmailAction} from "../../slices/UserSlices";
import { toast } from 'react-toastify';

const LoginByEmail = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const nav = useNavigate();
    const {successO} = useSelector(state => state.userReducer);
    const handleSubmit = (e) => {
        e.preventDefault();
      
        dispatch(LoginByEmailAction({email,password}));
    }

    useEffect(() => {
        if (successO) {
            nav('/home', { replace: true }); 
            toast.success("Login Success");
        }
    },[nav,successO]);
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
                <input type="email" className=" my-2 w-full input selection:bg-cyan-500" placeholder="Email" value={email}  onChange={(e) => setEmail(e.target.value)} />
                <input type="text" className="w-full input selection:bg-cyan-500" placeholder="Password" value={password}  onChange={(e) => setPassword(e.target.value)} />
                <button className="btn btn-neutral mt-3  hover:text-cyan-700 transition ease-in-out duration-600 ">Login</button>
                </fieldset>
                <div className="flex flex-row justify-between">
                <Link className="text-left mt-3 text-green-500 hover:text-green-700" to="/loginByPhone">Login by Phone </Link>
                <Link className="text-left mt-3 text-cyan-500 hover:text-cyan-700" to="/signUp">Don`t have an account ?</Link>
                </div>
                </div>
                </div>
            </div>
            </div>
            </form>
            </div>
               
           </>
    )
}

export default LoginByEmail