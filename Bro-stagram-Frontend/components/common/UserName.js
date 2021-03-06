import React from 'react';
import Link from 'next/link';
import { Avatar } from 'antd';
import styled, { css } from 'styled-components';
import { useSelector } from 'react-redux';
import { addFollowing, deleteFollowing } from '../../pages/user';

const UserNicknameContainer = styled.span`
  display: flex;
  align-items: center;
  height: 60px;

  ${(props) =>
    props.attribute.bodyName &&
    css`
      height: auto;
      display: inline-block;
      float: left;
    `}

  ${(props) =>
    props.attribute.followList &&
    css`
      height: auto;
    `}
`;

const UserNickname = styled.span`
  font-weight: bold;
  margin-left: 10px;

  ${(props) =>
    props.attribute.bodyName &&
    css`
      margin-left: 0;
      margin-right: 8px;
    `}
`;

const UserName = ({ user, ...props }) => {
  const { me } = useSelector((state) => state.user);
  const isMe = me && me.id === user.id;
  const goTo = isMe
    ? '/profile'
    : { pathname: '/user', query: { userData: user.id } };
  const goAs = isMe ? '/profile' : `/user/${user.id}`;

  return (
    <UserNicknameContainer attribute={props}>
      {props.bodyName ? null : (
        <Link href={goTo} as={goAs}>
          <a>
            <Avatar src={user && `http://localhost:3065/${user.profileImage}`}>
              {user.nickname[0]}
            </Avatar>
          </a>
        </Link>
      )}
      <Link href={goTo} as={goAs}>
        <a>
          <UserNickname attribute={props}>{user.nickname}</UserNickname>
        </a>
      </Link>
    </UserNicknameContainer>
  );
};

export default UserName;
