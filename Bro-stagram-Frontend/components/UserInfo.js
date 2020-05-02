import React, { memo } from 'react';
import styled from 'styled-components';
import { Avatar } from 'antd';

const PostUserImage = styled.img`
  border-radius: 50%;
  height: 30px;
  width: 30px;
`;

const PostImageNickname = styled.div`
  border-radius: 50%;
  background-color: #bfbeba;
  height: 30px;
  width: 30px;
  display: flex;
  align-items: center;
  justify-contents: center;

  & span {
    display: inline-block;
    margin: auto;
    font-weight: 800;
    color: white;
  }
`;

const UserNickname = styled.div`
  font-weight: 600;
  margin-left: 6px;
`;

const UserInfo = memo(() => {
  return (
    <>
      <Avatar src=''>{'닉네임'[0]}</Avatar>
      <UserNickname className='card_user_name'>Nickname</UserNickname>
    </>
  );
});

export default UserInfo;
