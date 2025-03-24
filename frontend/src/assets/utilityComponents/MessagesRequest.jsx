import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
const MessagesRequest = () => {
  return (
    <div className="absolute bottom-2 right-2">
        
      <button className="btn btn-info hover:bg-cyan-950 bg-cyan-700 text-white border-none rounded-2xl  text-xs">
        Requests
        <KeyboardDoubleArrowDownIcon/>
      </button>
    </div>
  );
};

export default MessagesRequest;
