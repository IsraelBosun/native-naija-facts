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
      <View className=' mb-2 shadow-md'>
      <View className='mt-3  mx-3 mr-3 w-[90%] border border-green-600 relative left-7 p-1 flex-row items-center gap-x-2 rounded-2xl bg-neutral-200 '>
        <TouchableOpacity>
          <Icon name="search" size={20} color="#16A34A" />
        </TouchableOpacity>
        <TextInput placeholder='Search Categories' className='w-4/5 text-md ' />
      </View>
      </View>
      <Categories />
    </View> 
  )
}
{/* <ActivityIndicator animating={true} color={MD2Colors.red800} /> */}
