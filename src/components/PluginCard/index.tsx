import React, { useRef, MouseEvent } from 'react';
import InstallSwitch from '../InstallSwitch';
import DropdownMenu from '../DropdownMenu';
import Image from '../Image';
import { PluginInfo } from '../../libs/types';
import {
  Wrapper,
  PluginTitle,
  IconWrapper,
  ButtonWrapper,
  PluginName,
  Introduction,
  Footer,
} from './styles';

interface Props extends PluginInfo {
  installStateSwitchHandler: (name: string) => void;
  triggerAuditHandler: (name: string) => void;
  toDetail: (name: string) => void;
}

const PluginCard = ({
  name,
  introduction,
  installState,
  lastUpdateDate,
  installStateSwitchHandler,
  triggerAuditHandler,
  toDetail,
}: Props) => {
  const buttonRef = useRef<HTMLDivElement>(null);

  const clickHandler = (event: MouseEvent) => {
    if (buttonRef.current?.contains(event.target as Node)) {
      return;
    }
    toDetail(name);
  };

  return (
    <Wrapper onClick={clickHandler}>
      <PluginTitle>
        <IconWrapper>
          <Image iconLetter={name} iconSize={48} />
        </IconWrapper>
        <ButtonWrapper
          ref={buttonRef}
          hide={installState === 'uninstalled' || installState === 'installing'}
        >
          {installState === 'uninstalled' || installState === 'installing' ? (
            <InstallSwitch
              state={installState}
              onClick={() => {
                installStateSwitchHandler(name);
              }}
            />
          ) : (
            <DropdownMenu
              triggerAuditHandler={() => {
                triggerAuditHandler(name);
              }}
              uninstallHandler={() => {
                installStateSwitchHandler(name);
              }}
            />
          )}
        </ButtonWrapper>
      </PluginTitle>

      <PluginName>{name}</PluginName>
      <Introduction>{introduction}</Introduction>
      <Footer>最近更新时间: {lastUpdateDate}</Footer>
    </Wrapper>
  );
};

export default PluginCard;
