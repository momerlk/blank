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
import Signin from '../screens/onboarding/Signin';
import PhoneNumberScreen from '../screens/onboarding/PhoneNumberEntry';
import OTPVerification from '../screens/onboarding/OTPVerification';
import NameEntryScreen from '../screens/onboarding/NameEntry';
import AgeEntryScreen from '../screens/onboarding/AgeEntry';
import GenderSelection from '../screens/onboarding/GenderSelection';
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
      // ---- Onboarding screens start
      Welcome : {
        screen: Welcome,
        options: {
          title: 'Welcome',
          headerShown: false,
        },
      },
      Signin : {
        screen : Signin, 
        options : {
          title : "Signin",
          headerShown : false,
        },
      },
      PhoneNumberEntry : {
        screen : PhoneNumberScreen,
        options : {
          title : "PhoneNumberEntry",
          headerShown : false,
        },
      },
      OTPVerification : {
        screen : OTPVerification,
        options : {
          title : "OTP",
          headerShown : false, 
        }, 
      },
      NameEntry : {
        screen : NameEntryScreen,
        options : {
          headerShown : false,
        },
      },
      AgeEntry : {
        screen : AgeEntryScreen,
        options : {
          headerShown : false,
        },
      },
      GenderSelection : {
        screen : GenderSelection,
        options : {
          headerShown : false,
        },
      },
      // ---- Onboarding screens end

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
