import {React, useState} from "react";
import Home from "./Pages/Home";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MyLibraryView from "./Pages/MyLibraryView";
import BookDetailView from "./Pages/BookDetailView";
import DashBoard from "./Pages/DashBoard";
import PrivateRoute from "./Components/PrivateRoute";
import Navbar from "./Components/Navbar";

function App() {

  const [isLoggenIn, setIsLoggedIn] = useState(false)

  return (
   <>
  
    <BrowserRouter>
      {/*<Navbar/>*/}
      <Routes>
        <Route path="/" element={<DashBoard/>} />
        
        <Route path="/private" element={<PrivateRoute/>}>
          <Route path="" element={<Home/>}/>
          <Route path="myLibrary" element={<MyLibraryView />}  />
          <Route path="myLibrary/:id" element={<BookDetailView />}/>
        </Route>

      </Routes>
    </BrowserRouter>
 
    </>
  );
}

export default App;
