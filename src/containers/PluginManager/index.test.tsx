import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import WS from 'jest-websocket-mock';
import { KubedConfigProvider, CssBaseline } from '@kubed/components';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PluginManager from './index';
import PluginList from './PluginList';
import PluginDetail from './PluginDetail';

// manually mock window.matchMedia to avoid error in test
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

const TestApp = () => {
  return (
    <KubedConfigProvider>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PluginManager />}>
            <Route index element={<PluginList />}></Route>
            <Route path="plugins/:pluginname" element={<PluginDetail />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </KubedConfigProvider>
  );
};

const dummyData = {
  items: [
    {
      metadata: {
        name: 'fakeplugin1',
        resourceVersion: '123456',
        creationTimestamp: '2021-08-09T08:00:00Z',
        managedFields: [
          {
            time: '2021-08-09T08:00:00Z',
          },
        ],
      },
      spec: {
        enabled: true,
      },
      status: {
        state: 'installed',
      },
    },
    {
      metadata: {
        name: 'fakeplugin2',
        resourceVersion: '123456',
        creationTimestamp: '2021-08-09T08:00:00Z',
        managedFields: [
          {
            time: '2021-08-09T08:00:00Z',
          },
        ],
      },
      spec: {
        enabled: true,
      },
      status: {
        state: 'installed',
      },
    },
  ],
};

const server = setupServer(
  rest.get('/apis/kubeeyeplugins.kubesphere.io/v1alpha1/pluginsubscriptions', (req, res, ctx) => {
    return res(ctx.json({}));
  }),
  rest.put(
    '/apis/kubeeyeplugins.kubesphere.io/v1alpha1/pluginsubscriptions/:name',
    async (req, res, ctx) => {
      const { name } = req.params;
      const payload = await req.json();
      var dummyItem = dummyData.items.find(item => item.metadata.name === name);
      if (dummyItem) {
        if (payload.spec.enabled) {
          dummyItem.spec.enabled = true;
          dummyItem.status.state = 'installing';
        } else {
          dummyItem.spec.enabled = false;
          dummyItem.status.state = 'uninstalling';
        }
      }
      return res(ctx.json(dummyItem));
    },
  ),
);
const ws = new WS('ws://localhost/apis/kubeeyeplugins.kubesphere.io/v1alpha1/pluginsubscriptions', {
  jsonProtocol: true,
});

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => {
  server.close();
  ws.close();
});

it('empty page', async () => {
  render(<TestApp />);
  await waitFor(() => {
    expect(screen.getAllByText(/暂无插件/)).toBeTruthy();
  });
});

it('plugin cards title test', async () => {
  server.use(
    rest.get('/apis/kubeeyeplugins.kubesphere.io/v1alpha1/pluginsubscriptions', (req, res, ctx) => {
      return res(ctx.json(dummyData));
    }),
  );
  dummyData.items[0].spec.enabled = false;
  dummyData.items[0].status.state = 'uninstalled';
  dummyData.items[1].spec.enabled = false;
  dummyData.items[1].status.state = 'uninstalled';
  render(<TestApp />);
  await waitFor(() => {
    expect(screen.getAllByText(/fakeplugin1/)).toBeTruthy();
    expect(screen.getAllByText(/fakeplugin2/)).toBeTruthy();
    expect(screen.getAllByText(/全部/)).toBeTruthy();
  });
  dummyData.items[0].spec.enabled = true;
  dummyData.items[0].status.state = 'installed';
  render(<TestApp />);
  await waitFor(() => {
    expect(screen.getAllByText(/已安装/)).toBeTruthy();
    expect(screen.getAllByText(/未安装/)).toBeTruthy();
  });
});

it('renders a plugin with installing state', async () => {
  dummyData.items[0].status.state = 'installing';
  server.use(
    rest.get('/apis/kubeeyeplugins.kubesphere.io/v1alpha1/pluginsubscriptions', (req, res, ctx) => {
      return res(ctx.json({ items: [dummyData.items[0]] }));
    }),
  );
  render(<TestApp />);
  await ws.connected;
  dummyData.items[0].status.state = 'installed';
  ws.send({ object: dummyData.items[0] });
  await waitFor(() => {
    expect(screen.getByText(/已安装/)).toBeTruthy();
  });
});

it('installation and uninstallation function test', async () => {
  const dummyItem = dummyData.items[0];
  dummyItem.spec.enabled = false;
  dummyItem.status.state = 'uninstalled';
  server.use(
    rest.get('/apis/kubeeyeplugins.kubesphere.io/v1alpha1/pluginsubscriptions', (req, res, ctx) => {
      return res(ctx.json({ items: [dummyItem] }));
    }),
  );
  render(<TestApp />);
  await waitFor(() => {
    expect(screen.getByText(/全部/)).toBeTruthy();
  });
  fireEvent.click(screen.getByRole('button', { name: /安装/ }));
  await ws.connected;
  dummyItem.status.state = 'installed';
  ws.send({ object: dummyItem });
  await waitFor(() => {
    expect(screen.getByText(/已安装/)).toBeTruthy();
  });
  fireEvent.click(screen.getByRole('button', { expanded: false }));
  fireEvent.click(screen.getByRole('button', { name: /卸载/ }));
  await ws.connected;
  dummyItem.status.state = 'uninstalled';
  ws.send({ object: dummyItem });
  await waitFor(() => {
    expect(screen.getByText(/全部/)).toBeTruthy();
  });
});

it('plugin detail test', async () => {
  const dummyItem = dummyData.items[0];
  dummyItem.spec.enabled = false;
  dummyItem.status.state = 'uninstalled';
  server.use(
    rest.get('/apis/kubeeyeplugins.kubesphere.io/v1alpha1/pluginsubscriptions', (req, res, ctx) => {
      return res(ctx.json({ items: [dummyItem] }));
    }),
  );
  render(<TestApp />);
  const card = await screen.findByText(/fakeplugin1/);
  fireEvent.click(card);
  await waitFor(() => {
    expect(screen.getByText(/返回/)).toBeTruthy();
    expect(screen.getByRole('button', { name: /安装/ })).toBeTruthy();
  });
  fireEvent.click(screen.getByRole('button', { name: /安装/ }));
  await ws.connected;
  dummyItem.status.state = 'installed';
  ws.send({ object: dummyItem });
  await waitFor(() => {
    expect(screen.getByRole('button', { name: /卸载/ })).toBeTruthy();
    expect(screen.getByRole('button', { name: /启动巡检/ })).toBeTruthy();
  });
});
