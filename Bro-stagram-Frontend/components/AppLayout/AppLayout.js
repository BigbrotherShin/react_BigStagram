import React, { useState, useCallback, memo, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import {
  InstagramOutlined,
  CompassOutlined,
  HeartOutlined,
  UserOutlined,
  HomeOutlined,
  HomeFilled,
  CompassFilled,
} from '@ant-design/icons';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { Avatar } from 'antd';
import Button from '../common/Button';
import ModalPortal from '../ModalPortal';
import Modal from '../common/Modal';
import RegisterPage from '../RegisterPage';
import { SET_ON_MODAL } from '../../reducers/post';
import LoginPage from '../LoginPage';
import styled, { css } from 'styled-components';

const NavAvatarWrapper = styled.div`
  position: relative;
`;

const NavAvatarCircle = styled.div`
  display: hidden;

  ${(props) =>
    props.isActive &&
    css`
      display: inline-block;
      position: absolute;
      width: 30px;
      height: 30px;
      border: 1px solid black;
      border-radius: 50%;
      left: -3px;
      top: -2px;
    `}
`;

const AppLayout = memo(({ children }) => {
  const router = useRouter();
  const { pathname, asPath, query } = router;
  const { me, isLoggedIn } = useSelector((state) => state.user);
  const { onModal } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState('');

  const onChange = useCallback(
    (e) => {
      setSearchInput(e.target.value);
    },
    [searchInput],
  );

  const onLogin = () => {
    router.push({ pathname, query }, '/login', { shallow: true });
    dispatch({
      type: SET_ON_MODAL,
    });
  };

  return (
    <>
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
                            {router.pathname === '/' ? (
                              <HomeFilled />
                            ) : (
                              <HomeOutlined />
                            )}
                          </a>
                        </Link>

                        <Link href='/explore'>
                          <a className='nav_icons'>
                            {router.pathname === '/explore' ? (
                              <CompassFilled />
                            ) : (
                              <CompassOutlined />
                            )}
                          </a>
                        </Link>
                        <HeartOutlined className='nav_icons' />
                        <Link href='/profile'>
                          <a className='nav_icons'>
                            <NavAvatarWrapper>
                              <NavAvatarCircle
                                isActive={router.pathname === '/profile'}
                              />
                              <Avatar
                                size='small'
                                src={
                                  me && me.profileImage
                                    ? `http://localhost:3065/${me.profileImage}`
                                    : ''
                                }
                              >
                                {me && me.nickname[0]}
                              </Avatar>
                            </NavAvatarWrapper>
                          </a>
                        </Link>
                      </>
                    ) : (
                      // <Link href={router.pathname} as='/login'>
                      //   <a>
                      <Button loginButton onClick={onLogin}>
                        로그인
                      </Button>
                      //   </a>
                      // </Link>
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
      {(onModal && router.asPath === '/login') ||
      router.asPath === '/register' ? (
        <ModalPortal>
          <Modal>
            {router.asPath === '/login' ? <LoginPage /> : <RegisterPage />}
          </Modal>
        </ModalPortal>
      ) : null}
    </>
  );
});

AppLayout.propTypes = {
  children: PropTypes.node,
};

export default AppLayout;
