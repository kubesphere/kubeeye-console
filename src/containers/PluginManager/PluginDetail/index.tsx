import React from 'react';
import { useParams, useNavigate, useLocation, useOutletContext } from 'react-router-dom';
import { Notify, Button, Empty } from '@kubed/components';
import { Return } from '@kubed/icons';
import InstallSwitch from '../../../components/InstallSwitch';
import Image from '../../../components/Image';
import { PluginInfo, ContextType, LocationStateType } from '../../../libs/types';
import { CenterWrapper, Wrapper } from '../styles';
import {
  ContentWrapper,
  ReturnButton,
  CardWrapper,
  TitleWrapper,
  PluginInfoWrapper,
  PluginName,
  PluginIntroduction,
  DocLink,
  ButtonWrapper,
  PluginInfoContent,
} from './styles';

const PluginDetail = () => {
  const { installStateSwitchHandler, getPluginInfo, triggerAuditHandler } =
    useOutletContext<ContextType>();
  const { pluginname } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationStateType;

  const pluginInfo = pluginname ? (getPluginInfo(pluginname) as PluginInfo) : undefined;
  if (!pluginInfo) {
    return (
      <CenterWrapper>
        <Empty title={'插件未找到'} description={'插件未找到'} />
      </CenterWrapper>
    );
  }

  return (
    <Wrapper>
      <ContentWrapper>
        <ReturnButton
          onClick={() => {
            if (state && 'yOffset' in state) {
              navigate('/plugins', {
                state: { yOffset: state.yOffset },
              });
            } else {
              navigate('/plugins');
            }
          }}
        >
          <Return style={{ color: 'inherit' }} />
          返回
        </ReturnButton>

        <CardWrapper>
          <TitleWrapper>
            <Image iconLetter={pluginInfo.name} iconSize={64} />
            <PluginInfoWrapper>
              <PluginName>{pluginInfo.name}</PluginName>
              <PluginIntroduction>{pluginInfo.introduction}</PluginIntroduction>
              <DocLink>查看文档</DocLink>
            </PluginInfoWrapper>

            {pluginInfo.installState === 'installed' ? (
              <Button
                color="secondary"
                shadow
                onClick={() => {
                  triggerAuditHandler(pluginInfo.name);
                }}
              >
                启动巡检
              </Button>
            ) : null}
            <ButtonWrapper>
              <InstallSwitch
                state={pluginInfo.installState}
                onClick={() => {
                  installStateSwitchHandler(pluginInfo.name);
                }}
              />
            </ButtonWrapper>
          </TitleWrapper>

          <PluginInfoContent>暂无介绍</PluginInfoContent>
        </CardWrapper>
        <Notify />
      </ContentWrapper>
    </Wrapper>
  );
};

export default PluginDetail;
