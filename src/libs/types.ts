export declare type Locale = 'en' | 'zh' | 'zh-tw' | 'es';

export type InstallState = 'installed' | 'uninstalled' | 'installing' | 'uninstalling';

export interface PluginInfo {
  name: string;
  introduction: string;
  installState: InstallState;
  lastUpdateDate: string;
  resourceVersion?: string;
}

export type Action = {
  type: 'APPEND' | 'UPDATE';
  payload: {
    name: string;
    pluginInfo?: PluginInfo;
    installState?: InstallState;
    resourceVersion?: string;
  };
};

export type LocationStateType = {
  yOffset?: number;
};

export type ContextType = {
  getPluginInfo: (name?: string) => PluginInfo[] | PluginInfo | undefined;
  installStateSwitchHandler: (name: string) => void;
  triggerAuditHandler: (name: string) => void;
};
