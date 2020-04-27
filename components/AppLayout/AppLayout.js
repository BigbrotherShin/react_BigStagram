import React, { useState, useCallback, memo } from 'react';
import PropTypes from 'prop-types';
import {
  InstagramOutlined,
  GlobalOutlined,
  HeartOutlined,
  UserOutlined,
} from '@ant-design/icons';

const AppLayout = memo(({ children }) => {
  const [searchInput, setSearchInput] = useState('');

  const onChange = useCallback(
    (e) => {
      setSearchInput(e.target.value);
    },
    [searchInput],
  );

  return (
    <div className='container'>
      <div className='nav_container'>
        <div className='nav_left'>
          <InstagramOutlined className='nav_icons' id='nav_insta_icon' />
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
          <GlobalOutlined className='nav_icons' />
          <HeartOutlined className='nav_icons' />
          <UserOutlined className='nav_icons' />
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
