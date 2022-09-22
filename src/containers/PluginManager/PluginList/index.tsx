import React, { useLayoutEffect } from 'react';
import { useNavigate, useLocation, useOutletContext } from 'react-router-dom';
import { Notify, LoadingOverlay, Empty } from '@kubed/components';
import { useScrollLock } from '@kubed/hooks';
import PluginCard from '../../../components/PluginCard';
import { PluginInfo, LocationStateType, ContextType } from '../../../libs/types';
import {
  ContentWrapper,
  ListWrapper,
  ItemWrapper,
  TitleWrapper,
  Divider,
  OverLayer,
} from './styles';
import { CenterWrapper, Wrapper } from '../styles';

const PluginList = () => {
  const { getPluginInfo, installStateSwitchHandler, triggerAuditHandler } =
    useOutletContext<ContextType>();
  const [, setScrollLocked] = useScrollLock();
  const plugins = getPluginInfo() as PluginInfo[];
  const installedPlugins: React.ReactNode[] = [];
  const uninstalledPlugins: React.ReactNode[] = [];
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationStateType;

  const toDetail = (name: string) => {
    navigate('/plugins/' + name, { state: { yOffset: window.scrollY } });
  };

  if (plugins.length == 0) {
    return (
      <CenterWrapper>
        <Empty title={'暂无插件'} description={'暂无插件'} />
      </CenterWrapper>
    );
  }

  let loading = false;
  plugins.forEach(({ name, introduction, installState, lastUpdateDate }) => {
    if (installState === 'installed' || installState === 'uninstalling') {
      installedPlugins.push(
        <ItemWrapper key={name}>
          <PluginCard
            key={name}
            name={name}
            introduction={introduction}
            installState={installState}
            lastUpdateDate={lastUpdateDate}
            installStateSwitchHandler={installStateSwitchHandler}
            triggerAuditHandler={triggerAuditHandler}
            toDetail={toDetail}
          />
        </ItemWrapper>,
      );
      if (installState === 'uninstalling') {
        loading = true;
      }
    } else if (installState === 'uninstalled' || installState === 'installing') {
      uninstalledPlugins.push(
        <ItemWrapper key={name}>
          <PluginCard
            key={name}
            name={name}
            introduction={introduction}
            installState={installState}
            lastUpdateDate={lastUpdateDate}
            installStateSwitchHandler={installStateSwitchHandler}
            triggerAuditHandler={triggerAuditHandler}
            toDetail={toDetail}
          />
        </ItemWrapper>,
      );
      if (installState === 'installing') {
        loading = true;
      }
    }
  });

  useLayoutEffect(() => {
    if (state && 'yOffset' in state) {
      window.scrollTo(0, state.yOffset as number);
      delete state.yOffset;
    }
    setScrollLocked(loading);
  }, [loading]);

  return (
    <Wrapper>
      <ContentWrapper>
        {installedPlugins.length > 0 ? (
          <>
            <TitleWrapper>已安装</TitleWrapper>
            <ListWrapper>{installedPlugins}</ListWrapper>
            <Divider />
          </>
        ) : null}
        <TitleWrapper>
          {installedPlugins.length > 0 && uninstalledPlugins.length > 0
            ? '未安装'
            : uninstalledPlugins.length > 0
            ? '全部'
            : ''}
        </TitleWrapper>
        <ListWrapper>{uninstalledPlugins}</ListWrapper>
      </ContentWrapper>

      <Notify />
      {loading ? (
        <OverLayer>
          <LoadingOverlay visible overlayOpacity={0.5} />
        </OverLayer>
      ) : null}
    </Wrapper>
  );
};

export default PluginList;
