import React from 'react';
import { PieChart, Pie, Cell, Tooltip as ChartTooltip } from 'recharts';
import styled from 'styled-components';
import { Tooltip } from '@kubed/components';
import { Information } from '@kubed/icons';
import useInspectionStore from '../../../stores/inspection';

const Wrapper = styled.div`
  position: relative;
  .recharts-tooltip-wrapper {
    z-index: 99;
  }
`;

const PointsWrapper = styled.div`
  position: absolute;
  top: 100px;
  left: 135px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .points {
    color: ${({ theme }) => theme.palette.background};
    font-weight: 600;
    font-size: 40px;
    line-height: 48px;
  }

  .description {
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${({ theme }) => theme.palette.accents_5};
    font-size: 12px;
  }
`;

const data = [
  { name: '正常项', value: 120 },
  { name: '告警项', value: 46 },
  { name: '危险项', value: 13 },
];
const COLORS = ['#55bc8a', '#F5A623', '#CA2621'];

const OverviewChart = () => {
  const { inspectionStore } = useInspectionStore();
  const { scoreInfo } = inspectionStore;
  const { passing, warning, dangerous, score } = scoreInfo;

  const chartData = [
    { name: '正常项', value: passing },
    { name: '告警项', value: warning },
    { name: '危险项', value: dangerous },
  ];

  return (
    <Wrapper>
      <PieChart width={330} height={260}>
        <Pie
          data={chartData}
          innerRadius={70}
          outerRadius={100}
          paddingAngle={0}
          cy={130}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <ChartTooltip />
      </PieChart>
      <PointsWrapper>
        <span className="points">{score}</span>
        <span className="description">
          健康评分
          <Tooltip
            content="集群健康状态评级是对基础架构可靠性和性能风险的评估。分数范围为1~100"
            maxWidth={229}
            className="tooltip"
          >
            <Information />
          </Tooltip>
        </span>
      </PointsWrapper>
    </Wrapper>
  );
};

export default OverviewChart;
