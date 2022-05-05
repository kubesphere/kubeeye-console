import React from 'react';
import styled from 'styled-components';
import { useStore } from '@kubed/stook';
import { Tag, StatusDot } from '@kubed/components';
import { Close, Clock } from '@kubed/icons';
import cx from 'classnames';
import ReactMarkdown from 'react-markdown';

const demoMd = `
## 描述

Kubernetes 通常会在工作节点上缓存图像。默认情况下，仅当图像尚未缓存在尝试运行它的节点上时才会被拉取。

但是，利用 Docker 映像的缓存版本可能是一个可靠性问题。它可能导致不同的图像在不同的节点上运行，从而导致行为不一致。这也可能是一个安全问题，因为工作负载可以访问缓存的映像，即使它没有访问远程 Docker 存储库的权限（通过imagePullSecret）。

指定 pullPolicy=Always 将通过确保每次创建新 pod 时下载最新图像来防止这些问题。

## 参考

[查看文档 ->](https://kubernetes.io/docs/concepts/containers/images/)

## 如何解决

在您的 Pod 规范中，设置 [imagePullPolicy](https://kubernetes.io/docs/concepts/containers/images/) 为 [Always](#always)。

`;

const DrawerWrapper = styled.div`
  position: absolute;
  top: 60px;
  right: 0;
  width: 0;
  height: 100%;
  //min-height: 900px;
  background-color: ${({ theme }) => theme.palette.accents_1};
  z-index: 9999;
  border-radius: 4px;
  padding: 0;
  box-shadow: 0 4px 8px 0 rgb(36 46 66 / 20%);
  transition: width 0.3s ease;
  overflow: hidden;
  min-height: 750px;

  &.is-open {
    width: 454px;
    padding: 12px;
  }
`;

const DrawerInner = styled.div`
  position: relative;
  background-color: ${({ theme }) => theme.palette.background};
  width: 100%;
  height: 100%;
  padding: 20px 0;
  border-radius: 4px;
`;

const CloseButton = styled.a`
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 99;
`;

const Header = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #e4ebf1;
  padding: 0 12px 16px;

  .title {
    position: relative;
    display: flex;
    align-items: center;
    font-weight: 600;
    font-size: 20px;
    line-height: 28px;
    color: ${({ theme }) => theme.palette.accents_8};
  }

  .title-tag {
    //position: absolute;
    //top: 0;
    //right: 5px;
    margin-left: 8px;
    font-size: 12px;
  }

  .time {
    display: flex;
    align-items: center;
    margin-top: 8px;
    color: ${({ theme }) => theme.palette.accents_5};
  }
`;

const Body = styled.div`
  padding: 24px 12px;

  h2 {
    font-size: 14px;
  }

  p {
    font-size: 14px;
    line-height: 20px;
    color: ${({ theme }) => theme.palette.accents_8};
    margin: 8px 0;
  }
`;

const Drawer = () => {
  const [drawerOpen, setDrawerOpen] = useStore('DrawerOpen');

  const closeDrawer = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    setDrawerOpen(false);
  };

  return (
    <DrawerWrapper className={cx({ 'is-open': drawerOpen })}>
      <DrawerInner>
        <CloseButton onClick={closeDrawer}>
          <Close size={20} />
        </CloseButton>
        <Header>
          <div className="title">
            应设置图像拉取策略为“始终”{' '}
            <Tag color="warning" className="title-tag">
              <StatusDot color="warning" style={{ marginRight: '6px' }} />
              告警
            </Tag>
          </div>
          <div className="time">
            <Clock />
            发现时间：1 分钟前
          </div>
        </Header>
        <Body>
          <ReactMarkdown>{demoMd}</ReactMarkdown>
        </Body>
      </DrawerInner>
    </DrawerWrapper>
  );
};

export default Drawer;
