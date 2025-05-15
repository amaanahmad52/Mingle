// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

import { store } from './store'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import { SidebarProvider } from './Context/SideBarContext'
import {MessageProvider} from './Context/MessageContext'
import { PaymentFilterProvider } from './Context/PaymentFilterContext'
import { SocketProvider } from './Context/SocketContext'
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <SocketProvider>
    <PaymentFilterProvider>
      <MessageProvider>
        <SidebarProvider>
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
        </SidebarProvider>
      </MessageProvider>
    </PaymentFilterProvider>
  </SocketProvider>
</Provider>

  
)
