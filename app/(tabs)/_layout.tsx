import React from 'react';
// import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable } from 'react-native';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from 'react-native-paper';
import store from '@/components/redux/store';
import { Provider } from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';
import { CommonActions } from '@react-navigation/native';
import index from './index';
import Settings from './Settings'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, BottomNavigation } from 'react-native-paper';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/

const Tab = createBottomTabNavigator();

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const theme = useTheme();
  
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#16A34A',
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: false,
        tabBarStyle: {height: 70, padding: 10, backgroundColor: theme.colors.secondary },
        tabBarBadgeStyle: {backgroundColor: 'red', fontSize: 30}

      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Icon name="home" size={26 } color={'black'}  />,
          tabBarItemStyle: {height: 50,  },
          tabBarActiveTintColor: '#16A34A',

        }}
      />
      <Tabs.Screen
        name="Shuffled"
        options={{
          title: 'Shuffled',
          tabBarIcon: ({ color }) => <Icon name="shuffle" size={26 } color={'black'}  />,
          tabBarItemStyle: {height: 50, },
          tabBarActiveTintColor: '#16A34A',
        }}
      />
      <Tabs.Screen
        name="Favourite"
        options={{
          title: 'Favourite',
          tabBarIcon: ({ color }) => <Icon name="heart" size={26 } color={'black'} />,
          tabBarItemStyle: {height: 50, },
          tabBarActiveTintColor: '#16A34A',
        }}
      />
      <Tabs.Screen
        name="Settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({  }) => <AntDesign name="setting" size={26 } color={'black'}  />,
          tabBarActiveTintColor: '#16A34A',
          tabBarItemStyle: {height: 50, borderRadius: 30,  },
          // tabBarInactiveTintColor: 'pink',
          // tabBarIconStyle: {color: 'red', backgroundColor: 'green', marginTop: 0, borderRadius: 30, borderRightColor: 'red'},
          tabBarBadgeStyle: {color: 'red', fontSize: 30}
        }}    
      />
    </Tabs>
  );
}




