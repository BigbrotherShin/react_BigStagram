import React, { memo, useEffect, useCallback } from 'react';
import styled, { css } from 'styled-components';
import Modal from './Modal';
import UserName from './UserName';
import Button from './Button';
import { AuthTemplateBlock, WhiteBox } from '../auth/AuthTemplate';
import { useDispatch, useSelector } from 'react-redux';
import {
  ADD_FOLLOWING_REQUEST,
  DELETE_FOLLOWING_REQUEST,
} from '../../reducers/user';

const FollowListHeader = styled.div`
  display: flex;

  & .follow_list_header_right {
    margin-left: auto;
  }
`;

const FollowList = memo(({ followData }) => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);

  const follow = useCallback(
    (userData) => () => {
      dispatch({
        type: ADD_FOLLOWING_REQUEST,
        data: {
          userId: userData,
        },
      });
    },
    [],
  );
  const unfollow = useCallback(
    (userData) => () => {
      dispatch({
        type: DELETE_FOLLOWING_REQUEST,
        data: {
          userId: userData,
        },
      });
    },
    [],
  );

  return (
    <Modal>
      <AuthTemplateBlock>
        <WhiteBox followList>
          <FollowListHeader>
            <h1>
              <div>{followData.followType}</div>
            </h1>
            <Button
              setOffModal
              className='follow_list_header_right'
              clearButton
            >
              X
            </Button>
          </FollowListHeader>
          <ul>
            {followData.followData.map((v, i) => {
              const isFollowing =
                me && me.Followings.find((f) => f.id === v.id);

              return (
                <li key={+v.createdAt}>
                  <UserName
                    followList
                    isFollowing={isFollowing}
                    followOrUnfollow={isFollowing ? unfollow : follow}
                    user={v}
                  />
                </li>
              );
            })}
          </ul>
        </WhiteBox>
      </AuthTemplateBlock>
    </Modal>
  );
});

export default FollowList;
