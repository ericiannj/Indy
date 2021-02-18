import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';

import logoImg from '../../assets/logo.png';

import './style.css';
import '../../global.css';

export default function Profile() {
  const [creations, setCreations] = useState([]);

  const creatorId = localStorage.getItem('creatorId');
  const creatorName = localStorage.getItem('creatorName');
  const history = useHistory();

  useEffect(() => {
    api
      .get('profile', {
        headers: {
          Authorization: creatorId,
        }
      })
      .then((response) => {
        setCreations(response.data);
      });
  }, [creatorId]);

  async function handleDeleteCreation(id) {
    try {
      await api.delete(`creations/${id}`, {
        headers: {
          Authorization: creatorId,
        },
      });

      setCreations(creations.filter((creation) => creation.id !== id));
    } catch (err) {
      alert('Error deleting case, please try again.');
    }
  }

  function handleLogout() {
    localStorage.clear();

    history.push('/');
  }

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Creativity Bank" />
        <span>Welcome, {creatorName} </span>

        <Link className="button" to="/creations/new">
          Register new creation
        </Link>
        <button className="exit" onClick={handleLogout} type="button">
          <FiPower size={18} color="#E02041" />
        </button>
      </header>

      <h1> Registered Creations </h1>

      <ul>
        {creations.map((creation) => (
          <li key={creation.id}>
            <strong>NAME:</strong>
            <p>{creation.title}</p>

            <strong>TYPE:</strong>
            <p>{creation.type}</p>

            <strong>DESCRIPTION:</strong>
            <p>{creation.description}</p>

            <strong>COMMENTS:</strong>
            <p>{creation.comments}</p>

            <button onClick={() => handleDeleteCreation(creation.id)}>
              <FiTrash2 size={20} color="#a8a8b3" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}