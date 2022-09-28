import { get } from 'lodash';
import { getWebSocketProtocol } from './utils';

// type State = 'connecting' | 'open' | 'closing' | 'closed';

interface Options {
  reopenLimit?: number;
  onopen?: (ev?: Event) => void;
  onclose?: (ev?: Event) => void;
  onerror?: (error: Error) => void;
  onmessage?: (message: string) => void;
}

const readyStates = ['connecting', 'open', 'closing', 'closed'];

const defaultOptions: Options = {
  reopenLimit: 5,
  onopen() {},
  onmessage() {},
  onclose() {},
  onerror() {},
};

export default class SocketClient {
  static composeEndpoint = (socketUrl: string, suffix = '') => {
    const re = /(\w+?:\/\/)?([^\\?]+)/;
    const matchParts = String(socketUrl).match(re);
    return `${getWebSocketProtocol(window.location.protocol)}://${
      matchParts ? matchParts : [2]
    }${suffix}`;
  };

  private readonly endpoint: string;

  private reopenCount: number;

  private readonly options: Options;

  public client: WebSocket | undefined;

  private immediately: boolean;

  constructor(endpoint: string, options: Options = { reopenLimit: 5 }) {
    this.endpoint = endpoint;
    this.options = Object.assign(defaultOptions, options);

    if (!this.endpoint) {
      throw Error(`invalid websocket endpoint: ${this.endpoint}`);
    }
    this.reopenCount = 0;
    this.immediately = false;
    // @ts-ignore
    this.client = globals.wsChanel[this.endpoint];
    this.setUp();
  }

  getSocketState(readyState: number) {
    if (readyState === undefined && this.client) {
      readyState = this.client.readyState;
    }

    return readyStates[readyState];
  }

  initClient() {
    const subProto = get(this.options, 'subProtocol');

    if (!this.client) {
      this.client = new WebSocket(this.endpoint, subProto);
      // @ts-ignore
      globals.wsChanel[this.endpoint] = this.client;
    }

    if (this.client && this.client.readyState > 1) {
      this.client.close();
      this.client = new WebSocket(this.endpoint, subProto);
    }

    return this.client;
  }

  attachEvents() {
    if (!this.client) {
      return;
    }
    const { onopen, onmessage, onclose, onerror } = this.options;

    this.client.onopen = (ev: Event) => {
      if (onopen) {
        onopen(ev);
      }
    };

    this.client.onmessage = message => {
      let { data } = message;
      if (typeof data === 'string') {
        try {
          data = JSON.parse(data);
        } catch (e) {}
      }

      if (onmessage) {
        onmessage(data);
      }
    };

    this.client.onclose = ev => {
      // if socket will close, try to keep alive
      const reopenLimit = this.options.reopenLimit || 5;
      if (!this.immediately && this.reopenCount < reopenLimit) {
        setTimeout(this.setUp.bind(this), 1000 * 2 ** this.reopenCount);
        this.reopenCount++;
      }

      if (onclose) {
        onclose(ev);
      }
    };

    this.client.onerror = (ev: any) => {
      console.error('socket error: ', ev);
      if (onerror) {
        onerror(ev);
      }
    };
  }

  send(data: any) {
    return this.client && this.client.send(data);
  }

  close(val: any) {
    if (val) this.immediately = true;
    if (this.client) {
      this.client.close();
      // @ts-ignore
      globals.wsChanel[this.endpoint] = undefined;
    }
  }

  setUp() {
    this.initClient();
    this.attachEvents();
  }
}
