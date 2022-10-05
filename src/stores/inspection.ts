import { useStore } from '@kubed/stook';
import { get, groupBy } from 'lodash';
import SocketClient from '../libs/SocketClient';
import { getWebSocketProtocol } from '../libs/utils';

const initialValue = {
  scoreInfo: {
    dangerous: 0,
    ignore: 0,
    passing: 0,
    score: 0,
    total: 0,
    warning: 0,
  },
  clusterInfo: {
    namespacesCount: 0,
    nodesCount: 0,
    version: '',
    workloadsCount: 0,
  },
  auditResults: {
    project: [],
    cluster: [],
  },
};

const useInspectionStore = () => {
  const [inspectionStore, setInspectionStore] = useStore<Record<string, any>>(
    'InspectionStore',
    initialValue,
  );
  let wsClient: SocketClient;

  const receive = (data: any) => {
    const rawData = get(data, 'object.status');
    if (rawData) {
      const { auditResults, clusterInfo, scoreInfo } = rawData;
      const grouped = groupBy(auditResults, (item: any) => {
        if (!item.namespace) return 'cluster';
        return 'project';
      });

      const ret = {
        clusterInfo,
        scoreInfo,
        auditResults: grouped,
      };
      setInspectionStore(ret);
    }
  };

  const watch = (name: string) => {
    if (wsClient) {
      wsClient.close(true);
    }

    const wsUrl = `${getWebSocketProtocol(window.location.protocol)}://${
      window.location.host
    }/apis/kubeeye.kubesphere.io/v1alpha1/clusterinsights?\
fieldSelector=metadata.name=${name}&watch=true`;
    wsClient = new SocketClient(wsUrl, {
      onmessage: receive,
    });
  };

  return {
    inspectionStore,
    setInspectionStore,
    watch,
  };
};

export default useInspectionStore;
