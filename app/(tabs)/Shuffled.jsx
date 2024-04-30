import { View, Text, Share, ScrollView, Image, Alert, TouchableOpacity } from 'react-native'
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
import { Modal, Portal, PaperProvider, Appbar, useTheme, Avatar, Card, Icon, ActivityIndicator } from 'react-native-paper';
import ExternalLink from '../../components/Linking'
import { addLikedFact } from '../../components/redux/actions'
import { connect } from 'react-redux'





function Shuffled({addLikedFact}) {
  const router = useRouter()
  const [isModalVisible, setModalVisible] = useState(false);
  const [gettingFact, setGettingFact] = useState([]);
  const [loading, setLoading] = useState(true)
  const [toggledHeart, setToggledHeart] = useState({});


  const theme = useTheme();

  const handleLike = (fact) => {
    addLikedFact(fact);
    toggleHeart(fact.id);
  };

  useEffect(() => {
    getOnlyFacts().then(data => {
      setGettingFact(data)
    })
    .finally(() => setLoading(false))
  }, []);

  const toggleHeart = (id) => {
    console.log('clicked')
    setToggledHeart(prevState => ({
      ...prevState,
      [id]: !prevState[id], 
    }));
  };

  return (
    <>
      {
        loading ? <ActivityIndicator className='flex items-center flex-1' animating={true} size={'large'} /> : (
          <PaperProvider className='flex-1 bg-white'>
            <Appbar.Header style={{ backgroundColor: theme.colors.secondary }}>
              <Appbar.BackAction onPress={() => { router.back() }} />
              <Appbar.Content title="Shuffled Facts" />
            </Appbar.Header>
            <View className='mx-4 mt-2 '>
              <ScrollView
                contentContainerStyle={{ paddingVertical: 30 }}
                showsVerticalScrollIndicator={false}
                className='flex gap-6 mb-20'>

                {gettingFact.map((preview) => (
                  <Card key={preview.id} className='pb-8' style={{ backgroundColor: theme.colors.secondary }}>
                    <Card.Cover source={{ uri: urlFor(preview.image).url() }} />
                    <View className='bo flex-1 '>
                      <Card.Title className='font-bold' title="Category" />
                      <View className='flex-row items-center absolute left-60 top-3'>
                        <Icon source="heart" size={29} color={toggledHeart[preview.id] ? 'green' : 'red'} onPress={() => handleLike(preview)} />
                      </View>
                    </View>
                    <Card.Content>
                      <Text variant='bodyMedium'>{preview.shortDetail}</Text>
                    </Card.Content>
                  </Card>
                ))}
              </ScrollView>
            </View>
          </PaperProvider>
        )
      }
    </>
  )
}

const mapStateToProps = (state) => ({
  likedFacts: state.likedFacts,
});

const mapDispatchToProps = {
  addLikedFact,
};


export default connect(mapStateToProps, mapDispatchToProps)(Shuffled);



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