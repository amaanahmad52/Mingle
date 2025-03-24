import { Typography } from "@mui/material"

const RequestsBar=()=>{
   return(
   <>
    <div className="flex flex-col items-center gap-2 justify-center w-full h-full mb-25">
        <img className="w-20 h-20 object-contain" src="https://www.iconpacks.net/icons/2/free-facebook-messenger-icon-2880-thumb.png" alt="" />
        <h1 className="text-center text-white text-xl font-extrabold">No Message Requests</h1>
        <p className="ml-15 mr-15 text-xs text-center text-gray-400">You don't have any message requests.</p>
    </div>
    </>
   );
}

export default RequestsBar