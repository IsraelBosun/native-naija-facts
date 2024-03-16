import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Octicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
// import Categories from '../components/Categories';
import Categories from "../../components/Categories"
import { ActivityIndicator, MD2Colors, Appbar, useTheme } from 'react-native-paper';


export default function index() {
  
  const theme = useTheme()

  return (
    <View className=''>
      <Appbar.Header style={{ backgroundColor: theme.colors.secondary }}>
        <Appbar.BackAction onPress={() => { }} />
        <Appbar.Content title="Home" />
        {/* <Appbar.Action icon="calendar" onPress={() => { }} />
        <Appbar.Action icon="magnify" onPress={() => { }} /> */}
      </Appbar.Header>
      {/* <View className='mt-3  border p-2 flex-row items-center gap-x-2 rounded-xl bg-neutral-200'>
        <TouchableOpacity>
          <Icon name="search" size={25} color="gray" />
        </TouchableOpacity>
        <TextInput placeholder='Search Categories' className='w-4/5 text-md ' />
      </View> */}
      <Categories />
    </View>
  )
}
{/* <ActivityIndicator animating={true} color={MD2Colors.red800} /> */}
