/* eslint-disable quotes */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import { motion } from "framer-motion";
import useInput from '../hooks/useInput';

function LoginInput({ login }) {
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  return (
    <form className="login-input">
      <input type="email" value={email} onChange={onEmailChange} placeholder="Email" />
      <input type="password" value={password} onChange={onPasswordChange} placeholder="Password" />
      <motion.button whileHover={{ scale: 1.1, textShadow: "0px 0px 8px rgb(255,255,255)", boxShadow: "0px 0px 8px rgb(255,255,255)" }} type="button" onClick={() => login({ email, password })}>Login</motion.button>
    </form>
  );
}

LoginInput.propTypes = {
  login: PropTypes.func.isRequired,
};

export default LoginInput;
