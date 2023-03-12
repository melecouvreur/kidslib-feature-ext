import {React} from "react";
import Navbar from "./Navbar";

const Layout = ({children}) => {

return (
        <>
            <Navbar> {children} </Navbar>
        </>
    )
}

export default Layout;
