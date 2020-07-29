import React from "react";
import Logo from "../Logo";

function Header() {
    return (
        <header className="flex lg:hidden items-center lg:items-start relative font-sans py-4 px-4 lg:pt-12 lg:px-0 lg:flex-col lg:mb-8">
            <Logo topSpacing="lg:mt-10" />
        </header>
    )
}

export default Header;