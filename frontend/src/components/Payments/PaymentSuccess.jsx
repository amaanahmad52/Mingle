import { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Explosion from '../../assets/utilityComponents/Explosion';
import { SidebarContext } from '../../Context/SideBarContext';

const PaymentSuccess = () => {
    const { paymentId } = useParams();
    const navigate = useNavigate();
    const [time, setTime] = useState(10);
    const{setUserSelected}=useContext(SidebarContext)
    useEffect(() => {
        const interval = setInterval(() => {
            setTime((prevTime) => prevTime - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if(time==10){
            setExpload(true)
        }
        if (time === 0) {
            navigate('/home');
            setUserSelected(JSON.parse(receiver))
        }
    }, [time, navigate]);

    // Random colors array
    const colors = [
        'rgb(255, 99, 71)',    // Tomato
        'rgb(135, 206, 235)',  // Sky Blue
        'rgb(50, 205, 50)',    // Lime Green
        'rgb(255, 165, 0)',    // Orange
        // 'rgb(75, 0, 130)',     // Indigo
        'rgb(255, 20, 147)',   // Deep Pink
        'rgb(0, 255, 255)',    // Cyan
        'rgb(173, 216, 230)',  // Light Blue
        'rgb(255, 215, 0)',    // Gold
        'rgb(139, 0, 139)',    // Dark Magenta
    ];

    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    //for exploader
    const[expload,setExpload]=useState(false)

    //after sucees 

    const receiver=localStorage.getItem('receiver')
    console.log(JSON.parse(receiver))


    return (
        <div className="flex flex-col items-center justify-center h-screen text-white p-6">
            <Explosion isExploding={expload}/>
            <h1 className="text-4xl font-bold mb-4" style={{ color: 'rgb(247,174,30)' }}>
                Payment Successful!
            </h1>
            <p className="text-lg mb-2">Your payment was completed successfully.</p>
            <div className="gap-1 flex flex-col items-center justify-center p-4 border-2 border-cyan-600 rounded-xl shadow-lg">
                <span className="text-xl font-medium" style={{ color: 'rgb(247,174,30)' }}>
                    Payment Reference ID:
                </span>
                <span className="text-sm ml-2" style={{ color: 'rgb(247,174,30)' }}>
                    {paymentId}
                </span>
            </div>

            <div className='mt-4 flex flex-row items-center gap-2 justify-between'>
                <p className="text-sm text-gray-300">You will be redirected to the homepage in</p>
                <div className=" inline-flex items-center justify-center w-7 h-7 ring-2 ring-[rgb(247,174,30)] rounded-full px-2 py-1 text-blink" style={{ color: randomColor, fontWeight: 'bold', fontSize: '20px' }}>
                    {time}
                </div> 
                <p className='text-sm text-gray-300'>seconds.</p>
            </div>
           
        </div>
    );
};

export default PaymentSuccess;
