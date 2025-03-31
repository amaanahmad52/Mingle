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
                className={`ring-2 ${amount ? "ring-green-700" : "ring-green-900"} border border-gray-400 text-white rounded px-2 py-1 font-Poppins focus:outline-none appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-moz-appearance:textfield]`}

                placeholder="Enter Amount..."
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                      clickedFunction(amount);
                  }
              }}
            />
          </div>
          
          <TaskAltIcon onClick={()=>clickedFunction(amount)} className="text-green-700 text-5xl transition duration-300 hover:text-green-800 cursor-pointer scale-130" />
          
        </div>
    </div>
    </>
);
}
export default PaymentBoxInterface