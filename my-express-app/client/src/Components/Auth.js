import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Auth() {
  const [isRegistered, setIsRegistered] = useState(true)
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
  });
 
 const [isLoggenIn, setIsLoggedIn] = useState(false)
 const [error, setError] = useState("");
 const [message, setMessage] = useState("");

 const navigate = useNavigate();


  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  }; 

  const changeRegistered = () => {
    setIsRegistered(isRegistered === true ? false : true)
    console.log(isRegistered)
  }

  const login = async () => {
    try {
        let options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
          };
      const result = await fetch("/users/login", options);
      const data  = await result.json();
      if (!result.ok) 
      setError(data.error);
      else {
      localStorage.setItem("token", data.token)
      //setIsLoggedIn(true);
      navigate("/private/home")
      console.log(data.message, data.token)
      }
     }
     catch (err) {
      console.log(err)
    }
  };

  const register = async () => {
    try {
        let options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
          };
      const result = await fetch("/users/register", options);
      const data  = await result.json();
      if (!result.ok) 
      setError(data.error);
      else {
      console.log(data.message)
      changeRegistered()
      //navigate("/home")
      }
     }
     catch (err) {
      console.log(err)
    }
  };




  return (
    <div className="d-flex p-4 justify-content-center text-left">

      {!isRegistered ? 
      (
      <div className="align-self-center p-4">
        <h3> Register </h3>

       
        <label> Username </label>
        <input
          value={credentials.username}
          onChange={handleChange}
          name="username"
          type="text"
          className="form-control mb-2"
        />
       
       <label> Email </label>
       <input
          value={credentials.email}
          onChange={handleChange}
          name="email"
          type="email"
          className="form-control mb-2"
        />

        <label> Password </label>
        <input
          value={credentials.password}
          onChange={handleChange}
          name="password"
          type="password"
          className="form-control mb-2"
        />
        <button className=" btn btn-primary" onClick={register}>
          Register
        </button>

        <p> Already have an account? </p>
        <button 
        className=" btn btn-primary"
        onClick={changeRegistered} >
        Login
        </button>
    
      </div> ) : 
      (
      <div className="align-self-center p-4">
      <h3> Sign- in </h3>
      <div>
        <label> Username </label>
        <input
          value={credentials.username}
          onChange={handleChange}
          name="username"
          type="text"
          className="form-control mb-2"
        />
         <label> Password </label>
        <input
          value={credentials.password}
          onChange={handleChange}
          name="password"
          type="password"
          className="form-control mb-2"
        />
         <button className="btn btn-outline-dark ml-2" onClick={login}>
          Log in
        </button>

        <p> Don't have an account? </p>
        <button 
        className="btn btn-primary"
        onClick={changeRegistered} >
        Register
        </button>
      </div> 

      {/*<div className="text-center p-4">
        <button className=" btn btn-outline-primary" onClick={requestData}>
          Request protected data
        </button>
      </div> */}

      </div>
      )}
    
    </div>
  );
}

export default Auth;
