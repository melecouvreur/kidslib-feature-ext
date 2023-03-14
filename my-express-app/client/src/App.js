import {React, useState} from "react";
import Home from "./Pages/Home";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MyLibraryView from "./Pages/MyLibraryView";
import BookDetailView from "./Pages/BookDetailView";
import DashBoard from "./Pages/DashBoard";
import PrivateRoute from "./Components/PrivateRoute";


function App() {

//NB- paths of Home, MyLibraryView, BookDetail pages are "/private", "/private/myLibrary", "/private/myLibrary/:id"
//but because nested, you need to remove "/private". Idem for NavLink paths on NavBar component
  return (
   <>
  
    <BrowserRouter>

      <Routes>
      <Route path="/" element={<DashBoard/>} />
      <Route path="/private" element={<PrivateRoute/> }>
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
