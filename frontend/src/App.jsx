import { Route,Routes,BrowserRouter} from 'react-router-dom'
import LoginByPhone from './components/LoginByPhone'
import ConfirmOTP from './components/ConfirmOTP'
import Home from './components/Home'



function App() {
  

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route exact path='/loginByPhone' element={<LoginByPhone/>}/>
        <Route exact path='/confirmOTP' element={<ConfirmOTP/>}/>
      
      </Routes>
    </BrowserRouter>
     
    </>
  )
}

export default App
