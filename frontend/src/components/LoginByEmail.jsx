import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { LoginByEmailAction } from "../slices/UserSlices";

const LoginByEmail = () => {
    const dispatch = useDispatch();
    const nav = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setpassword] = useState('');
    
    const { successP } = useSelector(state => state.userReducer);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(LoginByEmailAction({email,password}));
    };

    useEffect(() => {
        if (successP) {
            // window.localStorage.setItem('phoneNumber', phoneNumber);
            nav('/Home');
            toast.success(":Login successfuly");
        }
    }, [successP, nav, email]);

    return (
            <>
            <div>
            <form onSubmit={handleSubmit}>
                <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-row w-full min-h-96">
                <div className="card bg-base-100 w-full min-h-90 max-w-sm shrink-0 shadow-2xl ">
                <div className="card-body justify-center">
                <h1 className="text-3xl font-bold text-center ">Login</h1>
                <fieldset className="fieldset">
                <label className="fieldset-label">Email</label>
                <input type="text" className="w-full input" placeholder="email" value={email}  onChange={(e) => setEmail(e.target.value)} />
                <input type="Password" className="w-full input" placeholder="password" value={password}  onChange={(e) => setpassword(e.target.value)} />
                <button className="btn btn-neutral mt-3  hover:text-black-700 ">Login</button>
                <Link className="text-left mt-3 text-blue-500 hover:text-blue-700" to="/signUp">Don`t have an account ?</Link>
                </fieldset>
                </div>
                </div>
            </div>
            </div>
            </form>
            </div>
               
           </>
    );
};

export default LoginByEmail;
