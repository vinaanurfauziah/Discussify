/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { BsStars } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import RegisterInput from '../components/RegisterInput';
import { asyncRegisterUser } from '../states/users/action';

function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch(); // @TODO: get dispatch function from store

  const onRegister = ({ name, email, password }) => {
    // @TODO: dispatch async action to register
    dispatch(asyncRegisterUser({ name, email, password }));

    navigate('/');
  };

  return (
    <section className="register-page">
      <header className="register-page__hero">
        <h1>
          <BsStars />
        </h1>
      </header>
      <article className="register-page__main">
        <h2 className="register-page__title">Let's Create an Account </h2>
        {' '}
        {/* Updated greeting */}
        <RegisterInput register={onRegister} />
        <p className="register-page__link">
          Already have an account?
          {' '}
          <Link to="/" className="register-page__login-link">
            Sign In
          </Link>
          {' '}
          {/* Updated call to action */}
        </p>
      </article>
    </section>
  );
}

export default RegisterPage;
