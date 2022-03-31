import React from 'react';
import { Card, StatusDot, Tabs, Tab, Empty } from '@kubed/components';
import { Project } from '@kubed/icons';
import { useStore } from '@kubed/stook';
import useInspectionStore from '../../stores/inspection';
import {
  InspectionContainer,
  OverviewContainer,
  ClusterInfo,
  ClusterStatus,
  ClusterCardTitle,
  StatusContent,
  ClusterInfoContent,
  MainContent,
  InspectionList,
} from './styles';

import InspectionItem from './InspectionItem';
import OverviewChart from './OverviewChart';
import Drawer from './Drawer';

const Inspection = () => {
  useStore<boolean>('DrawerOpen', false);
  const { watch, inspectionStore } = useInspectionStore();
  watch('clusterinsight-sample');
  const { scoreInfo, clusterInfo, auditResults } = inspectionStore;
  const { passing, warning, dangerous, total } = scoreInfo;
  const { version, workloadsCount, nodesCount, namespacesCount } = clusterInfo;
  const { project, cluster } = auditResults;

  const clusterData = (cluster[0] && cluster[0].resultInfos) || [];
  let projectData: any[] = [];
  project.forEach((item: any) => {
    const { resultInfos } = item;
    projectData = projectData.concat(resultInfos);
  });

  return (
    <InspectionContainer>
      <OverviewContainer>
        <ClusterStatus>
          <Card padding={20} contentClassName="cluster-card">
            <ClusterCardTitle>集群健康状态</ClusterCardTitle>
            <StatusContent>
              <div className="chart-container">
                <OverviewChart />
              </div>
              <div className="status-items">
                <div className="status-item">
                  <span style={{ fontSize: '16px', fontWeight: 600 }}>健康检查项</span>
                  <span className="status-count">{total}</span>
                </div>
                <div className="status-item">
                  <StatusDot color="success" className="status-dot">
                    正常项
                  </StatusDot>
                  <span className="status-count">{passing}</span>
                </div>
                <div className="status-item">
                  <StatusDot color="warning" className="status-dot">
                    告警项
                  </StatusDot>
                  <span className="status-count">{warning}</span>
                </div>
                <div className="status-item">
                  <StatusDot color="error" className="status-dot">
                    危险项
                  </StatusDot>
                  <span className="status-count">{dangerous}</span>
                </div>
              </div>
            </StatusContent>
          </Card>
        </ClusterStatus>
        <ClusterInfo>
          <Card padding={20}>
            <ClusterCardTitle>集群信息</ClusterCardTitle>
            <ClusterInfoContent>
              <div className="info-item">
                <span>Kubernetes 版本</span>
                <span>v{version}</span>
              </div>
              <div className="info-item">
                <span>集群节点</span>
                <span>{nodesCount}</span>
              </div>
              <div className="info-item">
                <span>项目</span>
                <span>{namespacesCount}</span>
              </div>
              <div className="info-item">
                <span>工作负载</span>
                <span>{workloadsCount}</span>
              </div>
              <div className="info-item">
                <span>容器组</span>
                <span>9</span>
              </div>
            </ClusterInfoContent>
          </Card>
        </ClusterInfo>
      </OverviewContainer>
      <MainContent>
        <Tabs className="inspection-tabs" variant="outline">
          <Tab label="集群检查" key="one">
            <Card>
              {clusterData.length === 0 ? (
                <Empty
                  style={{ padding: '20px' }}
                  title="暂无检查项"
                  description="暂无检查项"
                  image={<Project size={48} />}
                />
              ) : (
                <InspectionList>
                  {clusterData.map((item: any, index: number) => (
                    <InspectionItem key={index} info={item} />
                  ))}
                </InspectionList>
              )}
            </Card>
          </Tab>
          <Tab label="项目检查" key="two">
            <Card>
              {projectData.length === 0 ? (
                <Empty
                  style={{ padding: '20px' }}
                  title="暂无检查项"
                  description="暂无检查项"
                  image={<Project size={48} />}
                />
              ) : (
                <InspectionList>
                  {projectData.map((resultInfo: any, index: number) => (
                    <InspectionItem key={index} info={resultInfo} />
                  ))}
                </InspectionList>
              )}
            </Card>
          </Tab>
        </Tabs>
        <Drawer />
      </MainContent>
    </InspectionContainer>
  );
};

export default Inspection;
