import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet, useLocation } from "react-router-dom";

function Layout () {
    const location = useLocation();
    const HideNavbar = ['/login', '/register', '/checkout'];
    const HideFooter = ['/checkout'];
    const checkisFooterHidden = HideBoth.includes(location.pathname);
    const checkisNavbarHidden = HideBoth.includes(location.pathname);

    return (
        <>
        {!CheckisNavbarHidden && <Navbar />}
        <main>
            <Outlet />
        </main>
        {!CheckisCheckisFooterHidden && <Footer />}
        </>
    )

}

export default Layout
