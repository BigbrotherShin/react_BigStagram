import React, { memo, useCallback } from 'react';
import { Card, Avatar, Tooltip } from 'antd';
import { useRouter } from 'next/router';
import {
  EditOutlined,
  LogoutOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { LOG_OUT_REQUEST } from '../reducers/user';

import { SET_ON_MODAL } from '../reducers/post';
import PostEditor from '../Containers/PostEditor';

const ProfileCard = memo(() => {
  const { me } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();

  const onLogout = useCallback(() => {
    dispatch({
      type: LOG_OUT_REQUEST,
    });
  }, []);

  const openEditor = useCallback(() => {
    router.push(router.pathname, '/write');
    dispatch({
      type: SET_ON_MODAL,
    });
  }, []);

  return (
    <div>
      <Card
        style={{ width: 300 }}
        actions={[
          <Tooltip key='write' title='글쓰기'>
            <EditOutlined key='edit' onClick={openEditor} />
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
          title={`${me.nickname}`}
          description={`${me.userId}`}
        />
      </Card>
      <PostEditor />
    </div>
  );
});

export default ProfileCard;
