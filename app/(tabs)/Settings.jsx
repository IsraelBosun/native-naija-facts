import { useRouter } from 'expo-router';
import React, { useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Modal, Switch, Divider, Portal, Button, PaperProvider, Appbar, useTheme, Avatar, Card, ActivityIndicator, IconButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';



export default function Settings() {
  const router = useRouter();
  const theme = useTheme();

  const [isSwitchOn, setIsSwitchOn] = useState(false)


  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  return (
    <View className ='flex-1 '>
      <Appbar.Header style={{ backgroundColor: theme.colors.secondary }}>
        <Appbar.BackAction onPress={() => { router.back() }} />
        <Appbar.Content title="Settings" />
      </Appbar.Header>
      <View className='mx-2 mt-2 '>
        <Text className='text-gray-500 mt-1 ml-5'>PREFERENCES</Text>
        <View className='flex gap-3 bg-white rounded-md p-2 m-1 mt-2 shadow-xl'>
          <TouchableOpacity className='flex-row items-center justify-between'>
            <Text className='text-[17px]'>Email Notifications</Text>
            <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
          </TouchableOpacity>
          <TouchableOpacity className='flex-row items-center justify-between'>
            <Text className='text-[17px]'>Push Notification</Text>
            <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
          </TouchableOpacity>
          <TouchableOpacity className='flex-row items-center justify-between'>
            <Text className='text-[17px]'>Dark Theme</Text>
            <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
          </TouchableOpacity>
        </View>
      </View>

      <View className='mx-2 mt-12 '>
        <Text className='text-gray-500 mt-1 ml-5'>RESOURCES</Text>
        <View className='flex gap-4 bg-white rounded-xl px-2 py-4 m-1 mt-2 shadow-xl'>
          <TouchableOpacity className='flex-row items-center justify-between'>
            <Text className='text-[17px]'>Contact Us</Text>
            <Icon name="right" size={20} color="gray" />
          </TouchableOpacity>
          <TouchableOpacity className='flex-row items-center justify-between'>
            <Text className='text-[17px]'>Report Bug</Text>
            <Icon name="right" size={20} color="gray" />
          </TouchableOpacity>
          <TouchableOpacity className='flex-row items-center justify-between'>
            <Text className='text-[17px]'>Rate in Play Store</Text>
            <Icon name="right" size={20} color="gray" />
          </TouchableOpacity>
          <TouchableOpacity className='flex-row items-center justify-between'>
            <Text className='text-[17px]'>Terms and Privacy</Text>
            <Icon name="right" size={20} color="gray" />
          </TouchableOpacity>
        </View>
      </View>
      <View className='flex-1 items-center justify-center'>
        <Text className='text-lg text-neutral-400 font-semibold'>App Version 1.1.0</Text>
      </View>
    </View>
  )
};