import React, { memo } from 'react';
import styled from 'styled-components';

import { Menu, Avatar, Card } from 'antd';
import { TableOutlined, BookOutlined, UserOutlined } from '@ant-design/icons';
import Posts from '../components/Posts';
import Link from 'next/link';

const StyledProfileContainer = styled.div`
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

  @media (min-width: 736px) {
    & .profile_menu_items,
    .profile_menu_items:hover {
      border-bottom: none;
    }
  }
`;

const ProfileOptions = styled.div``;

const Profile = memo(() => {
  return (
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
            title={'User.id'}
            extra={
              <Link href='#'>
                <a>프로필 편집</a>
              </Link>
            }
            bordered={false}
            style={{ width: 300 }}
            actions={[<p>게시물 6</p>, <p>팔로워 3</p>, <p>팔로우 5</p>]}
          >
            <div>nickname</div>
          </Card>
        </div>
      </ProfileHeader>
      <ProfileOptions>
        <ProfileMenu mode='horizontal'>
          <Menu.Item
            style={{ marginRight: '60px' }}
            className='profile_menu_items'
            key='myPosts'
            icon={<TableOutlined />}
          >
            게시물
          </Menu.Item>
          <Menu.Item
            className='profile_menu_items'
            key='myBookmark'
            icon={<BookOutlined />}
          >
            저장됨
          </Menu.Item>
        </ProfileMenu>
      </ProfileOptions>
      <Posts />
      <Posts />
    </StyledProfileContainer>
  );
});

export default Profile;
