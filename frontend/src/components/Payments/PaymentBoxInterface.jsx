import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { useState } from 'react';

const PaymentBoxInterface=({clickedFunction})=>{
    const [amount,setAmount]=useState(null)
 return(
    <>  
     <div className="flex flex-col space-y-3 text-sm ">
        <div className="flex flex-row justify-around items-center gap-3 w-full">
          <div className="flex flex-col items-center space-y-2">
            <input 
                type="Number"
                value={amount}
                onChange={(e)=>setAmount(e.target.value)}
                className={`ring-2 ${amount ? "ring-[#cb7936]" : "ring-[#E7AC36]"} border border-gray-400 text-white rounded px-2 py-1 font-Poppins focus:outline-none appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-moz-appearance:textfield]`}

                placeholder="Enter Amount..."
            />
          </div>
          
            <TaskAltIcon onClick={()=>clickedFunction(amount)} className="text-[#F7AE1E] text-5xl transition duration-300 hover:text-[#F69213] cursor-pointer scale-130" />
          
        </div>
    </div>
    </>
);
}
export default PaymentBoxInterface