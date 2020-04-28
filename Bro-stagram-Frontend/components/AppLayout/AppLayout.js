import React, { useState, useCallback, memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  InstagramOutlined,
  GlobalOutlined,
  HeartOutlined,
  UserOutlined,
} from '@ant-design/icons';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Button from '../common/Button';
import App from 'next/app';

const dummy = {
  isLoggedIn: false,
};

const AppLayout = memo(({ children }) => {
  const [searchInput, setSearchInput] = useState('');

  const onChange = useCallback(
    (e) => {
      setSearchInput(e.target.value);
    },
    [searchInput],
  );

  const onLoginClick = useCallback(() => {
    setLoginClick(true);
  }, []);

  return (
    <div className='container'>
      <div className='nav_container'>
        <div className='nav_left'>
          <Link href='/'>
            <a>
              <InstagramOutlined className='nav_icons' id='nav_insta_icon' />
            </a>
          </Link>
          <h2>BigStagram</h2>
        </div>
        <div className='nav_search'>
          <form>
            <input
              className='nav_search_input'
              placeholder='검색'
              onChange={onChange}
            />
          </form>
        </div>
        <div className='nav_right'>
          {dummy.isLoggedIn ? (
            <>
              <GlobalOutlined className='nav_icons' />
              <HeartOutlined className='nav_icons' />
              <UserOutlined className='nav_icons' />
            </>
          ) : (
            <Link href='/login'>
              <a>
                <Button>로그인</Button>
              </a>
            </Link>
          )}
        </div>
      </div>
      <div className='main_container'>
        <div className='main_left'>{children}</div>
        <div className='main_right'>right side</div>
      </div>
    </div>
  );
});

AppLayout.propTypes = {
  children: PropTypes.node,
};

export default AppLayout;
