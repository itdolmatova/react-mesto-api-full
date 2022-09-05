import React from 'react';

function Login(props) {
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
    props.handleLogin(password, email);
  }

  return (
    <div className="login">
      <p className="login__welcome">Вход</p>
      <form onSubmit={handleSubmit} className="login__form">
        <input required id="username" name="email" type="email" className="login__input" placeholder="Email" value={email} onChange={handleEmailChange} />
        <input required id="password" name="password" type="password" className="login__input" placeholder="Пароль" value={password} onChange={handlePasswordChange} />
        <button type="submit" className="login__buttonSubmit">Войти</button>
      </form>
    </div>
  )
}

export default Login;
