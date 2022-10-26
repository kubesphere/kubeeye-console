import styled from 'styled-components';

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
export const ReturnButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 20px;
  width: 50px;

  font-size: 12px;
  font-weight: 600;
  line-height: 20px;
  cursor: pointer;
  color: #242e42;
  :hover {
    color: #55bc8a;
  }
`;
export const CardWrapper = styled.div`
  border-radius: 4px;
  background-color: #fff;
  height: 466px;
  width: 1160px;
  margin-top: 20px;
  padding: 20px 32px 32px 32px;
`;
export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 1096px;
`;

export const PluginInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  flex: auto;
`;
export const PluginName = styled.div`
  font-size: 24px;
  font-weight: 600;
  line-height: 32px;
`;
export const PluginIntroduction = styled.div`
  font-size: 12px;
  font-weight: 400;
  height: 24px;
  line-height: 24px;
`;
export const DocLink = styled.div`
  font-size: 12px;
  font-weight: 400;
  height: 24px;
  line-height: 24px;
  width: 100px;
  margin-top: 2px;
  color: #329dce;
  cursor: pointer;

  :hover {
    text-decoration: underline;
  }
`;

export const ButtonWrapper = styled.div`
  margin-left: 24px;
`;

export const PluginInfoContent = styled.div`
  height: 312px;
  width: 1096px;
  background-color: #f9fbfd;
  padding: 32px;
  margin-top: 20px;
`;
