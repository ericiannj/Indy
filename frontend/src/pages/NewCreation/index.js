import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import './style.css';
import '../../global.css';

import logoImg from '../../assets/logo.png';

export default function NewCreation() {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [comments, setComments] = useState('');

  const history = useHistory();

  const creatorId = localStorage.getItem('creatorId');

  async function handleNewCreation(e) {
    e.preventDefault();

    const data = {
      title,
      type,
      description,
      comments,
    };

    try {
      await api.post('creations', data, {
        headers: {
          Authorization: creatorId,
        },
      });

      history.push('/profile');
    } catch (err) {
      alert('Erro ao cadastrar caso, tente novamente.');
    }
  }

  return (
    <div className="new-creation-container">
      <div className="content">
        <section>
          <img className="img2" src={logoImg} alt="Creativity Bank" />

          <h1>Register New Creation</h1>
          <p>Select the type of the creation and describe your plans.</p>

          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#E02041" />
            Back to Home
          </Link>
        </section>

        <form class="form-creation" onSubmit={handleNewCreation}>
          <input
            placeholder="Creation Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            placeholder="Creation Type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <textarea
            placeholder="Comments"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
          />
          <button className="button" type="submit">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
