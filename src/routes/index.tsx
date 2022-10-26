import React from 'react';
import { RouteObject } from 'react-router-dom';
import BaseLayout from '../components/layouts/Base';
import Inspection from '../containers/Inspection';
import PluginManager from '../containers/PluginManager';
import PluginList from '../containers/PluginManager/PluginList';
import PluginDetail from '../containers/PluginManager/PluginDetail';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <BaseLayout />,
    children: [
      {
        index: true,
        element: <Inspection />,
      },
      {
        path: 'plugins',
        element: <PluginManager />,
        children: [
          {
            index: true,
            element: <PluginList />,
          },
          {
            path: ':pluginname',
            element: <PluginDetail />,
          },
        ],
      },
    ],
  },
];

export default routes;
