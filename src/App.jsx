import { Bar } from 'react-chartjs-2'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Footer from './compnents/Footer'
import { Navbar } from './compnents/Navbar'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import WelcomePage from './pages/WelcomePage'
import BarChart from './compnents/BarChart'
import CreateDoughnutData from './compnents/CreateDoughnutData'
import { HomePage } from './pages/HomePage'
import ForgetPass from './pages/ForgetPass'
import Settings from './compnents/Settings'
import PanelSectionCard from './compnents/PanelSectionCard'

function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<WelcomePage />} />
          <Route exact path="/login" element={<LoginPage/> } />
          <Route exact path="/sign-up" element={ <SignUpPage/>} />
          <Route exact path="/home" element={  <HomePage />} />
          <Route exact path="/forget-password" element={<ForgetPass/>} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
