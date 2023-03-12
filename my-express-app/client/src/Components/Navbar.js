import {React, useState} from "react";
import { NavLink} from "react-router-dom";
import { useNavigate } from "react-router-dom";


function Navbar() {

const navigate = useNavigate();
const [isLoggedIn, setIsLoggedIn] = useState(false)

    const logout = () => {
        localStorage.removeItem("token")
        setIsLoggedIn(false)
        navigate("/")
        console.log("logged out")
      };
    
    let activeClassName = "btn btn-sm btn-warning"

    return(
        <div className="flex-row" >
            <h1 className="text-center">My Library App</h1>
        <nav className="navbar nav-masthead">
       
        <div className="px-4"> 
              <button 
              className="btn btn-warning"
              onClick={logout}
              >
              <h5> Logout </h5>
              </button>
        </div>

        <div className="px-2">
        <NavLink 
        to="/private"
        className={({isActive}) => 
        isActive ? activeClassName : undefined }>
          <button className="btn btn-warning">
            <h5>Home</h5>
          </button>
        </NavLink>
        </div>

        <div className="px-4">
         <NavLink 
         to="private/myLibrary"
         className={({isActive}) => 
         isActive ? activeClassName : undefined }>
          <button className="btn btn-warning">
            <h5>My Library</h5>
          </button>
        </NavLink>
        </div>

        
        </nav>
        </div>
    )
}

export default Navbar;
