import React, { SyntheticEvent, useState } from 'react';
import axios from "axios";
import { Redirect, Link } from "react-router-dom";

const Login = ({setLogin}: {setLogin: Function}) => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [redirect, setRedirect] = useState<boolean>(false)

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault()

    await axios.post('/login', {
      email,
      password
    })
      .then(() => {
        setRedirect(true)
        setLogin();
      })
      .catch(err => {
        console.log(err)
      })
  }

  if (redirect) {
    return <Redirect to="/" />
  }

  return (
    <>
      <form className="form-signin" onSubmit={submit}>
        <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
        <input
          type="email"
          className="form-control"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="form-control"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="mb-3">
          <Link to="/forgot">Forgot Password</Link>
        </div>
        <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
      </form>
    </>
  );
};

export default Login;
