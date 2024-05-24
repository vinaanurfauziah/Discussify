/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { RiLogoutCircleRLine } from 'react-icons/ri';
// import { FaHome } from 'react-icons/fa';
// import { FaChartSimple } from 'react-icons/fa6';

function Navigation({ authUser, signOut }) {
  const { id, avatar, name } = authUser;

  return (
    <div className="navigation">
      <img src={avatar} alt={id} title={name} />
      <nav>
        <Link to="/" className="home-link">
          Home
        </Link>
        <Link to="/leaderboard" className="leaderboard-link">
          Leaderboard
        </Link>
      </nav>
      <button type="button" onClick={signOut} className="logout-button">
        Sign Out <RiLogoutCircleRLine />
      </button>
    </div>
  );
}

const authUserShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

Navigation.propTypes = {
  authUser: PropTypes.shape(authUserShape).isRequired,
  signOut: PropTypes.func.isRequired,
};

export default Navigation;
