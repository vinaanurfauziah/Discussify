/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/order */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable max-len */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import useInput from '../hooks/useInput';
import { motion } from 'framer-motion';

// Deklarasi komponen ThreadCommentInput dengan prop 'commentThread'
function ThreadCommentInput({ commentThread }) {
  // Membuat state 'title' dengan useState, awalnya kosong
  const [comment, setComment] = useInput('');
  // Membuat state 'body' dengan useState, awalnya kosong
  // const [body, setBody] = useState('');
  // Membuat state 'category' dengan useState, awalnya kosong
  // const [category, setCategory] = useState('');

  // Menggunakan hook useNavigate untuk mendapatkan fungsi navigasi
  // const navigate = useNavigate('/');

  // Deklarasi fungsi commentThreadHandler
  // function commentThreadHandler() {
  //   // Memeriksa apakah 'title' tidak kosong setelah di-trim
  //   // if (title.trim()) {
  //     // Memanggil fungsi commentThread dengan parameter title, body, dan category
  //     // commentThread(title, body, category);
  //     // Mengatur 'title, body, category' menjadi kosong kembali
  //     // setTitle('');
  //     // setBody('');
  //     // setCategory('');
  //     // Mengarahkan kembali ke halaman utama

  //     navigate('/');
  //   }
  // }

  // Deklarasi fungsi handleTitleChange untuk mengubah judul

  // Deklarasi fungsi handleBodyChange untuk mengubah isi

  // Deklarasi fungsi handleCategoryChange untuk mengubah kategori

  return (
    // Mengembalikan elemen div dengan kelas 'thread-comment-input'
    <div className="thread-comment-input">
      <textarea placeholder="comment" value={comment} onChange={setComment} maxLength={320} />
      <motion.button whileHover={{ scale: 1.1, textShadow: '0px 0px 8px rgb(255,255,255)', boxShadow: '0px 0px 8px rgb(255,255,255)' }} type="submit" onClick={() => commentThread({ comment })}>Comment</motion.button>
    </div>
  );
}

// Properti Types untuk ThreadCommentInput
ThreadCommentInput.propTypes = {
  commentThread: PropTypes.func.isRequired, // commentThread harus berupa fungsi yang diperlukan
};

export default ThreadCommentInput;
