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

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/


export default function TabLayout() {
  const colorScheme = useColorScheme();
  const theme = useTheme()

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'green',
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: false,
        tabBarStyle: {height: 80, padding: 10, backgroundColor: theme.colors.secondary },
        tabBarBadgeStyle: {backgroundColor: 'red', fontSize: 30}

      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Category',
          tabBarIcon: ({ color }) => <MaterialIcons name="category" size={24} color={color}  />,
          tabBarItemStyle: {height: 50,  },

        }}
      />
      <Tabs.Screen
        name="Shuffled"
        options={{
          title: 'Shuffled',
          tabBarIcon: ({ color }) => <FontAwesome name="random" size={24} color={color}  />,
          tabBarItemStyle: {height: 50, },

        }}
      />
      <Tabs.Screen
        name="Favourite"
        options={{
          title: 'Favourite',
          tabBarIcon: ({ color }) => <AntDesign name="heart" size={24} color={color} />,
          tabBarItemStyle: {height: 50, },

        }}
      />
      <Tabs.Screen
        name="Settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <AntDesign name="setting" size={24} color={color}  />,
          // tabBarActiveTintColor: 'red',
          tabBarItemStyle: {height: 50, borderRadius: 30,  },
          // tabBarInactiveTintColor: 'pink',
          // tabBarIconStyle: {color: 'red', backgroundColor: 'green', marginTop: 0, borderRadius: 30, borderRightColor: 'red'},
          tabBarBadgeStyle: {color: 'red', fontSize: 30}
        }}    
      />
    </Tabs>
  );
}
