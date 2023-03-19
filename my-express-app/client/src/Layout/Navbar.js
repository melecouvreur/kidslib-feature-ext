import {React, useState} from "react";
import { NavLink} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../Components/mylibrary.css";

//re-usable component replicated across pages nested in PrivateRoute

function Navbar() {

const navigate = useNavigate();
const [isLoggedIn, setIsLoggedIn] = useState(true)

const logout = () => {
        localStorage.removeItem("token")
        setIsLoggedIn(false)
        navigate("/")
        console.log("logged out")
      };
    
    let activeClassName = "btn btn-warning"

    return(
        <div className="flex-row" >
      
       <div>

          <nav className="navbar nav-masthead">
        <div className="px-4"> 
        <NavLink to="/" end
        id="navbar"
        className={({isActive}) => 
        isActive ? activeClassName : undefined }>
              <button 
              className="btn"
              onClick={logout}
              >
              <h5> Logout </h5>
              </button> 
            </NavLink>
        </div>

        <div className="px-4"> 
        <NavLink to="/userlibrary" end
        id="navbar"
        className={({isActive}) => 
        isActive ? activeClassName : undefined }>
              <button 
              className="btn"
              >
              <h5> User Library </h5>
              </button> 
            </NavLink>
        </div>

        <div className="px-2">
        <NavLink 
        to="/private" end
        id="navbar"
        className={({isActive}) => 
        isActive ? activeClassName : undefined }>
          <button className="btn">
            <h5>Home</h5>
          </button>
        </NavLink>
        </div>

        <div className="px-4">
         <NavLink 
         id="navbar"
         to="myLibrary"
         className={({isActive}) => 
         isActive ? activeClassName : undefined }>
          <button className="btn">
            <h5>My Library</h5>
          </button>
        </NavLink>
        </div>
        </nav> 
        </div>


       
        </div>
    )
}

export default Navbar;
