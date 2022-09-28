import styled from 'styled-components';

export const ListContainer = styled.div`
  padding: 12px;
  background-color: ${({ theme }) => theme.palette.accents_0};

  .kubed-collapse-item {
    border: 1px solid transparent;
    margin-bottom: 8px;
    background-color: ${({ theme }) => theme.palette.background};
    transition: all 0.3s ease-in-out;

    &:hover {
      border: 1px solid ${({ theme }) => theme.palette.accents_5};
      box-shadow: 0 4px 8px 0 rgb(36 46 66 / 20%);
      border-radius: 4px;

      .inspection-item {
        border: 1px solid transparent;
      }
    }
  }

  .kubed-collapse-item-active {
    border: 1px solid ${({ theme }) => theme.palette.accents_5};
    box-shadow: 0 4px 8px 0 rgb(36 46 66 / 20%);
    border-radius: 4px;
    .inspection-item {
      border-color: transparent;
      box-shadow: none;
    }

    .caret-indicator {
      transform: rotate(90deg);
    }
  }

  .inspection-item {
    padding: 18px;

    .progress-container {
      .field-content {
        width: 100%;
        padding: 0 20px;
      }
    }

    .progress {
      margin-bottom: 4px;
    }

    .entity-main {
      position: relative;
    }

    .avatar-field {
      margin-left: 25px;

      .field-value {
        overflow: hidden;
        height: 20px;
      }
    }

    .caret-indicator {
      position: absolute;
      top: 11px;
      left: 0;
      transition: transform 0.3s ease-in-out;
    }
  }
`;

export const ExpandContainer = styled.div`
  max-height: 360px;
  overflow-y: auto;
  padding-top: 8px;
`;

export const ExpandItem = styled.div`
  display: flex;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.palette.accents_0};
  padding: 0 16px;
  height: 36px;
  margin-bottom: 8px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.palette.accents_1};
  }

  .item-title {
    display: inline-flex;
    min-width: 280px;
    width: 35%;
    align-items: center;
    font-weight: 600;
    span {
      margin-left: 12px;
      color: ${({ theme }) => theme.palette.accents_7};
    }
  }
`;
