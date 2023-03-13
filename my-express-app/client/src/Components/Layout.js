import {React} from "react";
import Navbar from "../Layout/Navbar";

const Layout = ({children}) => {

return (
        <>
            <Navbar> {children} </Navbar>
        </>
    )
}

export default Layout;
