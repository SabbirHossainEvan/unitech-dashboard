// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import { RouterProvider } from 'react-router'
// import router from './routers/router.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <RouterProvider router={router}></RouterProvider>
//   </StrictMode>,
// )


import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx' // Note: This App import is currently unused, but harmless.
import { RouterProvider } from 'react-router-dom' // <-- FIXED IMPORT
import router from './routers/router.jsx' // Assuming your router file is here

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
)