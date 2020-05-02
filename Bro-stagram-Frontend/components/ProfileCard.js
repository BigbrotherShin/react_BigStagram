import React, { memo, useCallback } from 'react';
import { Card, Avatar, Tooltip } from 'antd';
import {
  EditOutlined,
  LogoutOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { LOG_OUT_REQUEST } from '../reducers/user';

const ProfileCard = memo(() => {
  const { me } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const onLogout = useCallback(() => {
    dispatch({
      type: LOG_OUT_REQUEST,
    });
  }, []);

  return (
    <Card
      style={{ width: 300 }}
      actions={[
        <Tooltip key='write' title='글쓰기'>
          <EditOutlined key='edit' />
        </Tooltip>,
        <Tooltip key='setting' title='프로필 편집'>
          <SettingOutlined key='setting' />
        </Tooltip>,
        <Tooltip key='logout' title='로그아웃'>
          <LogoutOutlined onClick={onLogout} />
        </Tooltip>,
      ]}
    >
      <Card.Meta
        avatar={<Avatar src={``}>{`${me.nickname}`[0]}</Avatar>}
        title={`${me.userId}`}
        description={`${me.nickname}`}
      />
    </Card>
  );
});

export default ProfileCard;
