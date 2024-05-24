/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { BsStars } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginInput from '../components/LoginInput';
import { asyncSetAuthUser } from '../states/authUser/action';

function LoginPage() {
  const dispatch = useDispatch(); // @TODO: get dispatch function from store

  const onLogin = ({ email, password }) => {
    // @TODO: dispatch async action to login
    dispatch(asyncSetAuthUser({ email, password }));
  };

  return (
    <section className="login-page">
      <header className="login-page__hero">
        <h1>
          <BsStars />
        </h1>
      </header>
      <article className="login-page__main">
        <h2 className="login-page__title">Hey, Login Now!</h2>
        {' '}
        {/* Updated greeting */}
        <LoginInput login={onLogin} />
        <p className="login-page__link">
          If you are new,
          {' '}
          <Link to="/register" className="login-page__register-link" style={{ color: 'blue' }}>
            Create Account
          </Link>
          {' '}
          {/* Updated call to action */}
        </p>
      </article>
    </section>
  );
}

export default LoginPage;
