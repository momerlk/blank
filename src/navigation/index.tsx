import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HeaderButton, Text } from '@react-navigation/elements';
import {
  createStaticNavigation,
  StaticParamList,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image } from 'react-native';
import bell from '../assets/bell.png';
import newspaper from '../assets/newspaper.png';
import { Home } from '../screens/Home/Home';
import { Settings } from '../screens/Settings/Settings';
import { NotFound } from '../screens/NotFound';
import { useSelector } from 'react-redux';
import { RootState, store } from '../redux';
import { Welcome } from '../screens/onboarding/Welcome';
const HomeTabs = createBottomTabNavigator({
  screens: {
    Home: {
      screen: Home,
      options: {
        title: 'Feed',
        // tabBarIcon: ({ color, size }) => (
        //   <Image
        //     source={newspaper}
        //     tintColor={color}
        //     style={{
        //       width: size,
        //       height: size,
        //     }}
        //   />
        // ),
      },
    },
  },
});

const RootStack = () => {
  let initialRouteName = "HomeTabs";
  if (!store.getState().user.onboardingCompleted) {
    initialRouteName = "Welcome";
  }
  return createNativeStackNavigator({
    initialRouteName: initialRouteName,
    screens: {
      HomeTabs: {
        screen: HomeTabs,
        options: {
          title: 'Home',
          headerShown: false,
        },
      },
      Settings: {
        screen: Settings,
        options: ({ navigation }) => ({
          presentation: 'modal',
          headerRight: () => (
            <HeaderButton onPress={navigation.goBack}>
              <Text>Close</Text>
            </HeaderButton>
          ),
        }),
      },
      // Onboarding screens 
      Welcome : {
        screen: Welcome,
        options: {
          title: 'Welcome',
          headerShown: false,
        },
      },
      NotFound: {
        screen: NotFound,
        options: {
          title: '404',
        },
        linking: {
          path: '*',
        },
      },
    },
  });
}


export const Navigation = createStaticNavigation(RootStack());

type RootStackParamList = StaticParamList<any>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
