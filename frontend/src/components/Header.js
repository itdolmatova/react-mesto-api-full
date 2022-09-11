import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import logoPath from '../images/logo.svg'; 

function Header(props) {
    const location = useLocation();

    function getLocation() {
        if (location.pathname === "/sign-up") {
            return (
            <div className="header__nav">
                <Link to="sign-in" className="header__link">Войти</Link>
            </div>
            )
        } else if (location.pathname === "/sign-in") {
           return (
            <div className="header__nav">
                <Link to="sign-up" className="header__link">Регистрация</Link>
            </div>
            )
        } else {
            return (
            <div className="header__nav">
            <p className="header__userEmail">{props.userData.email}</p>
            <button className="header__closeButton" onClick={props.handleLogout}>Выйти</button>
            </div>
        )}
    }

    return (
        <header className="header">
            <img className="header__logo" alt="Логотип" src={logoPath} />
            {getLocation()}
        </header>
    );
}

export default Header;