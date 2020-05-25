import React, { useState, useCallback, memo } from 'react';
import PropTypes from 'prop-types';
import {
  InstagramOutlined,
  CompassOutlined,
  HeartOutlined,
  UserOutlined,
  HomeOutlined,
} from '@ant-design/icons';

import Link from 'next/link';
import { useSelector } from 'react-redux';
import Button from '../common/Button';

const AppLayout = memo(({ children }) => {
  const { me, isLoggedIn } = useSelector((state) => state.user);
  const [searchInput, setSearchInput] = useState('');

  const onChange = useCallback(
    (e) => {
      setSearchInput(e.target.value);
    },
    [searchInput],
  );

  return (
    <section className='container'>
      <nav>
        <div className='nav_container_fixed_wrapper'>
          <div className='nav_container_wrapper'>
            <div className='nav_container'>
              <div className='nav_left'>
                <Link href='/'>
                  <a>
                    <div className='nav_left_items'>
                      <InstagramOutlined
                        className='nav_icons'
                        id='nav_insta_icon'
                      />
                      <h2>BroStagram</h2>
                    </div>
                  </a>
                </Link>
              </div>
              <div className='nav_search'>
                <input
                  className='nav_search_input'
                  placeholder='검색'
                  onChange={onChange}
                />
              </div>
              <div className='nav_right'>
                <div className='nav_right_items'>
                  {me && me.id ? (
                    <>
                      <Link href='/'>
                        <a className='nav_icons'>
                          <HomeOutlined />
                        </a>
                      </Link>

                      <Link href='/explore'>
                        <a className='nav_icons'>
                          <CompassOutlined />
                        </a>
                      </Link>
                      <HeartOutlined className='nav_icons' />
                      <Link href='/profile'>
                        <a className='nav_icons'>
                          <UserOutlined />
                        </a>
                      </Link>
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
            </div>
          </div>
        </div>
      </nav>
      <section className='main_container_wrapper'>
        <div className='main_container'>{children}</div>
      </section>
    </section>
  );
});

AppLayout.propTypes = {
  children: PropTypes.node,
};

export default AppLayout;
