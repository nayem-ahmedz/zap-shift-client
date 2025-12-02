import { Link, NavLink } from "react-router";
import Logo from "../shared/Logo";
import { FaArrowRight } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";

export default function Header() {
    const { user, loading, logoutUser } = useAuth();
    const NavLinks = <>
        <li><NavLink className='text-base' to='/'>Services</NavLink></li>
        <li><NavLink className='text-base' to='/coverage'>Coverage</NavLink></li>
        <li><NavLink className='text-base' to='/about'>About Us</NavLink></li>
        <li><NavLink className='text-base' to='/'>Pricing</NavLink></li>
        <li><NavLink className='text-base' to='/'>Blog</NavLink></li>
        <li><NavLink className='text-base' to='/contact'>Contact</NavLink></li>
    </>;
    const handleLogout = () => {
        logoutUser()
            .then(() => console.log('signout user'))
            .catch(error => console.log(error));
    }
    return (
        <header className="pt-4 md:pt-8 px-2 md:px-4">
            <nav className="navbar bg-base-100 shadow-sm containerr rounded-2xl">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex="-1"
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            {
                                NavLinks
                            }
                            {/* <li>
                                <a>Parent</a>
                                <ul className="p-2">
                                    <li><a>Submenu 1</a></li>
                                    <li><a>Submenu 2</a></li>
                                </ul>
                            </li> */}
                        </ul>
                    </div>
                    <Link to='/' className="btn btn-ghost text-xl">
                        {
                            <Logo />
                        }
                    </Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {
                            NavLinks
                        }
                    </ul>
                </div>
                <div className="navbar-end gap-2 md:gap-3">
                    {
                        loading ? <span className="loading loading-spinner loading-lg mr-2"></span> :
                            user ? <>
                                <Link to='/rider-registration' className="btn text-base bg-primary">Be a Rider</Link>
                                <div className="dropdown dropdown-end">
                                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                        <div className="w-10 rounded-full">
                                            <img src={user?.photoURL} alt={user?.displayName} />
                                        </div>
                                    </div>
                                    <ul
                                        tabIndex="-1"
                                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                                        <li>
                                            <a className="justify-between">
                                                Profile
                                                <span className="badge">New</span>
                                            </a>
                                        </li>
                                        <li><a>Settings</a></li>
                                        <li><button onClick={handleLogout}>Logout</button></li>
                                    </ul>
                                </div>
                            </> : <>
                                <Link to='/login' className="btn text-base">Sign In</Link>
                                <Link to='/rider-registration' className="btn text-base bg-primary">Be a Rider</Link>
                                <a className="btn text-base btn-ghost bg-neutral text-white rounded-full p-0 w-10">
                                    <FaArrowRight className="text-xl -rotate-45" />
                                </a>
                            </>
                    }
                </div>
            </nav>
        </header>
    );
}