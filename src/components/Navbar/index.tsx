import React from 'react';
import { Link } from 'react-router-dom';
import { Earth, CaretDown } from '@kubed/icons';
import { Dropdown, Menu, MenuItem } from '@kubed/components';
import { NavbarWrapper, LogoWrapper, NavbarRight, ProfileMenu } from './styles';

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
  return (
    <NavbarWrapper>
      <LogoWrapper>
        <Link to="/">
          <img src="../../assets/logo.svg" alt="KubeEye" />
        </Link>
      </LogoWrapper>
      <NavbarRight>
        <Dropdown content={langMenu}>
          <div className="language-switcher">
            <Earth size={16} />
          </div>
        </Dropdown>
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
