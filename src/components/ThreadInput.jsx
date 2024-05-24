/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

function ThreadInput({ addThread }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [category, setCategory] = useState('');

  function addthread() {
    if (title.trim() && body) {
      addThread(title, body, category);
      setTitle('');
      setBody('');
      setCategory('');
    }
  }

  function handleTitleChange({ target }) {
    if (target.value.length <= 320) {
      setTitle(target.value);
    }
  }

  function handleBodyChange({ target }) {
    if (target.value.length <= 320) {
      setBody(target.value);
    }
  }

  function handleCategoryChange({ target }) {
    if (target.value.length <= 320) {
      setCategory(target.value);
    }
  }

  return (
    <div className="thread-input">
      <input type="text" placeholder="Judul" value={title} onChange={handleTitleChange} />
      <input type="text" placeholder="Kategori" value={category} onChange={handleCategoryChange} />
      <textarea type="text" placeholder="Apa yang kamu pikirkan?" value={body} onChange={handleBodyChange} />
      <p className="thread-input__char-left">
        <strong>{body.length}</strong>
        /320
      </p>
      <motion.button whileHover={{ scale: 1.1, textShadow: '0px 0px 8px rgb(255,255,255)', boxShadow: '0px 0px 8px rgb(255,255,255)' }} type="submit" onClick={addthread}>Buat</motion.button>
    </div>
  );
}

ThreadInput.propTypes = {
  addThread: PropTypes.func.isRequired,
};

export default ThreadInput;
