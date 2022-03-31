import { Locale } from './types';

export const getBrowserLang = (): Locale => {
  // @ts-ignore
  const lang = (navigator.language || navigator.browserLanguage).toLowerCase();

  // if (lang === 'zh-tw') {
  //   return 'tc';
  // }
  if (lang.indexOf('zh') !== -1) {
    return 'zh';
  }
  if (lang.indexOf('en') !== -1) {
    return 'en';
  }

  return 'en';
};

export const getWebSocketProtocol = (protocol: string) => {
  if (protocol.startsWith('https')) {
    return 'wss';
  }
  return 'ws';
};
