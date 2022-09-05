import React from 'react';
import { Link } from 'react-router-dom';

function Register(props) {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    function handleEmailChange(e) {
        setEmail(e.target.value);
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.handleRegister(password, email);
    }
       
    return (
        <div className="register">
            <p className="register__welcome">Регистрация</p>
            <form onSubmit={handleSubmit} className="register__form">
                <input id="email" name="email" type="email" className="register__input" placeholder="Email" value={email} onChange={handleEmailChange} />
                <input id="password" name="password" type="password" className="register__input" placeholder="Пароль" value={password} onChange={handlePasswordChange} />
                <button type="submit" className="register__buttonSubmit">Зарегистрироваться</button>
            <p className="register__linkDescription">Уже зарегистрированы?<Link to="sign-in" className="register__linkLogin">Войти</Link></p>
            </form>
        </div>
    );

}

export default Register;
