import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { useContext, useState } from "react";
import { SidebarContext } from "../../Context/SideBarContext";
import bhimIcon from "/images/bhimIcon.png";
import SecureIcon from "@mui/icons-material/VerifiedUser";
import NumberToWords from "../../assets/utilityComponents/NumberToWords";
import TitleData from "../../assets/utilityComponents/TitleData";
const PaymentBoxInterface = ({ clickedFunction }) => {
  const [amount, setAmount] = useState(null);
  const { Userselected } = useContext(SidebarContext);
  const [hasText, setHasText] = useState(false);
  return (
    <>
       <TitleData data={"Payment"}/>
      <div className="flex flex-col ">
        <div className="flex flex-col space-y-2 text-sm text-white ">
            <div className="flex flex-row gap-3 justify-start items-center max-sm:flex-col max-sm:justify-center">
              <div className=" mt-1 ring-1 ring-[rgb(247,174,30)] relative w-10 h-10 rounded-full overflow-hidden flex justify-center items-center   cursor-pointer">
                <img
                  src={
                    Userselected.avatar.url ||
                    "https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg"
                  }
                  alt="Profile"
                  className="w-10 h-10  object-cover transition duration-300 group-hover:scale-110 "
                />
              </div>
              <p className="font-bold ">{Userselected.firstname}</p>
            </div>
          <div className="flex flex-row justify-start max-sm:flex-col max-sm-:justify-center max-sm:items-center">
            <p>To:</p>
            <img className="w-4 mx-2" src={bhimIcon} />
            <div className="flex flex-row max-sm:text-xs max-sm:flex-col">
              <p >{Userselected.phoneNumber}</p>
              <p>@minglePay</p>
            </div>
          </div>
          <div className="divider divider-default mt-0"></div>


            <div className="flex flex-col justify-around items-center gap-1 w-full">
            
                <div className="ml-9 flex items-center justify-center text-white font-bold text-2xl">
                  <span className="mr-1">₹</span>
                  <input
                    type="Number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="bg-transparent text-white font-Poppins focus:outline-none w-30 text-xl font-bold appearance-none 
                              [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none 
                              [&::-moz-appearance:textfield]"
                    placeholder="Amount"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        clickedFunction(amount);
                      }
                    }}
                  />
                </div>

                <p className="text-center justify-center">{ amount && !isNaN(amount) && <NumberToWords number={amount} />}</p>
                <div
                className={`flex items-center bg-transparent text-white font-Poppins focus:outline-none w-30 appearance-none text-sm px-2 py-1 
                  ${hasText ? "border border-gray-400 rounded-md" : ""}`}
                >
                <input
                  type="text"
                  className="bg-transparent text-gray-200 font-medium focus:outline-none w-full placeholder-gray-400 px-1 py-1"
                  placeholder="Add Message"
                  onChange={(e) => setHasText(e.target.value.length > 0)}
                />
              </div>

                  
                

                 <div className="flex items-center justify-start gap-4 px-4 py-2 bg-transparent max-sm:flex-col max-sm:scale-70">
                  <button
                    onClick={() => clickedFunction(amount)}
                    className="btn flex items-center gap-2 px-5 py-2 text-green-700 text-sm font-medium border border-green-700 
                              rounded-full transition duration-300 hover:text-green-800 hover:border-green-800 cursor-pointer"
                  >
                    <SecureIcon className="text-green-700 text-sm transition duration-300 hover:text-green-800 cursor-pointer" />
                    Proceed Securely
                  </button>
                </div>

                              
            </div>
          </div>
        </div>

        
        
    </>
  );
};
export default PaymentBoxInterface;
