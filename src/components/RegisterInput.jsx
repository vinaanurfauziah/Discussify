import React from 'react';
import PropTypes from 'prop-types';
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
      <button type="submit">Daftar</button>
    </form>
  );
}

RegisterInput.propTypes = {
  register: PropTypes.func.isRequired,
};

export default RegisterInput;
