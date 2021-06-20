import React, {useEffect, useState} from 'react';
import './App.css';
import axios from "axios";
import {BrowserRouter, Route} from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Nav from "./components/Nav";
import Forgot from "./pages/Forgot";
import Reset from "./pages/Reset";

axios.defaults.baseURL='http://localhost:8080/api/v1'
axios.defaults.withCredentials = true;

function App() {

  const [user, setUser] = useState(null)
  const [login, setLogin] = useState(false)

  useEffect(() => {
    (
      async () => {
        await axios.get('/user')
          .then(res => {
            const user = res.data
            setUser(user)
          })
          .catch(() => setUser(null))
      }
    )();
  },[login])

  return (
    <div className="App">
      <BrowserRouter>
        <Nav user={user} setLogin={() => setLogin(false)} />
        <Route path="/" exact component={() => <Home user={user} />} />
        <Route path="/login" component={() => <Login setLogin={() => setLogin(true)} />} />
        <Route path="/register" component={Register} />
        <Route path="/forgot" component={Forgot} />
        <Route path="/reset/:token" component={Reset} />
      </BrowserRouter>
    </div>
  );
}

export default App;
