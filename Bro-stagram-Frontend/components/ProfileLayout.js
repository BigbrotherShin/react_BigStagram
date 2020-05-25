import React, { memo, useEffect, useCallback, useState } from 'react';
import styled from 'styled-components';

import { Menu, Avatar, Card } from 'antd';
import {
  TableOutlined,
  BookOutlined,
  UserOutlined,
  TagOutlined,
} from '@ant-design/icons';
import Posts from './Posts';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import {
  LOAD_MY_POSTS_REQUEST,
  LOAD_BOOKMARK_REQUEST,
  SET_ON_MODAL,
} from '../reducers/post';
import { LOAD_OTHER_USER_INFO_REQUEST } from '../reducers/user';
import { useRouter } from 'next/router';
import FollowList from './common/FollowList';
import ModalPortal from './ModalPortal';

export const StyledProfileContainer = styled.div`
  @media (min-width: 736px) {
    padding: 30px 20px 0;
    flex-grow: 1;
    margin: 0 auto 30px;
    max-width: 935px;
    width: 100%;
  }
`;

const ProfileHeader = styled.header`
  display: flex;
  align-items: flex-start;

  @media (min-width: 736px) {
    background: white;
    margin-bottom: 44px;

    .profile_avatar_wrapper {
      margin-right: 30px;
      margin-top: 10px;
      margin-bottom: 10px;
    }

    .profile_avatar_container {
      height: 150px;
      width: 150px;
    }

    .profile_card_wrapper {
      flex-basis: 30px;
    }

    .profile_card {
      height: 100%;
    }
  }

  .profile_avatar_wrapper {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    height: 100%;
    flex-basis: 0;
    flex-grow: 1;
    flex-shrink: 0;
  }

  .profile_card_wrapper {
    flex-grow: 2;
    flex-shrink: 1;
    min-width: 0;
  }

  .profile_avatar_container {
    display: block;
    margin-left: auto;
    margin-right: auto;

    & span {
      width: 100%;
      height: 100%;
    }

    & svg {
      width: 100%;
      height: 100%;
    }
  }

  .profile_avatar_icon {
    width: 100%;
    height: 100%;
  }
`;

const ProfileMenu = styled(Menu)`
  display: flex;
  justify-content: center;

  & .profile_menu_items {
    &,
    &:hover {
      border-bottom: none;
    }

    padding-right: 60px;

    &:last-child {
      padding-right: 0;
    }
  }

  @media (min-width: 736px) {
  }
`;

const ProfileOptions = styled.div``;

const ProfileLayout = memo(({ ...props }) => {
  const { me, isLoggedIn } = useSelector((state) => state.user);
  const {
    isBookmarkLoaded,
    isLoadingPosts,
    isPostsLoaded,
    onModal,
  } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const router = useRouter();
  const [followData, setFollowData] = useState({
    followType: null,
    followData: null,
  });

  const setOnModal = useCallback(
    (follow, userInfo) => () => {
      dispatch({
        type: SET_ON_MODAL,
      });
      setFollowData({
        followType: follow,
        followData: userInfo[follow],
      });
    },
    [],
  );

  const loadBookmark = useCallback(() => {
    // dispatch({
    //   type: LOAD_BOOKMARK_REQUEST,
    // });
    router.push('/profile/bookmark');
  }, []);

  if (
    props.loading &&
    !(
      me &&
      me.Followings &&
      me.Followers &&
      props.userInfo &&
      props.userInfo.Followings &&
      props.userInfo.Followers &&
      props.userInfo.nickname &&
      props.userInfo.Posts
    )
  ) {
    return <div>로딩중..</div>;
  }

  return (
    <>
      <StyledProfileContainer>
        <ProfileHeader>
          <div className='profile_avatar_wrapper'>
            <div className='profile_avatar_container'>
              <Avatar className='profile_avatar_icon' icon={<UserOutlined />} />
            </div>
          </div>
          <div className='profile_card_wrapper'>
            <Card
              className='profile_card'
              title={props.userInfo.nickname}
              extra={
                isLoggedIn ? (
                  props.profile ? (
                    <Link href='#'>
                      <a>프로필 편집</a>
                    </Link>
                  ) : props.isFollowing ? (
                    <button onClick={props.deleteFollowing(props.userInfo)}>
                      언팔로우
                    </button>
                  ) : (
                    <button onClick={props.addFollowing(props.userInfo)}>
                      팔로우
                    </button>
                  )
                ) : null
              }
              bordered={false}
              style={{ width: 300 }}
              actions={[
                <p>
                  게시물 {props.userInfo.Posts && props.userInfo.Posts.length}
                </p>,
                <p onClick={setOnModal('Followers', props.userInfo)}>
                  팔로워 {props.userInfo && props.userInfo.Followers.length}
                </p>,
                <p onClick={setOnModal('Followings', props.userInfo)}>
                  팔로잉 {props.userInfo && props.userInfo.Followings.length}
                </p>,
              ]}
            >
              <div>{props.userInfo.userId}</div>
            </Card>
          </div>
        </ProfileHeader>
        <ProfileOptions>
          <ProfileMenu mode='horizontal'>
            <Menu.Item
              className='profile_menu_items'
              key='myPosts'
              icon={<TableOutlined />}
              onClick={props.loadPosts}
            >
              게시물
            </Menu.Item>
            {props.loadBookmark ? (
              <Menu.Item
                className='profile_menu_items'
                key='myBookmark'
                icon={<BookOutlined />}
                onClick={loadBookmark}
              >
                저장됨
              </Menu.Item>
            ) : null}

            <Menu.Item
              className='profile_menu_items'
              key='taggedPosts'
              icon={<TagOutlined />}
            >
              태그됨
            </Menu.Item>
          </ProfileMenu>
        </ProfileOptions>
        {props.posts ? (
          <Posts posts={props.posts} />
        ) : (
          <Posts posts={props.userInfo && props.userInfo.Posts} />
        )}
      </StyledProfileContainer>
      {onModal ? (
        <ModalPortal>
          <FollowList followData={followData} />
        </ModalPortal>
      ) : null}
    </>
  );
});

export default ProfileLayout;
