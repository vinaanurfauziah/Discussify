import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import useInput from '../hooks/useInput';

function RegisterInput({ register }) {
  const [name, onNameChange] = useInput('');
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!email) {
      alert('Email diperlukan'); // atau tampilkan pesan error
      return;
    }
    register({ name, email, password });
  };

  return (
    <form className="register-input" onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={onNameChange}
        placeholder="Nama"
      />
      <input
        type="email"
        value={email}
        onChange={onEmailChange}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={onPasswordChange}
        placeholder="Kata Sandi"
      />
      <motion.button whileHover={{ scale: 1.1, textShadow: '0px 0px 8px rgb(255,255,255)', boxShadow: '0px 0px 8px rgb(255,255,255)' }} type="submit">Daftar</motion.button>
    </form>
  );
}

RegisterInput.propTypes = {
  register: PropTypes.func.isRequired,
};

export default RegisterInput;
