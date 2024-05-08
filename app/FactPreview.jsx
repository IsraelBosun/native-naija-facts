import { View, Text, Share, ScrollView, Image, Alert, TouchableOpacity, Linking } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useRoute } from '@react-navigation/native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import Icon from 'react-native-vector-icons/Octicons';
import CustomModal from '../components/Modal'
import { getFacts, getOnlyFacts } from '../api'
import { urlFor } from '../sanity';
// import Icon from 'react-native-vector-icons/FontAwesome';
import { useEffect } from 'react'
import { Modal, Portal, PaperProvider, Appbar, Dialog, useTheme, Avatar, Card, Icon, ActivityIndicator, IconButton } from 'react-native-paper';
import ExternalLink from '../components/Linking'
import { useSelector, useDispatch } from 'react-redux';
import { addLikedFact, removeLikedFact, toggleLikedFact } from '.././components/redux/actions'









export default function FactPreview({ route }) {
  const router = useRouter()
  const [gettingFact, setGettingFact] = useState([]);
  const [loading, setLoading] = useState(true)
  const [toggledHeart, setToggledHeart] = useState({});
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const { params: item } = useRoute()
  // console.log(Li, 'itemmmm')

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


  const hideDialog = () => setVisible(false);
  const showDialog = () => setVisible(true);

  const likedFacts = useSelector(state => state.fact.likedFacts);
  console.log('FactPreview', likedFacts, 'FactPreview')
  const dispatch = useDispatch();
  const theme = useTheme();

  const toggleHeart = (id) => {
    setToggledHeart(prevState => ({
      ...prevState,
      [id]: !prevState[id], 
    }));
  };

  // const handleLike = (fact) => {
  //   if (toggledHeart[fact.id]) {
  //     dispatch(removeLikedFact(fact.id)); // Dispatch removeLikedFact when unliking
  //     dispatch(toggleLikedFact(fact.id));
  //   } else {
  //     dispatch(addLikedFact(fact)); // Dispatch addLikedFact when liking
  //   }
  //   toggleHeart(fact.id);
  // };

  const handleLike = (fact) => {
    if (likedFacts.some(likedFact => likedFact.id === fact.id)) {
      // If the fact is already liked, show an alert
      Alert.alert('Already Liked', 'This fact is already liked.');
    } else {
      // If the fact is not already liked, dispatch the action to add it to the liked facts
      dispatch(addLikedFact(fact));
      dispatch(toggleLikedFact(fact.id));
      toggleHeart(fact.id);
    }
  };

  // const handleLike = (fact) => {
  //   if (toggledHeart[fact.id]) {
  //     if (likedFacts.some(likedFact => likedFact.id === fact.id)) {
  //       Alert.alert("Fact already added to favorites.");
  //     } else {
  //       dispatch(addLikedFact(fact)); // Dispatch addLikedFact when liking
  //     }
  //     toggleHeart(fact.id);
  //   } else {
  //     dispatch(removeLikedFact(fact.id)); // Dispatch removeLikedFact when unliking
  //     toggleHeart(fact.id);
  //   }
  // };
  
  useEffect(() => {
    getOnlyFacts().then(data => {
      setGettingFact(data)
    })
    .finally(() => setLoading(false))
  }, []);

  return (
    <PaperProvider className='flex-1 bg-white'>
        <Appbar.Header style={{ backgroundColor: theme.colors.secondary }}>
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content style={{ fontWeight: 'bold' }} title={item.name}/>
      </Appbar.Header>
      <View className='mx-4 mt-2 '>
        <ScrollView
          contentContainerStyle={{ paddingVertical: 30 }}
          showsVerticalScrollIndicator={false}
          className='flex gap-6 mb-20'>


          {item.category.map((preview) => (
                  <Card key={preview.id} className='pb-4' style={{ backgroundColor: theme.colors.secondary }}>
                  <Card.Cover source={{ uri: urlFor(preview.image).url() }} />
                  <View className='flex-row items-center justify-between px-3 '>
                    <Text className=' text-[20px] mt-2 leading-10 font-medium'>{preview.title}</Text>
                    <View className='flex-row gap-1 items-center'>
                      <TouchableOpacity onPress={() => handleLike(preview)}>
                      <Icon source="heart" size={29} color={toggledHeart[preview.id] ? 'red' : '#16A34A'}  />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={showDialog} >
                      <Icon source="information" size={29} color={'#16A34A'} />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View className='px-3 mt-2'>
                    <Text className='leading-5 text-neutral-700' variant='bodyMedium'>{preview.shortDetail}</Text>
                  </View>
                  <View className='flex-row items-center justify-end gap-3 px-3 mt-2'>
                    <TouchableOpacity className='rounded-3xl border border-green-600 px-5 py-3'>
                      <Text className='text-md text-green-600 font-semibold'>Share</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className='rounded-3xl border border-green-600 px-5 py-3 bg-green-600'>
                      <Text className='text-md text-white font-semibold'>Read more</Text>
                    </TouchableOpacity>
                  </View>
                </Card>
          ))}
        </ScrollView>
      </View>

    </PaperProvider>
  )
}

            // <Card className='pb-8' style={{ backgroundColor: theme.colors.secondary }}>
            //   <Card.Cover source={{ uri: urlFor(preview.image).url() }} />
            //   {/* <View className='flex-row'> */}
            //   <Card.Title  className='font-bold' title={item.name} right={LeftContent} />
            //   <Card.Content >
            //     <Text variant='bodyMedium' className=''>{preview.shortDetail}</Text>
            //   </Card.Content>
            //     <Portal>
            //       <Modal className='' visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
            //         <ExternalLink url={preview.url1} title={preview.url1} />
            //         <ExternalLink className='' url={preview.url2} title={preview.url2} />
            //       </Modal>
            //     </Portal>
            // </Card>


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