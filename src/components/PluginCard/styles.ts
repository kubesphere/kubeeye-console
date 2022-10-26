import styled from 'styled-components';

type ButtonWrapperProps = {
  hide: boolean;
};

export const Wrapper = styled.div`
  height: 204px;
  width: 374px;
  background-color: #fff;
  border: 1px solid transparent;
  border-radius: 4px;
  padding: 24px;
  box-shadow: 0 4px 8px 0 rgba(36, 46, 66, 0.06);
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  :hover {
    box-shadow: 0 4px 8px 0 rgba(36, 46, 66, 0.2);
    transform: translateY(-4px);
    border: 1px solid #79879c;
  }
`;
export const PluginTitle = styled.div`
  width: 326px;
  display: flex;
  justify-content: space-between;
`;
export const IconWrapper = styled.div`
  height: 48px;
  width: 48px;
`;
export const ButtonWrapper = styled.div<ButtonWrapperProps>`
  opacity: ${({ hide }) => (hide ? 0 : 1)};
  transition: opacity 0.3s ease-in-out;
  ${Wrapper}: hover & {
    opacity: 1;
  }
`;

export const PluginName = styled.div`
  font-size: 16px;
  font-weight: 600;
  margin-top: 6px;
`;
export const Introduction = styled.div`
  font-size: 12px;
  font-width: 400;
  color: #79879c;
  height: 40px;
  width: 326px;
  margin-top: 6px;
  overflow-wrap: break-word;
`;
export const Footer = styled.div`
  margin-top: 12px;
  font-size: 12px;
  font-width: 400;
  line-height: 20px;
  color: #79879c;
`;
