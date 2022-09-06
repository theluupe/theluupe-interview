import React, { useState, useCallback } from 'react';
import styled from '@emotion/styled';
import { Button } from 'react-bootstrap';
import Link from 'next/link';

import { IPost } from '@dal/Post';

import { Table } from '@molecules/Table';
import { AddPostModal } from '@organisms/AddPostModal';
import { jsx } from '@emotion/core';

type IPostsManagerProps = {
  posts: IPost[];
};

const columns = [
  { Header: 'Post Title', accessor: 'title' },
  { Header: 'Content', accessor: 'content' },
];

const showPostDetails = () => {};
export function PostsManager({ posts }: IPostsManagerProps): JSX.Element {
  const [showUserModal, setShowUserModal] = useState(false);

  const userModalOnCloseHandler = useCallback(() => setShowUserModal(false), [setShowUserModal]);
  const userModalOnOpenHandler = useCallback(() => setShowUserModal(true), [setShowUserModal]);

  return (
    <>
      <CustomButton variant="primary" onClick={userModalOnOpenHandler}>
        Add Post
      </CustomButton>

      <div>
        {posts.map(post => {
          return (
            <Link key={post.id} href="/posts/[id]" as={`/p/${post.id}`}>
              <PostCard
                onClick={() => {
                  showPostDetails();
                }}
              >
                <PostTitle>{post.title}</PostTitle>
                <PostContent>{post.content}</PostContent>
              </PostCard>
            </Link>
          );
        })}
      </div>

      <AddPostModal show={showUserModal} onClose={userModalOnCloseHandler} />
    </>
  );
}

PostsManager.defaultProps = {
  // eslint-disable-next-line react/default-props-match-prop-types
  posts: undefined,
};

const CustomButton = styled(Button)`
  width: auto;
  max-width: 150px;
`;

const PostCard = styled.div`
  margin: 15px 0;
  border: 1px solid #cdcdcd;
  padding: 15px;
  border-radius: 5px;
`;

const PostTitle = styled.h3`
  font-size: 24px;
  color: #f77b78;
`;

const PostContent = styled.p`
  font-size: 16px;
`;
