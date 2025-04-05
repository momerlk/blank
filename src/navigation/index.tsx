// navigation/index.tsx or AppNavigator.tsx

import React from 'react';
import { NavigationContainer, DarkTheme, TabRouter } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// icons
import Feather from '@expo/vector-icons/Feather';
import Foundation from '@expo/vector-icons/Foundation';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { MaterialCommunityIcons } from '@expo/vector-icons';


import { useSelector } from 'react-redux';
import { RootState, store } from '../redux';

// main screens
import { Home } from '../screens/main/Home/Home';
import { Settings, SettingsStack } from '../screens/main/Settings/Settings';
import { NotFound } from '../screens/NotFound';

// onboarding screens
import { Welcome } from '../screens/onboarding/Welcome';
import Signin from '../screens/onboarding/Signin';
import PhoneNumberScreen from '../screens/onboarding/PhoneNumberEntry';
import OTPVerification from '../screens/onboarding/OTPVerification';
import NameEntryScreen from '../screens/onboarding/NameEntry';
import AgeEntryScreen from '../screens/onboarding/AgeEntry';
import GenderSelection from '../screens/onboarding/GenderSelection';
import LocationRequest from '../screens/onboarding/LocationRequest';
import InterestsSelection from '../screens/onboarding/InterestsSelection';
import FinalInterests from '../screens/onboarding/FinalInterests';
import PasswordSetup from '../screens/onboarding/PasswordSetup';
import ProfilePictureEntryScreen from '../screens/onboarding/ProfilePictureEntry';

import { Image } from "react-native";
import Icon from '../components/Icon';
import { Profile } from '../screens/main/Profile';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeTabs() {
  const user = useSelector((state: RootState) => state.user);
  
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: 'black',
          borderTopColor: '#222',
          paddingTop : 10,
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#999',
      })}
    >
      <Tab.Screen name="Home" component={Home} options={{
         tabBarIcon: Icon("home"),
      }}/>
      <Tab.Screen name="Profile" component={Profile} options={{
        tabBarIcon: ({ color, focused , size}) => {

          if (user.profilePicture !== null) {
            return <Image 
            source={{ uri: user.profilePicture }} 
            style={{ width: size, height: size, borderRadius : 100}} />;
          }


          return <MaterialCommunityIcons name={"account-cog"} size={size} color={color} />
        },
      }}/>
    </Tab.Navigator>
  );
}

function RootStackNavigator() {
  const onboardingCompleted = store.getState().user.onboardingCompleted;

  return (
    <NavigationContainer theme={DarkTheme}>
      <Stack.Navigator initialRouteName={onboardingCompleted ? 'HomeTabs' : 'Welcome'}>
        <Stack.Screen 
            name="HomeTabs" 
            component={HomeTabs} 
            options={{ headerShown: false }} 
        />

        <Stack.Screen 
            name="Settings" 
            component={SettingsStack} 
            options={{ headerShown: true }} 
        />

        {/* Onboarding screens start */}

        <Stack.Screen 
            name="Welcome" 
            component={Welcome} 
            options={{ headerShown: false }} 
        />
        <Stack.Screen 
            name="Signin" 
            component={Signin} 
            options={{ headerShown: false }} 
        />
        <Stack.Screen 
            name="PhoneNumberEntry" 
            component={PhoneNumberScreen} 
            options={{ headerShown: false }} 
        />
        <Stack.Screen  
            name="OTPVerification" 
            component={OTPVerification} 
            options={{ headerShown: false }} 
        />
        <Stack.Screen 
            name="PasswordSetup" 
            component={PasswordSetup} 
            options={{ headerShown: false }} 
        />
        <Stack.Screen 
            name="NameEntry" 
            component={NameEntryScreen} 
            options={{ headerShown: false }} 
        />
        <Stack.Screen  
            name="AgeEntry" 
            component={AgeEntryScreen} 
            options={{ headerShown: false }} 
        />
        <Stack.Screen 
            name="GenderSelection" 
            component={GenderSelection} 
            options={{ headerShown: false }} 
        />
        <Stack.Screen 
            name="ProfilePictureEntry" 
            component={ProfilePictureEntryScreen} 
            options={{ headerShown: false }} 
        />
        <Stack.Screen 
            name="LocationRequest" 
            component={LocationRequest} 
            options={{ headerShown: false }} 
        />
        <Stack.Screen 
            name="InterestsSelection" 
            component={InterestsSelection} 
            options={{ headerShown: false }} 
        />
        <Stack.Screen 
            name="FinalInterests" 
            component={FinalInterests} 
            options={{ headerShown: false }} 
        />

        {/* Onboarding screens end */}

        <Stack.Screen 
            name="NotFound" 
            component={NotFound} 
            options={{ title: '404' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootStackNavigator;
