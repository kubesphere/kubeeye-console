import styled from 'styled-components';

export const InspectionContainer = styled.div`
  max-width: 100%;
  width: 1160px;
  margin: 0 auto;
  padding-bottom: 50px;
`;

export const OverviewContainer = styled.div`
  display: flex;
  margin-top: 20px;

  .cluster-card {
    display: flex;
    flex-direction: column;
  }
`;

export const ClusterStatus = styled.div`
  display: flex;
  width: 740px;
  height: 332px;
  margin-right: 12px;

  & > div {
    width: 100%;
  }
`;

export const StatusContent = styled.div`
  display: flex;
  flex-grow: 1;
  background-color: ${({ theme }) => theme.palette.accents_8};
  border-radius: 4px;

  .chart-container {
    width: 344px;
    .recharts-sector {
      stroke: none;
    }
  }

  .status-items {
    display: flex;
    flex-direction: column;
    width: 320px;
    margin: 38px;
    margin-left: 0;
  }

  .status-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 40px;
    padding: 0 16px;
    margin-bottom: 8px;
    border-radius: 4px;
    color: ${({ theme }) => theme.palette.background};
    background-color: ${({ theme }) => theme.palette.accents_7};
  }

  .status-count {
    font-weight: 500;
    font-size: 20px;
    color: rgba(255, 255, 255, 0.9);
  }

  .status-dot {
    *:nth-child(2) {
      color: ${({ theme }) => theme.palette.background};
    }
  }
`;

export const ClusterInfo = styled.div`
  display: flex;
  width: 408px;
  height: 332px;

  & > div {
    width: 100%;
  }
`;

export const ClusterInfoContent = styled.div`
  display: flex;
  flex-direction: column;

  .info-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 44px;
    padding: 10px 16px;
    margin-bottom: 8px;
    border-radius: 4px;
    color: ${({ theme }) => theme.palette.background};
    background-color: ${({ theme }) => theme.palette.accents_0};

    span:nth-child(1) {
      color: ${({ theme }) => theme.palette.accents_5};
      font-weight: 600;
    }
    span:nth-child(2) {
      color: ${({ theme }) => theme.palette.accents_8};
      font-weight: 500;
    }
  }
`;

export const ClusterCardTitle = styled.div`
  font-weight: 600;
  font-size: 14px;
  color: ${({ theme }) => theme.palette.accents_8};
  margin-bottom: 12px;
`;

export const MainContent = styled.div`
  position: relative;
  margin-top: 20px;

  .inspection-tabs {
    & > div:nth-child(1) {
      width: 100%;
      height: 48px;
      border-radius: 4px;
      background-color: ${({ theme }) => theme.palette.accents_8};
      padding: 0 14px;
    }

    .tab-item {
      line-height: 32px;
      min-width: 96px;
      flex-basis: auto;

      label {
        color: #fff;
        font-weight: 600;
        transition: all 0.3s ease;
        &:hover {
          color: #55bc8a;
        }
      }
    }
    .tab-item__active {
      background-color: #55bc8a;
      box-shadow: 0 8px 16px 0 rgb(85 188 138 / 36%);
      color: #fff;
      font-weight: 500;
      border-radius: 4px;
      border-color: #55bc8a;
      label {
        &:hover {
          color: #fff;
        }
      }
    }
  }
`;

export const InspectionList = styled.div`
  padding: 12px;
  background-color: ${({ theme }) => theme.palette.accents_0};

  .inspection-item {
    padding: 18px 12px;
    margin-bottom: 8px;
  }

  .expand-container {
    background-color: ${({ theme }) => theme.palette.background};
    box-shadow: none;
    //bottom: 2px;
  }
`;
