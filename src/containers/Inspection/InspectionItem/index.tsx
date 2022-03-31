import React from 'react';
import { Entity, Field, StatusDot, Progress } from '@kubed/components';
import { Cluster, CaretRight, Shield } from '@kubed/icons';
import { useStore } from '@kubed/stook';
import { groupBy } from 'lodash';
import { ExpandContainer, ExpandItem, ItemContainer } from './styles';

interface InspectionItemProps {
  info: any;
}

const colorMap: Record<string, string> = {
  danger: 'error',
  dangerous: 'error',
  warning: 'warning',
  waring: 'warning',
};

const InspectionItem = ({ info }: InspectionItemProps) => {
  const [, setDrawerOpen] = useStore('DrawerOpen');
  const { resourceType, resourceInfos } = info;

  const openDrawer = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    setDrawerOpen(true);
  };

  // const closeDrawer = () => {
  //   setDrawerOpen(false);
  // };

  const totalCount = resourceInfos.items.length;
  const grouped = groupBy(resourceInfos.items, 'level');
  const progressData = Object.keys(grouped).map(key => {
    const items = grouped[key];
    return {
      label: key,
      value: (items.length / totalCount) * 100,
      color: colorMap[key] || key,
    };
  });

  const expandContent = (
    <ExpandContainer>
      {resourceInfos.items.map((item: any) => (
        <ExpandItem key={item.message} onClick={openDrawer}>
          <div className="item-title">
            <Shield size={20} />
            <span>{item.message}</span>
          </div>
          <StatusDot color={colorMap[item.level] || item.level}>{item.level}</StatusDot>
        </ExpandItem>
      ))}
    </ExpandContainer>
  );

  return (
    <ItemContainer>
      <Entity className="inspection-item" hoverable expandable expandContent={expandContent}>
        <Field avatar={<CaretRight />} width="20px" className="caret-indicator" />
        <Field avatar={<Cluster size={40} />} label="名称" value={resourceInfos.name} width="30%" />
        <Field label="类型" value={resourceType} width="20%" />
        <Field
          className="progress-container"
          label="检查项"
          value={<Progress size="xl" className="progress" sections={progressData} radius="xs" />}
          width="30%"
        />
      </Entity>
    </ItemContainer>
  );
};

export default InspectionItem;
