/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

// Deklarasi komponen ThreadReplyInput dengan prop 'replyThread'
function ThreadReplyInput({ replyThread }) {
  // Membuat state 'title' dengan useState, awalnya kosong
  const [title, setTitle] = useState('');
  // Membuat state 'body' dengan useState, awalnya kosong
  const [body, setBody] = useState('');
  // Membuat state 'category' dengan useState, awalnya kosong
  const [category, setCategory] = useState('');

  // Menggunakan hook useNavigate untuk mendapatkan fungsi navigasi
  const navigate = useNavigate('/');

  // Deklarasi fungsi replyThreadHandler
  function replyThreadHandler() {
    // Memeriksa apakah 'title' tidak kosong setelah di-trim
    if (title.trim()) {
      // Memanggil fungsi replyThread dengan parameter title, body, dan category
      replyThread(title, body, category);
      // Mengatur 'title, body, category' menjadi kosong kembali
      setTitle('');
      setBody('');
      setCategory('');
      // Mengarahkan kembali ke halaman utama
      navigate('/');
    }
  }

  // Deklarasi fungsi handleTitleChange untuk mengubah judul
  function handleTitleChange({ target }) {
    // Memeriksa panjang nilai input agar tidak melebihi 320 karakter
    if (target.value.length <= 320) {
      // Mengatur nilai 'title' sesuai dengan nilai input
      setTitle(target.value);
    }
  }

  // Deklarasi fungsi handleBodyChange untuk mengubah isi
  function handleBodyChange({ target }) {
    // Memeriksa panjang nilai input agar tidak melebihi 320 karakter
    if (target.value.length <= 320) {
      // Mengatur nilai 'body' sesuai dengan nilai input
      setBody(target.value);
    }
  }

  // Deklarasi fungsi handleCategoryChange untuk mengubah kategori
  function handleCategoryChange({ target }) {
    // Memeriksa panjang nilai input agar tidak melebihi 320 karakter
    if (target.value.length <= 320) {
      // Mengatur nilai 'category' sesuai dengan nilai input
      setCategory(target.value);
    }
  }

  return (
    // Mengembalikan elemen div dengan kelas 'thread-reply-input'
    <div className="thread-reply-input">
      <input type="text" placeholder="title" value={title} onChange={handleTitleChange} />
      <textarea type="text" placeholder="Thread your reply" value={body} onChange={handleBodyChange} />
      <input type="text" placeholder="category" value={category} onChange={handleCategoryChange} />
      // Paragraf menampilkan sisa karakter yang tersisa
      <p className="thread-reply-input__char-left">
        // Menampilkan panjang isi 'body'
        <strong>{body.length}</strong>
        /320
      </p>
      <button type="submit" onClick={replyThreadHandler}>Reply</button>
    </div>
  );
}
// Properti Types untuk ThreadReplyInput
ThreadReplyInput.propTypes = {
  replyThread: PropTypes.func.isRequired, // replyThread harus berupa fungsi yang diperlukan
};

export default ThreadReplyInput;
