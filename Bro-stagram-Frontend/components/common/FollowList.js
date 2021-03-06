import React, { memo, useEffect, useCallback } from 'react';
import styled, { css } from 'styled-components';
import Modal from './Modal';
import UserName from './UserName';
import Button from './Button';
import WhiteBox from '../common/WhiteBox';
import { useDispatch, useSelector } from 'react-redux';
import {
  ADD_FOLLOWING_REQUEST,
  DELETE_FOLLOWING_REQUEST,
} from '../../reducers/user';
import { useRouter } from 'next/router';
import ClearButton from '../common/ClearButton';

const FollowListWhiteBox = styled(WhiteBox)`
  position: relative;
`;

const FollowListItemsWrapper = styled.div`
  overflow: auto;
  max-height: 400px;
`;

const FollowListItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 16px;
`;

const FollowList = memo(({ followData }) => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const router = useRouter();
  const { pathname, query } = router;
  const { userData } = query;

  // useEffect(() => {
  //   return () => {
  //     router.push(pathname, `${pathname}${userData ? `/${userData}` : ''}`, {
  //       shwallow: true,
  //     });
  //   };
  // }, []);

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

  if (!(followData && followData.followType && followData.followData)) {
    return <div>로딩중..</div>;
  }

  return (
    <Modal>
      <FollowListWhiteBox>
        <header>
          <h1>
            <div>{followData.followType}</div>
          </h1>
          <ClearButton
            fontSize='20px'
            setOffModal
            className='follow_list_header_right'
          >
            X
          </ClearButton>
        </header>
        <FollowListItemsWrapper>
          <ul>
            {followData.followData.map((v, i) => {
              const isMe = me && me.id === v.id;
              const isFollowing =
                me && me.Followings.find((f) => f.id === v.id);

              return (
                <li key={+v.createdAt}>
                  <FollowListItem>
                    <UserName followList user={v} />
                    {!me && isMe ? (
                      <Button
                        blue={isFollowing ? false : true}
                        white={isFollowing ? true : false}
                        onClick={isFollowing ? unfollow(v.id) : follow(v.id)}
                      >
                        {isFollowing ? '언팔로우' : '팔로우'}
                      </Button>
                    ) : null}
                  </FollowListItem>
                </li>
              );
            })}
          </ul>
        </FollowListItemsWrapper>
      </FollowListWhiteBox>
    </Modal>
  );
});

export default FollowList;
