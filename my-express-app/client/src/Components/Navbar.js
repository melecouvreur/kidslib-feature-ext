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
        <>
        <nav>
            <h5> navbar </h5>
        <div className="mt-4">
              <button 
              className="btn btn-warning"
              onClick={logout}
              >
              <h5> Logout </h5>
              </button>
        </div>

        <NavLink to="/private">
          <button className="btn btn-warning">
            <h5>Home</h5>
          </button>
        </NavLink>

         <NavLink to="myLibrary">
          <button className="btn btn-warning">
            <h5>My Library</h5>
          </button>
        </NavLink>
        </nav>
        </>
    )
}

export default Navbar;
