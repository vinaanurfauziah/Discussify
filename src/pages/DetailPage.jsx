/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ThreadDetail from '../components/ThreadDetail';
import ThreadItem from '../components/ThreadItem';
import { postedAt } from '../utils';
import ThreadCommentsInput from '../components/ThreadCommentsInput';
import {
  asyncAddCommentThreadDetail,
  asyncReceiveThreadDetail,
  asyncToogleVoteThreadDetail,
} from '../states/threadDetail/action';

function DetailPage() {
  const { id } = useParams();
  const { threadDetail = null, authUser } = useSelector((states) => states);
  // @TODO: mendapatkan state threadDetail dan authUser dari store
  const dispatch = useDispatch(); // @TODO: mendapatkan fungsi dispatch dari store

  useEffect(() => {
    // @TODO: mendispatch aksi async untuk mendapatkan detail thread berdasarkan id
    dispatch(asyncReceiveThreadDetail(id));
  }, [id, dispatch]);

  const onVoteThread = () => {
    // @TODO: mendispatch aksi async untuk mengubah suara detail thread
    dispatch(asyncToogleVoteThreadDetail());
  };

  const onCommentsThread = (content) => {
    // @TODO: mendispatch aksi async untuk menambahkan balasan thread
    dispatch(asyncAddCommentThreadDetail({ threadId: id, content: content.comment }));
  };

  if (!threadDetail) {
    return null;
  }

  return (
    <section className="detail-page">
      <ThreadDetail
        {...threadDetail}
        authUser={authUser.id}
        voteThread={onVoteThread}
      />
      <ThreadCommentsInput commentThread={onCommentsThread} />
      {threadDetail.comments && (
        // eslint-disable-next-line max-len
        // Jika ada detail thread induk, tampilkan bagian "Comments To" dengan informasi thread induk
        <div className="detail-page__comments">
          <div className="comments-to-container">
            <h3>Comments To</h3>
            {threadDetail.comments && (
              threadDetail.comments.map((comment) => (
                <div className="comment" key={comment.id}>
                  <p className="by-author">
                    by
                    {' '}
                    {comment.owner.name}
                  </p>
                  <p>{comment.content}</p>
                  <p className="date">{postedAt(comment.createdAt)}</p>
                </div>
              ))
            )}
          </div>
        </div>
      )}

    </section>
  );
}

export default DetailPage;
