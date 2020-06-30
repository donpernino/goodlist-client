import React, { useContext, useCallback } from "react";
import { Redirect, withRouter, useHistory } from 'react-router-dom';
import { AuthContext } from "../../context/authContext";
import { NavLink } from "react-router-dom";
import LoginSvg from '../../static/icons/login.svg';
import LogoutSvg from '../../static/icons/logout.svg';
import SignupSvg from '../../static/icons/signup.svg';
import HomeSvg from '../../static/icons/home.svg';
import MovieSvg from '../../static/icons/film.svg';
import SerieSvg from '../../static/icons/tv.svg';
import BookSvg from '../../static/icons/book.svg';
import app from '../../base';

const Nav = ({ history }) => {
    const { currentUser } = useContext(AuthContext);

    const linkClassName = "group flex items-center justify-center rounded-lg";
    const iconClassName = "hidden lg:flex text-gray-900 group-hover:text-white align-center h-6 w-6 stroke-current mr-2 lg:mr-4 transition duration-200";
    const textClassName = "flex text-base leading-none lg:text-lg";
    const textClassInactive = "text-gray-900 group-hover:text-white transition duration-200";

    let menuItems = [];

    if (!currentUser) {
        menuItems = [
            {
                title: 'Login',
                icon: LoginSvg,
                link: '/login'
            },
            {
                title: 'Signup',
                icon: SignupSvg,
                link: '/signup'
            }
        ]
    }

    if (currentUser) {
        menuItems = [
            {
                title: 'Home',
                icon: HomeSvg,
                link: '/'
            },
            {
                title: 'Movies',
                icon: MovieSvg,
                link: '/movies'
            },
            {
                title: 'Series',
                icon: SerieSvg,
                link: '/series'
            },
            {
                title: 'Books',
                icon: BookSvg,
                link: '/books'
            },
        ]
    }

    const logoutUser = useCallback(async event => {
        await app.auth().signOut();
        history.push("/login");
    }, [history]);

    return (
        <nav className="shadow-xlreverse lg:shadow-none flex lg:flex-col w-full bg-secondary-dark lg:bg-transparent h-16 lg:h-auto rounded-tl-xl rounded-tr-xl lg:rounded-tl-none lg:rounded-tr-none lg:pt-12 lg:ml-16">
            <ul className="flex flex-1 justify-around items-center lg:flex-col lg:items-start">
                {menuItems.map((item, index) => (
                    <li className="w-1/4 lg:w-auto lg:h-10 lg:mb-3 relative" key={index}>
                        <NavLink
                            exact
                            to={item.link}
                            className={linkClassName}
                            activeClassName="nav-item-active"
                        >
                            <span className={`nav-item-sep absolute left-0 -ml-6 hidden lg:flex w-1 h-6 mr-6 transition duration-200 bg-secondary`}></span>
                            <item.icon className={`nav-item-icon ${iconClassName}`} />
                            <span className={`nav-item-title ${textClassName} ${textClassInactive}`}>{item.title}</span>
                        </NavLink>
                    </li>
                ))}
                {currentUser &&
                    <li className="w-1/4 lg:w-auto lg:h-10 lg:mb-3 relative hidden lg:flex">
                        <button type="button" className={linkClassName} onClick={() => logoutUser()}>
                            <span className={`nav-item-sep absolute left-0 -ml-6 hidden lg:flex w-1 h-6 mr-6 transition duration-200 bg-secondary`}></span>
                            <LogoutSvg className={`nav-item-icon ${iconClassName}`} />
                            <span className={`nav-item-title ${textClassName} ${textClassInactive}`}>Logout</span>
                        </button>
                    </li>
                }
            </ul>
        </nav>
    )
}

export default withRouter(Nav);