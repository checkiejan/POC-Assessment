
// import NavBar from "./NavBar";
import {Outlet} from "react-router-dom";
// This component serves as a layout wrapper for the application, 
// including the NavBar at the top and an Outlet to render child routes.
function Layout() {
    return (
        <>
            {/* Outlet is a placeholder where the child routes will be rendered */}
            <Outlet />
        </>
    );
}

// Export the Layout component for use in other parts of the application
export default Layout;