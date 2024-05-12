import React from 'react';
import { View, Text, Image, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { urlFor } from '../sanity';
import { Modal, Portal, PaperProvider, Appbar, Dialog, useTheme, Avatar, Card, Icon, ActivityIndicator, IconButton } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';


export default function FactDetails() {
  const router = useRouter();
  // const preview = useLocalSearchParams();
  const { params: { image, ...preview } } = useRoute();
  // console.log('details', preview, 'details')
  console.log(image)
  const imageUrl = urlFor({ _ref: image }).url();
  console.log(imageUrl)



  return (
    <View className ='flex-1 bg-white'>
      {/* <Image className='w-100 h-[400px] item-center' source={require('../assets/images/wars.jpg')} /> */}
      <View className='h-1/2'>
      <Image className='w-[100%] h-[100%]' resizeMode='cover' source={{uri: imageUrl}} />
      </View>
      <StatusBar style={'inverted'} />
      <SafeAreaView className="flex-row mt-7 justify-between items-center w-full absolute">
        <TouchableOpacity className="p-2 rounded-full ml-4" style={{backgroundColor: "rgba(255, 255, 255, 0.5)"}} onPress={()=> router.back()}>
        <Icon source="arrow-left" size={20} color='white' />
        </TouchableOpacity>
        <TouchableOpacity className="p-2 rounded-full mr-4" style={{backgroundColor: "rgba(255, 255, 255, 0.5)"}} >
        <Icon source="heart" size={20} color='white'   />
        </TouchableOpacity>
      </SafeAreaView> 
      <View style={{borderTopLeftRadius: 40, borderTopRightRadius: 40}} className=' bg-white flex-1 -mt-14 '>
        <View className='mx-6'>
          <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 80, paddingTop: 5, paddingHorizontal: 0 }} 
          className='mt-5'>
            <View className='flex-row  items-center gap-2'>
          <Text className='text-2xl text-green-600 '>#{preview.id}</Text>
          <Text className='text-2xl font-semibold'>{preview.title}</Text>
            </View>
          <Text className='mt-4 leading-5'>{preview.longDetail}</Text>
          </ScrollView >
        </View>
      </View>
    </View>
  );
}