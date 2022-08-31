import styled from 'styled-components';

interface NavItemProps {
  activeKey: string;
  itemKey: string;
}
interface IndicatorProps {
  position: string;
}

export const NavbarWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100vw;
  z-index: 9999;
  min-width: 1164px;
  height: 84px;
  background-color: ${({ theme }) => theme.palette.background};
  padding: 0 32px;
  box-shadow: 4px 0 16px rgba(36, 46, 66, 0.08);
`;

export const LogoWrapper = styled.div`
  flex: 1;
  display: flex;
  img {
    width: 156px;
  }
`;

export const NavbarRight = styled.div`
  display: flex;
  flex: 1;

  .right {
    margin-left: auto;
  }

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

export const NavbarCenter = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  height: 100%;
`;

export const NavWrapper = styled.div`
  position: relative;
`;

export const NavItem = styled.span<NavItemProps>`
  display: inline-block;
  font-weight: 600;
  font-size: 20px;
  color: ${props => (props.activeKey === props.itemKey ? '#404F68' : '#79879C')};
  cursor: pointer;
  padding-top: 28px;
  :hover {
    color: #404f68;
  }
`;

export const Indicator = styled.span<IndicatorProps>`
  height: 3px;
  width: 40px;
  background-color: #242e42;
  border-radius: 6px 6px 0px 0px;
  margin-top: 25px;
  position: absolute;
  left: ${props => props.position};
  bottom: 0;
  transition: 0.3s;
`;
