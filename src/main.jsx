// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'
// import store from "../store/store.js";
// import { Provider } from "react-redux";

// createRoot(document.getElementById('root')).render(
//   <Provider store={store}>
//   <StrictMode>
//     <App />
//   </StrictMode>
//   </Provider>,
// )



import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import store from "../store/store.js";
import { Provider } from "react-redux";

console.log("Backend API URL:", import.meta.env.VITE_API_BASE_URL); // Debugging

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <StrictMode>
    <App />
  </StrictMode>
  </Provider>,
)
