import { useDispatch,useSelector} from 'react-redux'
import { useEffect } from 'react'
import { Route,Routes,BrowserRouter} from 'react-router-dom'
import { toast } from 'react-toastify'
import Home from './components/Home'
import LoginByPhone from './components/User/LoginByPhone'
import ConfirmOTP from './components/User/ConfirmOTP'
import LoginByEmail from './components/User/LoginByEmail'
import { getUserDetailsAction } from './slices/UserSlices'
import SignUp from './components/User/SignUp'
import Verify_Email_on_Signup from './components/User/Verify_Email_on_Signup'
// import ProtectedRoute from '../protectedRoute'

import SignUp from './components/SignUp'

import VerifyEmail from './components/verifyEmail'
import LoginByEmail from './components/LoginBYEmail'
import './index.css'
function App() {
  
  const dispatch = useDispatch();
  const {successDetails}=useSelector(state => state.userReducer);

  useEffect(() => {

    dispatch(getUserDetailsAction())
  }, [successDetails]);

  return (
    <>
    <BrowserRouter>
      <Routes>

       
       
        <Route exact path='/' element={<Home/>}/>
        <Route exact path='/login' element={<LoginByEmail/>}/>
        <Route exact path='/loginByPhone' element={<LoginByPhone/>}/>
        <Route exact path='/signUp' element={<SignUp/>}/>
        <Route exact path='/verify-email' element={<VerifyEmail/>}/>
        <Route exact path='/loginByEmail' element={<LoginByEmail/>}/>

        <Route exact path='/confirmOTP' element={<ConfirmOTP/>}/>
        <Route exact path='/signUp' element={<SignUp/>}/>
        <Route exact path='/verify-email' element={<Verify_Email_on_Signup/>}/>

        {/* conditional routing */}
        {/* <Route element={<ProtectedRoute/>}> */}
        <Route exact path='/home' element={<Home/>}/>
        {/* </Route> */}

      
      </Routes>
    </BrowserRouter>
     
    </>
  )
}

export default App
