// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

import { store } from './store'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import { SidebarProvider } from './Context/SideBarContext'
import {MessageProvider} from './Context/MessageContext'
createRoot(document.getElementById('root')).render(
  <MessageProvider>
  <SidebarProvider>
  <Provider store={store}>
      <App />
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        />
  </Provider>
  </SidebarProvider>
  </MessageProvider>
  
)
