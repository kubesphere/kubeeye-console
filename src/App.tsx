import React, { useState, useCallback, useEffect } from 'react';
import { BrowserRouter as Router, useRoutes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { KubedConfigProvider, CssBaseline } from '@kubed/components';
import { useLocalStorage } from '@kubed/hooks';

import { PrefersContext, themes } from './libs/usePrefers';
import { getBrowserLang } from './libs/utils';
import GlobalStyles from './components/GlobalStyles';
import { Locale } from './libs/types';
import routes from './routes';

const Pages = () => {
  return useRoutes(routes);
};

const App = () => {
  const [themeLocalValue, setThemeLocalValue] = useLocalStorage({
    key: 'themeType',
    defaultValue: 'light',
  });
  const [themeType, setThemeType] = useState('light');

  const [lang] = useLocalStorage<Locale>({
    key: 'lang',
    defaultValue: getBrowserLang(),
  });

  useEffect(() => {
    document.documentElement.removeAttribute('style');
    document.body.removeAttribute('style');
    if (themes.includes(themeLocalValue)) setThemeType(themeLocalValue);
  }, []);

  const switchTheme = useCallback(theme => {
    setThemeType(theme);
    setThemeLocalValue(theme);
  }, []);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <KubedConfigProvider themeType={themeType} locale={lang}>
          <CssBaseline />
          <GlobalStyles />
          <PrefersContext.Provider value={{ themeType, switchTheme }}>
            <Pages />
          </PrefersContext.Provider>
        </KubedConfigProvider>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
