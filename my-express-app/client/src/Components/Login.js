import React, { useState } from "react";

function Login() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

 const [error, setError] = useState("");
 const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  }; 

  const login = async () => {
    try {
        let options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
          };
      const result = await fetch("/users/login", options);
      const data  = await result.json();
      if (!result.ok) setError(data.error);
      else {
      localStorage.setItem("token", data.token)
      console.log(data.message, data.token)
      }
     }
     catch (err) {
      console.log(err)
    }
  };

  const requestData = async () => {
    let options = {
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    };

    try {
      const result = await fetch("/users/private", options);
      const data = await result.json();

      if (!result.ok) setMessage(data.error);
      else setMessage(data.message);

    } catch (error) {
      console.log(error);
    }
  };


  const logout = () => {
    localStorage.removeItem("token")
    console.log("logged out")
  };

  return (
    <div>
      <div>
        <input
          value={credentials.username}
          onChange={handleChange}
          name="username"
          type="text"
          className="form-control mb-2"
        />
        <input
          value={credentials.password}
          onChange={handleChange}
          name="password"
          type="password"
          className="form-control mb-2"
        />
        <button className=" btn btn-primary" onClick={login}>
          Log in
        </button>
        <button className="btn btn-outline-dark ml-2" onClick={logout}>
          Log out
        </button>
      </div>
      <div className="text-center p-4">
        <button className=" btn btn-outline-primary" onClick={requestData}>
          Request protected data
        </button>
      </div>
    </div>
  );
}

export default Login;
