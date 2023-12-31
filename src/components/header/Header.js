import React, { useEffect, useRef } from "react";
import "./header.scss";
import { Link, NavLink, useLocation } from "react-router-dom";

import logo from "../../assets/tmovie.png";

const headerNav = [
    {
        display: "Trang chủ",
        path: "/",
    },
    {
        display: "Phim chiếu rạp",
        path: "/movie",
    },
    {
        display: "Phim truyền hình",
        path: "/tv",
    },
];

const Header = () => {
    const { pathName } = useLocation();
    const headerRef = useRef(null);

    const active = headerNav.findIndex((e) => e.path === pathName);

    useEffect(() => {
        const shrinkHeader = () => {
            if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
                headerRef.current.classList.add("shrink");
            } else {
                headerRef.current.classList.remove("shrink");
            }
        };
        window.addEventListener("scroll", shrinkHeader);

        return () => {
            window.removeEventListener("scroll", shrinkHeader);
        };
    }, []);

    const goTop = () => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    };

    return (
        <div ref={headerRef} className="header">
            <div className="header__wrap container">
                <div className="logo">
                    <img src={logo} alt="" />
                    <NavLink exact to="/" onClick={goTop}>
                        tMovie
                    </NavLink>
                </div>
                <ul className="header__nav">
                    {headerNav.map((e, i) => (
                        <li key={i}>
                            <NavLink exact to={e.path} className={`${i === active ? "active" : ""}`} onClick={goTop}>
                                {e.display}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Header;
