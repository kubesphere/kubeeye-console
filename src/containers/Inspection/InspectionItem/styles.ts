import styled from 'styled-components';

export const ItemContainer = styled.div`
  margin-bottom: 8px;

  .progress-container {
    .field-content {
      width: 100%;
      padding: 0 20px;
    }
  }

  .progress {
    margin-bottom: 4px;
  }

  .caret-indicator {
    .kubed-icon {
      transition: transform 0.3s ease-in-out;
    }
  }

  div[aria-expanded='true'] {
    .caret-indicator {
      .kubed-icon {
        transform: rotate(90deg);
      }
    }
  }
`;

export const ExpandContainer = styled.div`
  max-height: 360px;
  overflow-y: auto;
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
