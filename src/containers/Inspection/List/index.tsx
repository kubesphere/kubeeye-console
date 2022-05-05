import React from 'react';
import { Entity, Field, StatusDot, Progress, Collapse } from '@kubed/components';
import { Cluster, CaretRight, Shield } from '@kubed/icons';
import { useStore } from '@kubed/stook';
import { groupBy } from 'lodash';

import { ListContainer, ExpandContainer, ExpandItem } from './styles';

const { Panel } = Collapse;

interface ListProps {
  data: any;
}

const colorMap: Record<string, string> = {
  danger: 'error',
  dangerous: 'error',
  warning: 'warning',
  waring: 'warning',
};

const InspectionList: React.FC<ListProps> = ({ data }) => {
  const [, setDrawerOpen] = useStore('DrawerOpen');
  const openDrawer = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    setDrawerOpen(true);
  };

  const renderItemHeader = (itemData: any) => {
    const { resourceType, resourceInfos } = itemData;
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

    return (
      <Entity className="inspection-item">
        <CaretRight className="caret-indicator" />
        <Field
          avatar={<Cluster size={40} />}
          label="名称"
          value={resourceInfos.name}
          width="30%"
          className="avatar-field"
        />
        <Field label="类型" value={resourceType} width="20%" />
        <Field
          className="progress-container"
          label="检查项"
          value={<Progress size="xl" className="progress" sections={progressData} radius="xs" />}
          width="30%"
        />
      </Entity>
    );
  };

  const renderItemContent = (itemData: any) => {
    const { resourceInfos } = itemData;

    return (
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
  };

  return (
    <ListContainer>
      <Collapse accordion>
        {data.map((item: any, index: number) => {
          return (
            <Panel key={index} header={renderItemHeader(item)}>
              {renderItemContent(item)}
            </Panel>
          );
        })}
      </Collapse>
    </ListContainer>
  );
};

export default InspectionList;
