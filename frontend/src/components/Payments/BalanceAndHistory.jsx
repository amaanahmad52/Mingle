import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import React, { useState } from "react";
import { motion } from "framer-motion";
import FlipCard from '../../assets/utilityComponents/FlipCard';
import { PaymentCardBack, PaymentCardFront } from '../DashboardBar/PaymentCard';
import { Dialog, DialogContent } from '@mui/material';
import BAndHContent from './B&HContent';
const BalanceAndHistory = () => {
    const [openModal, setOpenModal] = useState(false);

    const handleModal = () => {
        // alert("hi")
        setOpenModal(true)
    }

    return (
       <>
       <FlipCard front={<PaymentCardFront/>} back={<PaymentCardBack handlePayment={handleModal} />} />

       {/* Modal for Payment History Window */}
             <Dialog
               open={openModal}
               onClose={() => setOpenModal(false)}
               maxWidth="xl"
               sx={{
                   "& .MuiPaper-root": {
                     background: "transparent",
                     backdropFilter: "blur(10px)",
                     borderRadius: "12px",
                     boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.9)",
                     //make size large
                     width: "35%",
                     height: "100%",
                   },
                 }}
             >
               <DialogContent className="p-0">
                <BAndHContent/>
               </DialogContent>
             </Dialog>
       </>
    );
}

export default BalanceAndHistory;
