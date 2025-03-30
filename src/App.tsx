import { Assets as NavigationAssets } from '@react-navigation/elements';
import { Asset } from 'expo-asset';
import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';

import { Navigation } from './navigation';

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux";

import { useFonts } from "./hooks/useFont";

// Load assets before the app starts
Asset.loadAsync([
  ...NavigationAssets,
  require('./assets/newspaper.png'),
  require('./assets/bell.png'),
]);

SplashScreen.preventAutoHideAsync();

// Separate component where you can safely use useSelector
// const AppContent: React.FC = () => {
//   // const user = useSelector((state: RootState) => state.user);
//   // const dispatch = useDispatch<AppDispatch>();

//   // useEffect(() => {
//   //   if (user.onboardingCompleted) {
//   //     dispatch(resetOnboarding());
//   //   }
//   // }, [user.onboardingCompleted, dispatch]);

//   return (
//     <Navigation
//       linking={{
//         enabled: 'auto',
//         prefixes: ['helloworld://'],
//       }}
//       onReady={() => {
//         SplashScreen.hideAsync();
//       }}
//     />
//   );
// };

// Main App Component
export function App() {
  const fontsLoaded = useFonts();

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Navigation
          linking={{
            enabled: 'auto',
            prefixes: ['helloworld://'],
          }}
          onReady={() => {
            if (fontsLoaded) {
              SplashScreen.hideAsync();
            }
          }}
        />
      </PersistGate>
    </Provider>
  );
}