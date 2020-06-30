import React from "react";
import Nav from '../Nav';

const Footer = props => {
    return (
        <footer className="flex flex-col fixed lg:relative lg:hidden bottom-0 w-full">
            <Nav />
        </footer>
    );
}

export default Footer;
