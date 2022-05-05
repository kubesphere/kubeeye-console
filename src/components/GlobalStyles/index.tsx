import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  html,
  body {
    background-color: #eff4f9;
    color: #242e42;
    line-height: 1.67;
  }
  
  a {
    color: #242e42;
    
    &:hover {
      color: #55bc8a;
    }
  }
  
  ul, li {
    margin: 0;
    padding: 0;
  }
  
  ::selection {
    background-color: #369a6a;
    color: #fff;
  }

  ::placeholder {
    font-weight: 400;
  }
  
  strong {
    font-weight: 500;
  }
  
  .kubed-icon__coloured {
    color: #00aa72;
    fill: #90e0c5;
  }

  .mt12 {
    margin-top: 12px;
  }

  .mr12 {
    margin-right: 12px;
  }
  
  .mb12 {
    margin-bottom: 12px;
  }

  .ml12 {
    margin-left: 12px;
  }
  
  .page-loading {
    display: inline-block;
    position: fixed;
    top: 50%;
    left: 50%;
    //transform: translate(-50%,-50%);
    margin-top: -16px;
    margin-left: -16px;
    z-index: 1000
  }

  .password-tip-dropdown {
    width: 350px;
    padding: 0 16px 16px;

    .tip-title {
      font-weight: 500;
    }
  }
  
  .tippy-box {
    &.tooltip {
      background-color: #404e68!important;
      .tippy-arrow {
        color: #404e68!important;
      }
    }
  }
`;

export default GlobalStyles;
