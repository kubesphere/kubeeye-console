import React from 'react';
import axios from 'axios';
import { useReducer, useEffect, useState, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import { notify, Loading } from '@kubed/components';
import { useUnmount } from '@kubed/hooks';
import { CenterWrapper } from './styles';
import { PluginInfo, Action, InstallState } from '../../libs/types';
import { get } from 'lodash';
import { getWebSocketProtocol } from '../../libs/utils';

function reducer(data: Map<string, PluginInfo>, action: Action): Map<string, PluginInfo> {
  const pluginInfo = data.get(action.payload.name);
  switch (action.type) {
    case 'APPEND':
      if (action.payload.pluginInfo) {
        return data.set(action.payload.name, action.payload.pluginInfo);
      }
      return data;
    case 'UPDATE':
      if (pluginInfo && action.payload.installState) {
        pluginInfo.installState = action.payload.installState;
        if (action.payload.resourceVersion) {
          pluginInfo.resourceVersion = action.payload.resourceVersion;
        }
        return new Map(data.set(action.payload.name, pluginInfo));
      }
      return data;
    default:
      return data;
  }
}

function watch(name: string, version: string, expectState: 'installed' | 'uninstalled') {
  return new Promise<string>((resolve, reject) => {
    const wsUrl = `${getWebSocketProtocol(window.location.protocol)}://${
      window.location.host
    }/apis/kubeeyeplugins.kubesphere.io/v1alpha1/pluginsubscriptions?\
fieldSelector=metadata.name=${name}&resourceVersion=${version}&watch=true`;
    const error = () => {
      reject();
    };
    const receive = (res: any) => {
      const data = JSON.parse(res.data);
      const { state } = get(data, 'object.status');
      const { resourceVersion } = get(data, 'object.metadata');
      if (state && resourceVersion) {
        if (state == expectState) {
          resolve(resourceVersion);
        }
      }
    };
    const wsClient = new WebSocket(wsUrl);
    wsClient.onerror = error;
    wsClient.onmessage = receive;
  });
}

async function updatePluginCR(name: string, enabled: boolean, resourceVersion: string) {
  const res = await axios.put(
    `/apis/kubeeyeplugins.kubesphere.io/v1alpha1/pluginsubscriptions/${name}`,
    {
      apiVersion: 'kubeeyeplugins.kubesphere.io/v1alpha1',
      kind: 'PluginSubscription',
      metadata: {
        name: name,
        resourceVersion: resourceVersion,
      },
      spec: {
        enabled: enabled,
      },
    },
  );
  return watch(name, res.data.metadata.resourceVersion, enabled ? 'installed' : 'uninstalled');
}

const PluginManager = () => {
  const [data, dispatch] = useReducer(reducer, new Map<string, PluginInfo>());
  const [loading, setLoading] = useState(true);
  const promiseCancelfnRef = useRef<() => void>();

  const makeCancelablePromise = (promise: Promise<string>) => {
    let hasCanceled = false;
    const wrappedPromise: Promise<string> = new Promise((resolve, reject) => {
      promise
        .then(val => {
          if (!hasCanceled) {
            resolve(val);
          }
        })
        .catch(() => {
          if (!hasCanceled) {
            reject();
          }
        });
    });

    promiseCancelfnRef.current = () => {
      hasCanceled = true;
    };

    return wrappedPromise;
  };

  useUnmount(() => {
    promiseCancelfnRef.current?.();
  });

  const getInstallState = (state: string, spec: boolean): InstallState => {
    if (spec) {
      return state === 'installed' ? 'installed' : 'installing';
    } else {
      return state === 'uninstalled' ? 'uninstalled' : 'uninstalling';
    }
  };

  useEffect(() => {
    axios
      .get('/apis/kubeeyeplugins.kubesphere.io/v1alpha1/pluginsubscriptions?limit=500')
      .then(res => {
        res.data.items.forEach((item: any) => {
          const pluginInfo: PluginInfo = {
            name: item.metadata.name,
            introduction: '暂无简介',
            installState: getInstallState(item.status?.state, item.spec.enabled),
            lastUpdateDate:
              item.metadata.managedFields[item.metadata.managedFields.length - 1].time.split(
                'T',
              )[0],
            resourceVersion: item.metadata.resourceVersion,
          };
          dispatch({
            type: 'APPEND',
            payload: { name: item.metadata.name, pluginInfo: pluginInfo },
          });

          if (
            pluginInfo.installState === 'installing' ||
            pluginInfo.installState === 'uninstalling'
          ) {
            const expectState =
              pluginInfo.installState === 'installing' ? 'installed' : 'uninstalled';
            makeCancelablePromise(watch(pluginInfo.name, pluginInfo.resourceVersion!, expectState))
              .then(resourceVersion => {
                dispatch({
                  type: 'UPDATE',
                  payload: {
                    name: pluginInfo.name,
                    installState: expectState,
                    resourceVersion: resourceVersion,
                  },
                });
              })
              .catch(() => {
                dispatch({
                  type: 'UPDATE',
                  payload: {
                    name: pluginInfo.name,
                    installState:
                      pluginInfo.installState === 'installing' ? 'uninstalled' : 'installed',
                  },
                });
              });
          }
        });
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const installStateSwitchHandler = (pluginName: string) => {
    const installState = data.get(pluginName)?.installState;
    const resourceVersion = data.get(pluginName)?.resourceVersion;
    if (!resourceVersion || !installState) {
      return;
    }

    if (installState === 'installed') {
      dispatch({
        type: 'UPDATE',
        payload: { name: pluginName, installState: 'uninstalling' },
      });
      makeCancelablePromise(updatePluginCR(pluginName, false, resourceVersion))
        .then(newResourceVersion => {
          dispatch({
            type: 'UPDATE',
            payload: {
              name: pluginName,
              installState: 'uninstalled',
              resourceVersion: newResourceVersion,
            },
          });
          notify.success('卸载成功');
        })
        .catch(() => {
          dispatch({
            type: 'UPDATE',
            payload: { name: pluginName, installState: 'installed' },
          });
          notify.error('卸载失败');
        });
    } else if (installState === 'uninstalled') {
      dispatch({ type: 'UPDATE', payload: { name: pluginName, installState: 'installing' } });
      makeCancelablePromise(updatePluginCR(pluginName, true, resourceVersion))
        .then(newResourceVersion => {
          dispatch({
            type: 'UPDATE',
            payload: {
              name: pluginName,
              installState: 'installed',
              resourceVersion: newResourceVersion,
            },
          });
          notify.success('安装成功，可前往概览查看巡检结果');
        })
        .catch(() => {
          dispatch({
            type: 'UPDATE',
            payload: { name: pluginName, installState: 'uninstalled' },
          });
          notify.error('安装失败');
        });
    }
  };

  const triggerAuditHandler = (pluginName: string) => {
    axios
      .get(`/api/v1/namespaces/kubeeye-system/services/${pluginName}:api/proxy/start`)
      .then(() => {
        notify.success('启动巡检成功');
      })
      .catch(() => {
        notify.error('启动巡检失败');
      });
  };

  const getPluginInfo = (name?: string) => {
    return name ? data.get(name) : Array.from(data.values());
  };

  if (loading) {
    return (
      <CenterWrapper>
        <Loading />
      </CenterWrapper>
    );
  } else {
    return <Outlet context={{ getPluginInfo, installStateSwitchHandler, triggerAuditHandler }} />;
  }
};

export default PluginManager;
