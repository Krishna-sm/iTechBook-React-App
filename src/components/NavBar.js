import React, { useContext } from 'react'
import { Link,useLocation, useNavigate } from 'react-router-dom'
import NoteContext from '../context/Notes/NoteContext';

const NavBar = () => {
  const location=useLocation();
  const navigate = useNavigate();
  const {user,setUser} =  useContext(NoteContext);
  const logoutHandler=()=>{
      localStorage.removeItem("token");
      navigate('/login');
      setUser({});
  }
  return (
    <>
    <nav className="navbar-expand-lg navbar bg-dark navbar-dark">
  <div className="container-fluid">
    <Link className="navbar-brand" to={"/"}>iTechBook</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0 ml-4">
      
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==='/' ? 'active':''} `} aria-current="page" to={'/'}>Home</Link>
       </li>

      

        <li className="nav-item">
         <Link className={`nav-link ${location.pathname==='/about' ? 'active':''} `} aria-current="page" to={'/about'}>About</Link>
        </li>
       
          <li className="nav-item">
          <span className={`nav-link`} aria-current="page" >
            {user.name}
          </span>
       </li>
       
      </ul>
      <ul>
        
      </ul>
    
      {!localStorage.getItem("token") ?  <><Link to={'/login'} className="btn btn-primary mx-1" type="submit">Login</Link><Link to={'/signup'} className="btn btn-success mx-1" type="submit">Sign Up</Link></> :
      <button onClick={logoutHandler} className="btn btn-primary mx-1">Logout</button>
      }
    
    </div>
  </div>
</nav>

    </>
  )
}

export default NavBar