import React, { useContext, useState } from "react";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { SidebarContext } from "../../Context/SideBarContext";
import PaymentBoxInterface from "./PaymentBoxInterface";
import axios from "axios";
import { useSelector } from "react-redux";

const URL = import.meta.env.VITE_BACKEND_URL;

const PaymentBox = () => {
  const [openImageModal, setOpenImageModal] = useState(false);
  const {Userselected}=useContext(SidebarContext)
  const {user}=useSelector((state)=>state.userReducer)

  const handlePayment=async(amount)=>{
    if(amount<1){
      alert("Amount should be greater than 0")
      return
    }
    const { data } = await axios.post(
        `${URL}/createOrder`,
        {amount},
        { withCredentials: true, headers: { "Content-Type": "application/json" } }
    );
    const order_id=data.order.id
    
    // console.log(typeof(amount))
    localStorage.setItem('receiver', JSON.stringify(Userselected));
    console.log((localStorage.getItem('receiver')));
    //callback for payment verification
    //get key
    const { data: key } = await axios.get(
        `${URL}/getKey`,
        { withCredentials: true, headers: { "Content-Type": "application/json" } }
    )
      const options = {
        key: key, 
        amount: amount*100, 
        currency: "INR",
        name: "Mingle Corporation",
        description: `{You are sending ₹${amount} to ${Userselected.name}}`,
        image: Userselected.avatar.url,
        order_id: order_id, 
        callback_url: `${URL}verifyPayment/${Userselected._id}?amount=${amount}`,
        prefill: {
           name: user.name,
            email: user.email,
            contact: user.phoneNumber
        },
        notes: {
            "address": "Mingle Corporate Office"
        },
        theme: {
            "color": "#F69213"
        }
    };
    const razor = new window.Razorpay(options);
  
    razor.open();
  }
  return (
    <>
      <div
        className="group transition duration-150 ease-in-out hover:scale-110 cursor-pointer"
        onClick={() => setOpenImageModal(true)}
      >
        <CurrencyRupeeIcon className="text-green-700"/>
        <span className="absolute bottom-0 right-7 translate-x-3 w-max bg-transparent font-Poppins font-bold text-green-700 text-sm rounded-lg px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
          Pay
        </span>
      </div>




      {/* Modal for opening paymet options */}
      <Dialog
        open={openImageModal}
        onClose={() => setOpenImageModal(false)}
        maxWidth="xs"
        sx={{
          "& .MuiPaper-root": {
            background: "transparent",
            backdropFilter: "blur(10px)",
            borderRadius: "12px",
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.9)",
            //make size large
            width: "30%",
            height: "70%",
          },
        }}
      >
        <DialogContent className="p-0">
          <div className="flex justify-center items-center w-full h-full ">
           <PaymentBoxInterface clickedFunction={handlePayment}/>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PaymentBox;
