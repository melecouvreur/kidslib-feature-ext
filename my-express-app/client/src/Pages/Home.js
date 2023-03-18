import React from "react";
import { NavLink} from "react-router-dom";
import Search from "../Components/Search";
import MyLibraryWidget from "../Components/MyLibraryWidget";


function Home() {
  return (
    <div className="App">

      <MyLibraryWidget />
      <Search />
      
    </div>
  )
}
export default Home;
