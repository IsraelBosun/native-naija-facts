import { View, Text, Share, ScrollView, Pressable, Image, Alert, Button, TouchableOpacity, Linking } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useRoute } from '@react-navigation/native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
// import Icon from 'react-native-vector-icons/Octicons';
import CustomModal from '../../components/Modal'
import { getFacts, getOnlyFacts } from '../../api'
import { urlFor } from '../../sanity';
import { useEffect } from 'react'
import { Modal, Portal, PaperProvider, Appbar, useTheme, Divider, Avatar, Card, Icon, ActivityIndicator, IconButton, Dialog } from 'react-native-paper';
import ExternalLink from '../../components/Linking'
import { addLikedFact, removeLikedFact, toggleLikedFact, loadLikedFacts } from '../../components/redux/actions'
import { connect } from 'react-redux'
import { useSelector, useDispatch } from 'react-redux';
import { ALERT_TYPE, AlertNotificationRoot, Toast } from 'react-native-alert-notification';







function Shuffled({}) {
  const router = useRouter()
  const [isModalVisible, setModalVisible] = useState(false);
  const [gettingFact, setGettingFact] = useState([]);
  const [loading, setLoading] = useState(true)
  const [toggledHeart, setToggledHeart] = useState({});
  const [visible, setVisible] = React.useState(false);


  const likedFacts = useSelector(state => state.fact.likedFacts);
  console.log('Shuffled', likedFacts.length, 'Shuffled')
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
  //   } else {
  //     dispatch(addLikedFact(fact)); // Dispatch addLikedFact when liking
  //   }
  //   toggleHeart(fact.id);
  // };
  
  const handleLike = (fact) => {
    if (likedFacts.some(likedFact => likedFact.id === fact.id)) {
      // If the fact is already liked, remove it from likedFacts
      dispatch(removeLikedFact(fact.id)); // Dispatch removeLikedFact when unliking
      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        textBody: 'Removed from favorites',
        style: { backgroundColor: 'rgba(0, 10, 20, 0.6)', padding: 15 } 
      });
    } else {
      // If the fact is not already liked, add it to likedFacts
      dispatch(addLikedFact(fact)); // Dispatch addLikedFact when liking
      // dispatch(toggleLikedFact(fact.id)); // Toggle liked status
      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        textBody: 'Added to favorites',
        style: { backgroundColor: 'rgba(0, 20, 10, 0.6)', padding: 15 } 
      });
    }
    // Always toggle the heart icon after handling like
    toggleHeart(fact.id);
  };



  useEffect(() => {
    getOnlyFacts().then(data => {
      setGettingFact(data)
    })
    .finally(() => setLoading(false))
  }, []);

  const hideDialog = () => setVisible(false);
  const showDialog = () => setVisible(true);

  const handleLinkPress = (url) => {
    Linking.openURL(url);
  };

  const onShare = async (preview) => {
    try {
      const result = await Share.share({
        message: preview.shortDetail,
        url: urlFor(preview.image).url(),
      });

      if (result.action === Share.sharedAction) {
        // Add any desired logic if the share was successful
      } else if (result.action === Share.dismissedAction) {
        // Add any desired logic if the share was dismissed
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };


  return (
    <AlertNotificationRoot>
      {
        loading ? <ActivityIndicator className='flex items-center flex-1' animating={true} size={'large'} /> : (
          <PaperProvider className='flex-1 bg-white'>
            <Appbar.Header className='z-10' style={{ backgroundColor: theme.colors.secondary }}>
              <Appbar.BackAction onPress={() => { router.back() }} />
              <Appbar.Content title="Shuffled Facts" />
            </Appbar.Header>
            <View className='mx-4 mt-2 '>
              <ScrollView
                contentContainerStyle={{ paddingVertical: 30 }}
                showsVerticalScrollIndicator={false}
                className='flex gap-6 mb-20'>
                {gettingFact.map((preview) => (
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
                      <TouchableOpacity onPress={() => onShare(preview)} className='rounded-3xl border border-green-600 px-5 py-3'>
                        <Text className='text-md text-green-600 font-semibold'>Share</Text>
                      </TouchableOpacity>
                      <TouchableOpacity className='rounded-3xl border border-green-600 px-5 py-3 bg-green-600'>
                        <Text className='text-md text-white font-semibold'>Read more</Text>
                      </TouchableOpacity>
                    </View>
                  </Card>
                ))}
                <Portal>
                  <Dialog visible={visible} onDismiss={hideDialog}>
                    <Dialog.Content className='flex gap-3'>
                      <TouchableOpacity onPress={() => handleLinkPress(preview.url1)}>
                        <Text >This is the first link</Text>
                      </TouchableOpacity>
                      <Divider />
                      <TouchableOpacity onPress={() => handleLinkPress(preview.url2)}>
                        <Text >This is the second link</Text>
                      </TouchableOpacity>
                    </Dialog.Content>
                  </Dialog>
                </Portal>
              </ScrollView>
            </View>
          </PaperProvider>
        )
      }
    </AlertNotificationRoot>
  )
}

export default Shuffled;

// const mapStateToProps = (state) => ({
//   likedFacts: state.likedFacts,
// });

// const mapDispatchToProps = {
//   addLikedFact,
// };

  // const handleLike = (fact) => {
  //   if (likedFacts.some(likedFact => likedFact.id === fact.id)) {
  //     // If the fact is already liked, show an alert
  //     Toast.show({
  //       type: ALERT_TYPE.WARNING,
  //       // title: 'Success',
  //       textBody: 'Already added to favorites',
  //       style: { backgroundColor: 'rgba(10,20,0,0.6)', padding: 15 } 
  //     })    } else {
  //     // If the fact is not already liked, dispatch the action to add it to the liked facts
  //     dispatch(addLikedFact(fact));
  //     dispatch(toggleLikedFact(fact.id));
  //     toggleHeart(fact.id);
  //   }
  // };

// export default connect(mapStateToProps, mapDispatchToProps)(Shuffled);

  // const handleLike = (fact) => {
  //   if (toggledHeart[fact.id]) {
  //     dispatch(removeLikedFact(fact.id)); // Dispatch removeLikedFact when unliking
  //   } else {
  //     dispatch(addLikedFact(fact)); // Dispatch addLikedFact when liking
  //   }
  //   toggleHeart(fact.id);
  // };


// return (
//   <>
//     {
//       loading ? <ActivityIndicator className='flex items-center flex-1' animating={true} size={'large'} /> : (
//         <PaperProvider className='flex-1 bg-white'>
//         <Appbar.Header style={{ backgroundColor: theme.colors.secondary }}>
//         <Appbar.BackAction onPress={() => {router.back()}} />
//         <Appbar.Content title="Shuffled Facts" />
//         {/* <Appbar.Action icon="calendar" onPress={() => { }} />
//         <Appbar.Action icon="magnify" onPress={() => { }} /> */}
//       </Appbar.Header>
//       <View className='mx-4 mt-2 '>
//         <ScrollView
//           contentContainerStyle={{ paddingVertical: 30 }}
//           showsVerticalScrollIndicator={false}
//           className='flex gap-6 mb-20'>


//           {gettingFact.map((preview) => (
//             <Card className='pb-8' style={{ backgroundColor: theme.colors.secondary }}>
//               <Card.Cover source={{ uri: urlFor(preview.image).url() }} />
//               <Card.Title className='font-bold' title="Category" right={LeftContent} />
//               <Card.Content>
//                 <Text variant='bodyMedium'>{preview.shortDetail}</Text>
//               </Card.Content>
              
//                 <Portal>
//                   <Modal className='' visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
//                     <ExternalLink url={preview.url1} title={preview.url1} />
//                     <ExternalLink className='' url={preview.url2} title={preview.url2} />
//                   </Modal>
//                 </Portal>
//             </Card>
//           ))}
//         </ScrollView>
//       </View>

//     </PaperProvider>
//       )
//     }
//   </>

// )
// }

  {/* right={LeftContent} */}

  // const LeftContent = props => (
  //   <View className='flex-row mx-5 gap-3'>
  //     <TouchableOpacity onPress={onClick}>
  //       <Icon {...props} source="heart" size={29}  color={toggle ? theme.colors.primary : 'black'}/>
  //     </TouchableOpacity>
  //     <TouchableOpacity onPress={showModal}>
  //       <Icon {...props} source="information-outline" size={29} color={theme.colors.primary} />
  //     </TouchableOpacity>
  //     <TouchableOpacity >
  //       <Icon {...props} source="share-variant-outline" size={29} color={theme.colors.primary} />
  //     </TouchableOpacity>
  //   </View>
  // );


  // const onShare = async (preview) => {
  //   try {
  //     const imageUrl = preview.image ? urlFor(preview.image).url() : null;
  
  //     if (imageUrl) {
  //       const result = await Share.share({
  //         message: preview.shortDetail,
  //         url: imageUrl,
  //       });
  
  //       if (result.action === Share.sharedAction) {
  //         if (result.activityType) {
  //           // shared with activity type of result.activityType
  //         } else {
  //           // shared
  //         }
  //       } else if (result.action === Share.dismissedAction) {
  //         // dismissed
  //       }
  //     } else {
  //       // Handle the case where there is no image URL
  //       Alert.alert('Image URL not available for sharing.');
  //     }
  //   } catch (error) {
  //     Alert.alert(error.message);
  //   }
  // };
  // color={theme.colors.primary}

  // {loading? () : ()}

  // onPress={() => onShare(preview)}

  // const onClick = () => {
  //   setToggle(!toggle)
  // }


  // const [likedFacts, setLikedFacts] = useState([])
  
  // const showModal = () => setVisible(true);
  // const hideModal = () => setVisible(false);

  // <Icon source="heart" size={29}  color={toggle ? theme.colors.primary : 'black'}/>
  // <Icon source="heart" size={29}  color={toggle ? theme.colors.primary : 'black'}/>
  // <Icon source="heart" size={29}  color={toggle ? theme.colors.primary : 'black'}/>

//   <Portal>
//   {/* <Modal className='' visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
//     <ExternalLink url={preview.url1} title={preview.url1} />
//     <ExternalLink className='' url={preview.url2} title={preview.url2} />
//   </Modal> */}
// </Portal>

// {/* <View className=' flex-1 '>
// {/* <Card.Title textStyle={{ fontSize: 20, fontWeight: 'bold' }}  title={preview.title} /> */}
// <Text>{preview.title}</Text>
// <View className='flex-row gap-1 items-center absolute left-60 top-3'>
//   <TouchableOpacity onPress={() => handleLike(preview)}>
//   <Icon source="heart" size={29} color={toggledHeart[preview.id] ? 'red' : 'green'}  />
//   </TouchableOpacity>
//   <TouchableOpacity onPress={showDialog} >
//   <Icon source="information" size={29} color={'green'} />
//   </TouchableOpacity>
// </View>
// </View> */}