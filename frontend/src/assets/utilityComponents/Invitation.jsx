import React, { useEffect } from 'react';
import SignUp from '../../components/User/SignUp';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setInvite } from '../../slices/authSlice';

const Invitation = () => {
  const { id } = useParams(); // Extract 'id' from URL
//const {invite_data}=useSelector(state=>state.auth)
const dispatch = useDispatch();
useEffect(() => {
  dispatch(setInvite(id)); // Dispatch action to update Redux store
}, [id, dispatch]);
  return (
    <>
      <SignUp  />
    </>
  );
};
export default Invitation;
