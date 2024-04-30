import { View, Text, FlatList, TouchableOpacity, Image,  } from 'react-native'
import React from 'react'
import { categories } from "../constants/index"
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import { getCategories } from '../api';
import { getFacts } from '../api';
import { useState } from 'react';
import { useEffect } from 'react';
import { urlFor } from '../sanity';
import { Avatar, Button, Card, TouchableRipple, useTheme, ActivityIndicator  } from 'react-native-paper';
// import Animated, { FadeInDown } from 'react-native-reanimated';


export default function Categories() {
    const [loading, setLoading] = useState(true)
    const [categorize, setcategorize] = useState([]);



    const router = useRouter();
    const navigation = useNavigation();
    const theme = useTheme();

    useEffect(() => {
      getFacts().then(data => {
        setcategorize(data)
      })
      .finally(() => setLoading(false))
    }, []);

  return (
    <>
      { loading ? (<ActivityIndicator size={'large'} className='absolute top-[360%] left-[45%]' />) : (
        <View>
          <FlatList
            data={categorize}
            numColumns={2}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 300, paddingTop: 5, paddingHorizontal: 0 }}
            columnWrapperStyle={{ justifyContent: 'space-between' }}
            renderItem={({ item, index }) => <CategoryCard index={index} item={item} router={router} navigation={navigation} theme={theme} />}
          />
        </View>
      )}
    </>
  )
}

const CategoryCard = ({item, index, router, navigation, theme}) => {
  // console.log(typeof item.facts)
  // console.log(item, 'preview')
    return (
      <View className='mx-2' >
        <Card className=' mt-4 w-[160px]' style={{ backgroundColor: theme.colors.primary }} >
          <TouchableOpacity onPress={() => navigation.push('FactPreview', item,)} >
            <Card.Cover className='h-[150px]' resizeMethod='auto' source={{ uri: urlFor(item.image).url() }} />
          </TouchableOpacity>
          {/* <Card.Title title = "Category" subtitle='card subtitle'  /> */}
          <Card.Content className = ''>
            <Text className='text-center mt-1 text-white font-semibold'>{item.name}</Text>
          </Card.Content>
        </Card>
      </View>
)
}

{/* <Animated.View entering={FadeInDown.duration(400).delay(index*200).springify()}>

</Animated.View> */}


//  <TouchableOpacity className='flex mt-3' onPress = {()=> navigation.push('FactPreview', item,  )} >
//         <Image contentFit = 'cover' style ={{width: wp(90), height: wp(52)}} className = 'w-1/2 h-1/2 rounded-[25px]' source={{uri: urlFor(item.image).url()}}/>
//         <LinearGradient
//     colors={["transparent", "rgba(0,0,0,0.7)"]}
//     style={{width: wp(90), height: hp(15)}}
//     start={{x: 0.5, y: 0}}
//     end={{x: 0.5, y: 1}}
//     className="absolute  bottom-6 rounded-b-[25px]"
//     />
//         <Text style={{fontSize: hp(2.3)}} className='text-white font-semibold ml-1 tracking-wide relative bottom-7  text-center  border-red-400' >
//             {item.name}
//         </Text>
// </TouchableOpacity> 