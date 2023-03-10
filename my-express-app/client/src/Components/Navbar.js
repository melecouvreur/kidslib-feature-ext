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

    return(
        <div className="flex-row" >
            <h1 className="text-center">My Library App</h1>
        <nav className="navbar nav-masthead">
       
        <div className="mt-4 align-self-center">
              <button 
              className="btn btn-warning"
              onClick={logout}
              >
              <h5> Logout </h5>
              </button>
        </div>

        <div className="mt-4 align-self-center">
        <NavLink to="/private">
          <button className="btn btn-warning">
            <h5>Home</h5>
          </button>
        </NavLink>
        </div>

        <div className="mt-4 align-self-center">
         <NavLink to="myLibrary">
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
