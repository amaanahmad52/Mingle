import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Popover from '@mui/material/Popover';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Backdrop from '@mui/material/Backdrop';
import { Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setMessages, clearMessagesAction ,getAllMessagesAction} from '../../slices/MessagesSlice';
import { toast } from 'react-toastify';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

const options = ['Select Messages', 'Clear Chat', 'User Profile'];

export default function ThreeDotMenu({ id }) {
  const [reference, setReference] = React.useState(null);
  const [openModal, setOpenModal] = React.useState(false);
  const open = Boolean(reference);
  const dispatch = useDispatch();

  const handleClick = (event) => setReference(event.currentTarget);
  const handleClose = () => setReference(null);
  
  const handleOptionClick = (option) => {
    if (option === 'Clear Chat') {
      if (id) {
        setOpenModal(true);
      } else {
        toast.error('Select a chat to clear');
      }
    }
    handleClose();
  };

  // React.useEffect(() => {
  //   dispatch(getAllMessagesAction({receiverId:id}));

  // }, [openModal]);
  const handleConfirmClearChat = () => {
    //we can also render by using useeffect and modal open state ,but here i used redux state and set to []
   dispatch(setMessages([]));
    dispatch(clearMessagesAction({ receiverId: id }));
  
    setOpenModal(false);
  };

  return (
    <div className="flex">
      <IconButton onClick={handleClick}>
        <MoreVertIcon sx={{ color: 'white', scale: 1.2, cursor: 'pointer', '&:hover': { color: 'cyan' } }} />
      </IconButton>

      {/* Backdrop */}
      <Backdrop
        open={open}
        onClick={handleClose}
        sx={{ zIndex: (theme) => theme.zIndex.drawer - 1, backgroundColor: 'rgba(0,0,0,0.5)' }}
      />

      {/* Popover */}
      <Popover
        open={open}
        anchorEl={reference}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{
          mt: 2,
          zIndex: (theme) => theme.zIndex.drawer + 1,
          '& .MuiPaper-root': {
            backgroundColor: 'transparent',
            boxShadow: 'none',
            backdropFilter: 'blur(10px)',
            borderRadius: '12px',
            padding: '5px',
          },
        }}
      >
        <List>
          {options.map((option) => (
            <ListItem disablePadding key={option}>
              <ListItemButton onClick={() => handleOptionClick(option)}>
                <ListItemText
                  primary={<Typography sx={{ color: 'rgb(247,174,30)', ':hover': { color: 'rgb(246,146,19)' }, fontSize: '17px' }}>{option}</Typography>}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Popover>

      {/* Confirmation Modal */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)}    sx={{
        '& .MuiPaper-root': {
          background: 'rgba(255, 255, 255, 0.2)', // Glassy effect
          backdropFilter: 'blur(10px)', // Blur effect
          borderRadius: '12px',
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
        },
      }}>
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <WarningAmberIcon sx={{ color: 'red' }} /> Are you sure?
        </DialogTitle>
        <DialogContent>
          <Typography>Do you really want to clear the chat?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)} color="rgb(247,174,30)" variant="outlined">No</Button>
          <Button onClick={handleConfirmClearChat}  variant="contained"   sx={{
            backgroundColor: 'cyan.600',
            '&:hover': { backgroundColor: 'cyan.700' },
            color: 'white',
          }}>Yes</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
