import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import TuneIcon from '@mui/icons-material/Tune';
import HistoryTiles from './HistoryTiles';
import {useDispatch, useSelector} from 'react-redux';
import { useEffect, useState } from 'react';
import { addBalanceAction, getPaymentHistoryAction } from '../../slices/paymentSlice';
import { toast } from 'react-toastify';
const BAndHContent = () => {
    const {user}=useSelector((state)=>state.userReducer);
    const [checkBalance, setCheckBalance] = useState(false)
    const dispatch=useDispatch();
    const {paymentHistory}=useSelector((state)=>state.paymentReducer);
    useEffect(() => {
        dispatch(getPaymentHistoryAction());
    },[])

    //adding money to wallet

    const {balanceAdded}=useSelector((state)=>state.paymentReducer);
    const money=10
    const handleAddMoney=async()=>{
    
        dispatch(addBalanceAction({ amount: money}));
    }
    useEffect(() => {
        if(balanceAdded){
            toast.success(`₹${money} Added Successfully`);
        }
        
    },[balanceAdded])

    return(
        <>
        <div className="flex flex-col text-white gap-4 overflow-hidden h-screen">
            <div className='flex flex-row justify-around max-sm:text-sm static'>
             <h1 className="font-bold text-2xl ">Payment History</h1>
             {checkBalance ? (
                    <div className=" flex flex-col justify-center  items-center text-center  font-bold text-white">
                        <p className='text-xl'>₹ {user.balance}</p>
                        <p className='text-xs font-thin'>Net Balance</p>
                    </div>
                ) : (
                    <AccountBalanceIcon 
                        className="scale-110 cursor-pointer hover:scale-130 mt-1" 
                        onClick={() => setCheckBalance(prev => !prev)} 
                    />
                )}

            </div>
           
            {/* searchbar bar and filter icon */}
            <div className='flex flex-row justify-around'>
                <label className="input">
                    <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></g></svg>
                    <input type="search" className="grow" placeholder="Search" />
                    <ManageSearchIcon/>
                </label>
                <div className="flex flex-row gap-2 items-center justify-around">
                    <TuneIcon className='scale-130 cursor-pointer hover:scale-150'/>
                    <p className='text-blue-400 text-xs font-bold'>Filter</p>
                </div>
            </div>

            {/* payment history box */}
            <div className='flex flex-col scrollbar-hidden items-center overflow-auto '>

                {paymentHistory && paymentHistory.map((payment) => (
                    <HistoryTiles key={payment._id} payment={payment} />
                ))}
            </div>
            {/* Addmoney withdrawMoney boxes */}
            <div className='flex flex-row justify-between py-2'>
                
                <button onClick={handleAddMoney} className='btn bg-green-500 text-black cursor-pointer hover:bg-green-600'>Add Money</button>
                <button className='btn bg-red-500 text-black cursor-pointer hover:bg-red-600'>Withdraw Money</button>

            </div>

        </div>
        </>
    );
}
export default BAndHContent