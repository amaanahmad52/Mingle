import { useDispatch,useSelector} from 'react-redux'
import { useEffect } from 'react'
import { Route,Routes,BrowserRouter} from 'react-router-dom'
import { toast } from 'react-toastify'
import Home from './components/Home'
import LoginByPhone from './components/User/LoginByPhone'
import ConfirmOTP from './components/User/ConfirmOTP'
import LoginByEmail from './components/User/LoginByEmail'
import { getUserDetailsAction } from './slices/UserSlices'
// import ProtectedRoute from '../protectedRoute'



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
        <Route exact path='/confirmOTP' element={<ConfirmOTP/>}/>

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
