import PaymentsIcon from '@mui/icons-material/Payments';
import axios from 'axios';
import { useEffect,useState } from 'react';
import { useSelector } from 'react-redux';
import Spinner from "../../assets/utilityComponents/Spinner"
const HistoryTiles = ({payment}) => {
    const { user } = useSelector((state) => state.userReducer);
    const sent = user._id === payment.senderId;

    const [receiver, setReceiver] = useState(""); 
    const amount = payment.amount;
    const d = new Date(payment.createdAt);
    const h = d.getUTCHours() % 12 || 12;
    const m = d.getUTCMinutes().toString().padStart(2, '0');
    const ampm = d.getUTCHours() >= 12 ? 'PM' : 'AM';
    const date = `${d.getUTCDate().toString().padStart(2, '0')}-${(d.getUTCMonth()+1).toString().padStart(2, '0')}-${d.getUTCFullYear()} ${h.toString().padStart(2, '0')}:${m} ${ampm}`;

   


    useEffect(() => {
        const getData = async () => {
        const otherUser = sent ? payment.receiverId : payment.senderId;
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/userDetailsById/${otherUser}`);
            // console.log(data)
            setReceiver(data.firstname + ' ' + data.lastname); // THIS IS UNDEFINED .. ISSUE !!!
        } catch (err) {
            console.error("Failed to fetch user", err);
        }
        };

        getData(); // ✅ call the function
    }, [receiver]);

    return(
        
            <>
        
        <div className="mr-20 flex flex-row gap-5 max-sm-gap-0 max-md:gap-1  max-sm:mr-0 max-md:mr-10">
            <img className=" mt-1 p-2 w-10 h-10 rounded-full ring-1 ring-white-400" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" alt="" />

            <div className="flex flex-col gap-2">
            
                {/* payment details */}
                <div className="flex flex-row">
                    <div className="flex flex-col">
                        <div className="flex flex-row justify-between gap-18 max-md:flex-col max-md:gap-2 max-sm:flex-col max-sm:gap-2">
                            <p className="font-bold">{receiver}</p>
                            <p className={` ${sent ? "text-red-600" : "text-green-600"}`}>{sent ? `-₹${amount}` : `₹${amount}`}</p>
                        </div>
                        <span className="text-xs">Paid on {date}</span>
                    </div>
                </div>
            
                {/* purpose of payment  */}
                <div className="flex flex-row border border-success bg-green-500 w-fit px-2 rounded-xl items-center">
                    <PaymentsIcon className='text-black scale-70'/>
                    <p className="max-sm:hidden text-xs text-black text-center font-bold">Transfers</p>
                </div>


                <div className="divider"></div>
            </div>
        </div>
        
        </>
        
        
    );
}

export default HistoryTiles