import { Link, Outlet } from "react-router";
import Logo from "../comps/shared/Logo";
import AuthImage from '../assets/authImage.png';

export default function AuthLayout() {
    return (
        <main className="flex flex-col-reverse md:flex-row">
            <header className="fixed top-4 left-4 md:top-10 md:left-20">
                <Link to='/'><Logo /></Link>
            </header>
            <section className="flex-1 p-4 flex justify-center items-center">
                <section className="shrink-0 w-full max-w-xs lg:max-w-sm">
                    <Outlet />
                </section>
            </section>
            <section className="flex-1 bg-[#FAFDF0] flex justify-center items-center">
                <img src={AuthImage} alt="Auth Image" />
            </section>
        </main>
    );
}