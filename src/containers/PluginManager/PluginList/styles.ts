import styled from 'styled-components';

export const ContentWrapper = styled.div`
  width: 1160px;
  min-width: 1160px;
`;
export const ListWrapper = styled.div`
  margin-top: 12px;
`;
export const ItemWrapper = styled.div`
  display: inline-block;
  margin-right: 19px;
  margin-bottom: 19px;

  &:nth-of-type(3n) {
    margin-right: 0;
  }
`;
export const TitleWrapper = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #404f68;
`;
export const Divider = styled.div`
  height: calc(32px - 19px);
`;
export const OverLayer = styled.div`
  position: fixed;
  top: 84px;
  left: 0;
  z-index: 99;
  height: calc(100vh - 84px);
  width: 100vw;
`;
