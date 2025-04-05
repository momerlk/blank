import { Asset } from 'expo-asset';
import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';
import { useEffect, useState } from 'react';

import RootStackNavigator from './navigation'; // changed from Navigation
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux';
import { useFonts } from './hooks/useFont';
import { Assets as NavigationAssets } from '@react-navigation/elements';

// Prevent splash screen from auto-hiding until assets and fonts are ready
SplashScreen.preventAutoHideAsync();

export function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const fontsLoaded = useFonts();

  useEffect(() => {
    async function prepare() {
      try {
        await Asset.loadAsync([
          ...NavigationAssets,
          require('./assets/newspaper.png'),
          require('./assets/bell.png'),
        ]);
      } catch (e) {
        console.warn('Asset loading error:', e);
      } finally {
        if (fontsLoaded) {
          setAppIsReady(true);
        }
      }
    }

    prepare();
  }, [fontsLoaded]);

  useEffect(() => {
    if (appIsReady) {
      SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RootStackNavigator />
      </PersistGate>
    </Provider>
  );
}
