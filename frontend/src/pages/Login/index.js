import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import api from '../../services/api';

import './style.css';
import '../../global.css';

//Vai ter a segunda imagem?
import logoImg from '../../assets/logo.png';

export default function Login() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const response = await api.post('sessions', { name, password });

      //localStorage.setItem('creatorId', response.data.id);
      localStorage.setItem('creatorPassword', response.data.password);
      localStorage.setItem('creatorName', response.data.name);

      history.push('/profile');
    } catch (err) {
      alert('Login failed, please try again.')
    }
  }

  return (
    <div className="login-container">
      <section className="form">
        <img src={logoImg} alt="The Creativity Bank" />
        <form onSubmit={handleLogin}>
          <h1> Indy: The Creativity Bank </h1>
          <input placeholder="Creator" value={name} onChange={e => setName(e.target.value)} />
          <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
          <button className="button" type="submit">
            Log in
          </button>
          <Link className="back-link" to="/register">
            <FiLogIn size={16} color="#E02041" />
            Do not have an account?
          </Link>
        </form>
      </section>
    </div>
  )
}