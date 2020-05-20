import React from 'react';
import Link from 'next/link';
import { Avatar } from 'antd';
import styled from 'styled-components';

const UserNickname = styled.span`
  margin-left: 10px;
`;

const UserName = ({ user }) => {
  return (
    <>
      <Link
        href={{
          pathname: '/user',
          query: { userData: user.id },
        }}
        as={`/user/${user.id}`}
      >
        <a>
          <Avatar src=''>{user.nickname[0]}</Avatar>
        </a>
      </Link>
      <Link
        href={{
          pathname: '/user',
          query: { userData: user.id },
        }}
        as={`/user/${user.id}`}
      >
        <a>
          <UserNickname>{user.nickname}</UserNickname>
        </a>
      </Link>
    </>
  );
};

export default UserName;
