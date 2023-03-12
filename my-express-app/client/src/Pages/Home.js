import React from "react";
import Search from "../Components/Search";
import MyLibraryWidget from "../Components/MyLibraryWidget";
import Navbar from "../Components/Navbar";

function Home() {
  return (
    <div className="App">
        {/*<Navbar/>*/}
      <MyLibraryWidget />
      <Search />
    </div>
  )
}
export default Home;
