import React from 'react';
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import Navbar from '../../Navbar';

const Main = styled.div`
  padding-top: 84px;
  min-width: 1164px;
`;

const BaseLayout = () => {
  return (
    <>
      <Navbar />
      <Main>
        <Outlet />
      </Main>
    </>
  );
};

export default BaseLayout;
