import { Outlet } from "react-router";
import Footer from "../comps/layouts/Footer";
import Header from "../comps/layouts/Header";

export default function Public(){
    return(
        <>
            <Header />
            <main className="containerr">
                <Outlet />
            </main>
            <Footer />
        </>
    );
}