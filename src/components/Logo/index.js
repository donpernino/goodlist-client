import React from 'react';
import { NavLink } from "react-router-dom";
import logo from "../../static/logo.png";

function Logo({ topSpacing }) {
    return (
        <NavLink
            exact
            to="/"
            className={`flex items-center ${topSpacing}`}
        >
            <img className="h-12 w-12" src={logo} alt="" />
            <strong className="ml-4 text-2xl xxl:text-3xl">
                <span className="text-white">GoodList</span>
                <span className="ml-1 text-secondary text-secondary-blue">.</span>
            </strong>
        </NavLink>
    )
}

export default Logo;