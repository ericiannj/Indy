import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';
import './style.css';
import '../../global.css';

import logoImg from '../../assets/logo.png';

export default function Register() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');

  const history = useHistory();

  async function handleRegister(e) {
    e.preventDefault();

    const data = {
      name,
      password,
      email,
      city,
      country,
    };

    try {
      const response = await api.post('creators', data);
      alert(`Welcome, ${response.data.name}`);
      history.push('/');
    } catch (err) {
      alert('Registration error, please try again');
    }
  }

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img className="img2" src={logoImg} alt="The Creativity Bank" />
          <h1>Register</h1>
          <p>Create you account and let the creativity begin!</p>
          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#E02041" /> Back to home
          </Link>
        </section>
        <form className="form-register" onSubmit={handleRegister}>
          <input
            placeholder="Creator Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="input-group">
            <input
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <input
              placeholder="Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>
          <button className="button" type="submit">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
