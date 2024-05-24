/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { BiUpvote, BiDownvote } from 'react-icons/bi';
import { postedAt } from '../utils';

function ThreadDetail({
  id,
  title,
  body,
  category,
  createdAt,
  owner,
  upVotesBy,
  downVotesBy,
  authUser,
  voteThread,
  comments,
}) {
  const [isUpvoted, setIsUpvoted] = useState(upVotesBy.includes(authUser));
  const [isDownvoted, setIsDownvoted] = useState(downVotesBy.includes(authUser));

  useEffect(() => {
    setIsUpvoted(upVotesBy.includes(authUser));
    setIsDownvoted(downVotesBy.includes(authUser));
  }, [upVotesBy, downVotesBy, authUser]);

  const onVoteClick = (voteType) => {
    if (voteType === 'upvote') {
      setIsUpvoted(!isUpvoted);
      if (!isUpvoted) setIsDownvoted(false);
      // Tambahkan kode berikut
      if (!isUpvoted) {
        voteThread(id, voteType);
      } else {
        voteThread(id, 'unvote');
      }
    } else if (voteType === 'downvote') {
      setIsDownvoted(!isDownvoted);
      if (!isDownvoted) setIsUpvoted(false);
      voteThread(id, voteType);
    }
  };

  return (
    <section className="thread-detail">
      <header>
        <img src={owner.avatar} alt={owner.name} />
        <div className="thread-detail__owner-info">
          <p className="thread-detail__owner-name">{owner.name}</p>
        </div>
      </header>
      <article>
        <span className="thread-detail__category">
          #
          {category}
        </span>
        <p className="thread-detail__title">{title}</p>
        <p className="thread-detail__body">{body}</p>
      </article>
      <footer>
        <div className="thread-detail__votes">
          <button
            type="button"
            aria-label="upvote"
            onClick={() => onVoteClick('upvote')}
            className={`thread-detail__vote-button ${isUpvoted ? 'thread-detail__upvoted' : ''}`}
          >
            <BiUpvote className="thread-detail__vote-icon" />
          </button>
          <span>{upVotesBy.length}</span>
          <button
            type="button"
            aria-label="downvote"
            onClick={() => onVoteClick('downvote')}
            className={`thread-detail__vote-button ${isDownvoted ? 'thread-detail__downvoted' : ''}`}
          >
            <BiDownvote className="thread-detail__vote-icon" />
          </button>
          <span>{downVotesBy.length}</span>
        </div>
        <p className="thread-detail__created-at">{postedAt(createdAt)}</p>
      </footer>
    </section>
  );
}

const ownerShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

ThreadDetail.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  owner: PropTypes.shape(ownerShape).isRequired,
  authUser: PropTypes.string.isRequired,
  voteThread: PropTypes.func.isRequired,
  comments: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    owner: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
    }).isRequired,
  })).isRequired,
};

export default ThreadDetail;
