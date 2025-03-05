import { Route,Routes,BrowserRouter} from 'react-router-dom'
import Home from './components/Home'
import LoginByPhone from './components/User/LoginByPhone'
import ConfirmOTP from './components/User/ConfirmOTP'
import LoginByEmail from './components/User/LoginByEmail'

import SignUp from './components/SignUp'

import VerifyEmail from './components/verifyEmail'
import LoginByEmail from './components/LoginBYEmail'
import './index.css'
function App() {
  

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route exact path='/loginByPhone' element={<LoginByPhone/>}/>
        <Route exact path='/signUp' element={<SignUp/>}/>
        <Route exact path='/verify-email' element={<VerifyEmail/>}/>
        <Route exact path='/loginByEmail' element={<LoginByEmail/>}/>

        <Route exact path='/confirmOTP' element={<ConfirmOTP/>}/>
        <Route exact path='/login' element={<LoginByEmail/>}/>
      
      </Routes>
    </BrowserRouter>
     
    </>
  )
}

export default App
