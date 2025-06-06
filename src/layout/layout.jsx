import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet, useLocation } from "react-router-dom";

function Layout () {
    const location = useLocation();
    const HideNavbar = ['/login', '/register', '/checkout'];
    const HideFooter = ['/checkout'];
    const CheckisFooterHidden = HideFooter.includes(location.pathname);
    const CheckisNavbarHidden = HideNavbar.includes(location.pathname);

    return (
        <>
        {!CheckisNavbarHidden && <Navbar />}
        <main>
            <Outlet />
        </main>
        {!CheckisFooterHidden && <Footer />}
        </>
    )

}

export default Layout
