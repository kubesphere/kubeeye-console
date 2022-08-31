import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Earth } from '@kubed/icons';
import { Dropdown, Menu, MenuItem } from '@kubed/components';
import {
  NavbarWrapper,
  LogoWrapper,
  NavbarRight,
  NavbarCenter,
  NavWrapper,
  NavItem,
  Indicator,
} from './styles';

const langMenu = (
  <Menu>
    <MenuItem>简体中文</MenuItem>
    <MenuItem>English</MenuItem>
  </Menu>
);

// const userMenu = (
//   <Menu>
//     <MenuItem>用户设置</MenuItem>
//     <MenuItem>登出</MenuItem>
//   </Menu>
// );

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  let activeKey = 'one';
  let activePosition = '0px';
  if (location.pathname.includes('/plugins')) {
    activeKey = 'two';
    activePosition = '110px';
  }

  return (
    <NavbarWrapper>
      <LogoWrapper>
        <Link to="/">
          <img src="../../assets/logo.svg" alt="KubeEye" />
        </Link>
      </LogoWrapper>

      <NavbarCenter>
        <NavWrapper>
          <Indicator position={activePosition}></Indicator>
          <NavItem
            activeKey={activeKey}
            itemKey="one"
            onClick={() => {
              navigate('/');
            }}
          >
            概览
          </NavItem>
          <NavItem
            activeKey={activeKey}
            itemKey="two"
            onClick={() => {
              navigate('/plugins');
            }}
            style={{ marginLeft: '52px' }}
          >
            插件管理
          </NavItem>
        </NavWrapper>
      </NavbarCenter>

      <NavbarRight>
        <div className="right">
          <Dropdown content={langMenu}>
            <div className="language-switcher">
              <Earth size={16} />
            </div>
          </Dropdown>
        </div>
        {/*<ProfileMenu>*/}
        {/*  <Dropdown content={userMenu}>*/}
        {/*    <div className="user">*/}
        {/*      <span className="username">Annette Black</span>*/}
        {/*      <span className="user-email">AnnetteBlack@email.com</span>*/}
        {/*    </div>*/}
        {/*  </Dropdown>*/}
        {/*  <CaretDown className="caret-down" />*/}
        {/*</ProfileMenu>*/}
      </NavbarRight>
    </NavbarWrapper>
  );
};

export default Navbar;
