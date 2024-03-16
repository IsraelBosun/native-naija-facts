import { View, Share, ScrollView, Image, Alert, TouchableOpacity, Linking } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useRoute } from '@react-navigation/native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import Icon from 'react-native-vector-icons/Octicons';
import CustomModal from '../components/Modal'
import { getFacts } from '../api'
import { urlFor } from '../sanity';
// import Icon from 'react-native-vector-icons/FontAwesome';
import { useEffect } from 'react'
import { Avatar, Button, Card, Text, Icon, MD3Colors } from 'react-native-paper';
import { useTheme } from 'react-native-paper';
import { Modal, Portal, PaperProvider, Appbar,  } from 'react-native-paper';
import ExternalLink from '../components/Linking'






export default function FactPreview({ route }) {
  const router = useRouter()
  const [likedFacts, setLikedFacts] = useState([])
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: 'white', padding: 30, borderRadius: 10, margin: 30, height: 150 };


  const theme = useTheme();

  const handleLikePress = (preview) => {
    // Check if the fact is already liked
    const isLiked = likedFacts.some((fact) => fact.id === preview.id);

    if (!isLiked) {
      // Add the liked fact to the state
      setLikedFacts([...likedFacts, preview]);
    } else {
      // Remove the fact from the liked facts
      const updatedLikedFacts = likedFacts.filter((fact) => fact.id !== preview.id);
      setLikedFacts(updatedLikedFacts);
    }
  };

  const { params: item } = useRoute()
  console.log(item, 'itemmmm')
  const onShare = async (preview) => {
    try {
      const imageUrl = preview.image ? urlFor(preview.image).url() : null;

      if (imageUrl) {
        const result = await Share.share({
          message: preview.shortDetail,
          url: imageUrl,
        });

        if (result.action === Share.sharedAction) {
          if (result.activityType) {
            // shared with activity type of result.activityType
          } else {
            // shared
          }
        } else if (result.action === Share.dismissedAction) {
          // dismissed
        }
      } else {
        // Handle the case where there is no image URL
        Alert.alert('Image URL not available for sharing.');
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  // const LeftContent = props => <TouchableOpacity><Avatar.Icon {...props} icon="folder" /></TouchableOpacity> 

  const LeftContent = props => (
    <View className='flex-row mx-5 gap-3'>
      <TouchableOpacity>
        <Icon {...props} source="heart" size={29} color={theme.colors.primary} />
      </TouchableOpacity>
      <TouchableOpacity onPress={showModal}>
        <Icon {...props} source="information-outline" size={29} color={theme.colors.primary} />
      </TouchableOpacity>
      <TouchableOpacity >
        <Icon {...props} source="share-variant-outline" size={29} color={theme.colors.primary} />
      </TouchableOpacity>
    </View>
  );

  // onPress={() => onShare(preview)}

  return (
    <PaperProvider className='flex-1 bg-white'>
        <Appbar.Header style={{ backgroundColor: theme.colors.secondary }}>
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content style={{ fontWeight: 'bold' }} title={item.name}/>
        {/* <Appbar.Action icon="calendar" onPress={() => { }} />
        <Appbar.Action icon="magnify" onPress={() => { }} /> */}
      </Appbar.Header>
      <View className='mx-4 mt-2 '>
        <ScrollView
          contentContainerStyle={{ paddingVertical: 30 }}
          showsVerticalScrollIndicator={false}
          className='flex gap-6 mb-20'>


          {item.category.map((preview) => (
            <Card className='pb-8' style={{ backgroundColor: theme.colors.secondary }}>
              <Card.Cover source={{ uri: urlFor(preview.image).url() }} />
              {/* <View className='flex-row'> */}
              <Card.Title  className='font-bold' title={item.name} right={LeftContent} />
              <Card.Content >
                <Text variant='bodyMedium' className=''>{preview.shortDetail}</Text>
              </Card.Content>
                <Portal>
                  <Modal className='' visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                    <ExternalLink url={preview.url1} title={preview.url1} />
                    <ExternalLink className='' url={preview.url2} title={preview.url2} />
                  </Modal>
                </Portal>
            </Card>
          ))}
        </ScrollView>
      </View>

    </PaperProvider>
  )
}




{/* <View className='bg-green-500 h-[80px] rounded-b-2xl z-10 '>
  <Text className='text-center  mt-10 text-xl justify-center items-center font-bold text-white'>Amazing Nigerian Facts</Text>
  <TouchableOpacity onPress={() => router.back()} className='  relative bottom-6 left-4  px-2'>
    <Icon className='' name="share" size={21} color="white" />
  </TouchableOpacity>
</View> */}


{/* <Button style={{ marginTop: 10 }} onPress={showModal}>
Show
</Button> */}
{/* {item.category.map((preview) => (
  <View className='  border border-neutral-300 rounded-2xl'>
    <TouchableOpacity>
      <Image className='rounded-t-2xl' contentFit='cover' style={{ width: wp(91), height: wp(62) }} source={{ uri: urlFor(preview.image).url() }} />

    </TouchableOpacity>
    <View className='flex-row gap-x-5 items-center justify-end px-4 mt-3'>
      <TouchableOpacity onPress={() => handleLikePress(preview)}>
        <Icon name="heart" size={21} color={likedFacts.some((fact) => fact.id === preview.id) ? 'red' : 'black'} />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleItemPress}>
        <Icon name="info" size={21} color="black" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onShare(preview)}>
        <Icon name="share" size={21} color="black" />
      </TouchableOpacity>

    </View >
    <View className='bg-white shadow-2xl rounded-b-2xl py-2'>
      <Text style={{ fontSize: hp(2.5) }} className='text-md text-center px-1'>{preview.shortDetail}</Text>
    </View>
    <CustomModal isVisible={isModalVisible} onClose={handleCloseModal} link={preview.url1} url={preview.url2} />
  </View>
))} */}