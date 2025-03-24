import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import MessageIcon from '@mui/icons-material/Message';
const ToggleBars = ({setClick,requestClick}) => {
  return (
    <div className="absolute bottom-2 right-2">
        
        <button
          className="btn btn-info hover:bg-cyan-950 bg-cyan-700 text-white border-none rounded-2xl text-xs"
          onClick={() => setClick(!requestClick)}
        >
          {requestClick ? (
            <>
              Messages <MessageIcon />
            </>
          ) : (
            <>
              Requests <KeyboardDoubleArrowDownIcon />
            </>
          )}
        </button>

    </div>
  );
};

export default ToggleBars;
