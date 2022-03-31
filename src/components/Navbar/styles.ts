import styled from 'styled-components';

export const NavbarWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100vw;
  z-index: 200;
  min-width: 1164px;
  height: 68px;
  background-color: ${({ theme }) => theme.palette.background};
  padding: 0 32px;
  box-shadow: 4px 0 16px rgba(36, 46, 66, 0.08);
`;

export const LogoWrapper = styled.div`
  display: flex;
  img {
    width: 156px;
  }
`;

export const NavbarRight = styled.div`
  display: flex;

  .language-switcher {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
`;

export const ProfileMenu = styled.div`
  display: flex;
  align-items: center;
  margin-left: 31px;
  cursor: pointer;

  .user {
    margin: 0 12px;
    display: flex;
    flex-direction: column;
    .username {
      color: ${({ theme }) => theme.palette.accents_8};
      font-weight: 600;
    }
    .user-email {
      color: ${({ theme }) => theme.palette.accents_5};
      font-size: 12px;
      font-weight: 400;
    }
  }
`;
