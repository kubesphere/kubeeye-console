import React from 'react';
import { RouteObject } from 'react-router-dom';
import BaseLayout from '../components/layouts/Base';
import Inspection from '../containers/Inspection';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <BaseLayout />,
    children: [
      {
        index: true,
        element: <Inspection />,
      },
    ],
  },
];

export default routes;
