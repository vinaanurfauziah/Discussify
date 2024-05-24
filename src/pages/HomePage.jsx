import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ThreadInput from '../components/ThreadInput';
import ThreadsList from '../components/ThreadsList';
import FilterKategori from '../components/FilterKategori';
import { asyncPopulateUsersAndThreads } from '../states/shared/action';
import {
  asyncAddThread,
  asyncToogleVoteThread,
} from '../states/threads/action';

function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState('');

  const threads = useSelector((state) => state.threads);
  const users = useSelector((state) => state.users);
  const authUser = useSelector((state) => state.authUser);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  const onAddThread = (title, body, category) => {
    dispatch(asyncAddThread({ title, body, category }));
  };

  const onVote = (id) => dispatch(asyncToogleVoteThread(id));

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const filteredThreads = selectedCategory
    ? threads.filter((thread) => thread.category === selectedCategory)
    : threads;

  const threadList = filteredThreads.map((thread) => ({
    ...thread,
    user: users.find((user) => user.id === thread.ownerId),
    authUser: authUser.id,
  }));

  return (
    <section className="home-page">
      <FilterKategori
        categories={Array.from(new Set(threads.map((thread) => thread.category)))}
        onCategoryChange={handleCategoryChange}
      />
      <ThreadInput addThread={onAddThread} />
      <ThreadsList threads={threadList} vote={onVote} />
    </section>
  );
}

export default HomePage;
