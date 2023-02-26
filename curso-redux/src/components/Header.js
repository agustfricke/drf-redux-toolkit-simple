import React from "react";

const Header = () => {
    return (
    <nav className="bg-#998898">
        <div className="flex justify-center items-center">
            <a href="/" className="text-xl m-4  font-semibold font-mono text-white">
            HOME
            </a>
            
            <a href="/add" className="text-xl m-4 font-semibold font-mono text-white">
            CREATE
            </a>
        </div>
    </nav>
    )
}
export default Header;
