import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const PaymentSuccess = () => {
    const { refId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/home');
        }, 10000);
        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="flex flex-col items-center justify-center h-screen text-white p-6">
            <h1 className="text-4xl font-bold mb-4" style={{ color: '#f457a8' }}>Payment Successful!</h1>
            <p className="text-lg mb-2">Your payment was completed successfully.</p>
            <div className="p-4 border-2 border-cyan-600 rounded-xl shadow-lg">
                <span className="text-xl font-medium" style={{ color: '#f43098' }}>Payment Reference ID:</span>
                <span className="text-xl ml-2" style={{ color: 'rgb(247,174,30)' }}>{refId}</span>
            </div>
            <p className="mt-4 text-sm text-gray-300">You will be redirected to the homepage in 10 seconds.</p>
        </div>
    );
};

export default PaymentSuccess;