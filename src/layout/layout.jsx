import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet, useLocation } from "react-router-dom";

function Layout () {
    const location = useLocation();
    const HideNavbar = ['/login', '/register'];
    const CheckisNavbarHidden = HideNavbar.includes(location.pathname);

    return (
        <>
        {!CheckisNavbarHidden && <Navbar />}
        <main>
            <Outlet />
        </main>
        <Footer />
        </>
    )

}

export default Layout