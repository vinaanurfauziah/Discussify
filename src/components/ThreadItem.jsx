/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FaComment } from 'react-icons/fa';
import { BiUpvote, BiDownvote } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { postedAt } from '../utils';

function ThreadItem({
  id, title, body, category, createdAt, upVotesBy, downVotesBy, totalComments, authUser, vote, user, updateUpVotesBy,
}) {
  const navigate = useNavigate();
  const [isUpvoted, setIsUpvoted] = useState(upVotesBy.includes(authUser));
  const [isDownvoted, setIsDownvoted] = useState(downVotesBy.includes(authUser));

  useEffect(() => {
    setIsUpvoted(upVotesBy.includes(authUser));
    setIsDownvoted(downVotesBy.includes(authUser));
  }, [upVotesBy, downVotesBy, authUser]);

  const onVoteClick = (voteType) => {
    if (voteType === 'upvote') {
      setIsUpvoted(!isUpvoted);
      setIsDownvoted(false);
      if (!isUpvoted) {
        vote(id, voteType);
      } else {
        vote(id, 'unvote');
        // Panggil updateUpVotesBy setelah unvote
        updateUpVotesBy(id, 'unvote');
      }
    } else if (voteType === 'downvote') {
      setIsDownvoted(!isDownvoted);
      setIsUpvoted(false);
      vote(id, voteType);
    }
  };

  const onThreadClick = () => {
    navigate(`/threads/${id}`);
  };

  const onThreadPress = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      navigate(`/threads/${id}`);
    }
  };

  return (
    <div role="button" tabIndex={0} className="thread-item" onClick={onThreadClick} onKeyDown={onThreadPress}>
      <div className="thread-item__user-avatar">
        <img
          className="mr-2 w-6 h-6 rounded-full"
          src={user.avatar}
          alt={user.name}
        />
      </div>
      <div className="thread-item__detail">
        <header>
          <div className="thread-item__ownerId-info">
            <p className="thread-item__ownerId-name">{user.name}</p>
          </div>
          <p className="thread-item__created-at">{postedAt(createdAt)}</p>
        </header>
        <article>
          <span className="thread-detail__category">
            #
            {category}
          </span>
          <p className="thread-item__title">{title}</p>
          <p className="thread-item__body">{body}</p>
          <div className="thread-item__totalComments" onClick={() => navigate(`/threads/${id}`)}>
            <FaComment className="thread-item__comment-icon" />
            <span className="thread-item__totalComments-count">{totalComments}</span>
          </div>
        </article>
        {
          vote && (
            <div className="thread-item__vote-section">
              <button type="button" aria-label="upvote" onClick={() => onVoteClick('upvote')} className={`thread-item__vote-button ${isUpvoted ? 'thread-item__upvoted' : ''}`}>
                <BiUpvote className="thread-item__vote-icon" />
              </button>
              {upVotesBy.length}
              <button type="button" aria-label="downvote" onClick={() => onVoteClick('downvote')} className={`thread-item__vote-button ${isDownvoted ? 'thread-item__downvoted' : ''}`}>
                <BiDownvote className="thread-item__vote-icon" />
              </button>
              {downVotesBy.length}
            </div>
          )
        }
      </div>
    </div>
  );
}

const ownerIdShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

const threadItemShape = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  authUser: PropTypes.string.isRequired,
  ownerId: PropTypes.shape(ownerIdShape).isRequired,
  totalComments: PropTypes.number.isRequired,
};

ThreadItem.propTypes = {
  ...threadItemShape,
  vote: PropTypes.func,
};

ThreadItem.defaultProps = {
  vote: null,
};

export { threadItemShape };

export default ThreadItem;
