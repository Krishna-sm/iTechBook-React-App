import React from 'react'
import About from './components/About';
import Home from './components/Home';
import NavBar from './components/NavBar';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
const App = () => {

  
  return (
    <>
    <BrowserRouter>
    <NavBar/>
    <Alert />
   <div className="container my-5">
   <Routes>
      <Route path='/' element={<Home/>}  />
      <Route path='/about' element={<About/>}  />
      <Route path='/login' element={<Login/>}  />
      <Route path='/signup' element={<Signup/>}  />
    </Routes>
   </div>
    </BrowserRouter>
    </>
  )
}

export default App