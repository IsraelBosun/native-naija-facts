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





export default function Shuffled({route}) {
  const router = useRouter()
  const [isModalVisible, setModalVisible] = useState(false);
  const [gettingFact, setGettingFact] = useState([]);
  const [loading, setLoading] = useState(true)

  const theme = useTheme();

  useEffect(() => {
    getOnlyFacts().then(data => {
      setGettingFact(data)
    })
    .finally(() => setLoading(false))
  }, []);

  // if (loading) {
  //   return (
  //     <View className='flex-1 items-center justify-center w-full'>
  //       <ActivityIndicator animating={true} color={theme.colors.primary} size='large' />
  //     </View>
  //   );
  // }



  const [likedFacts, setLikedFacts] = useState([])
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: 'white', padding: 30, borderRadius: 10, margin: 30, height: 150 };


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
        <Appbar.BackAction onPress={() => {router.back()}} />
        <Appbar.Content title="Shuffled Facts" />
        {/* <Appbar.Action icon="calendar" onPress={() => { }} />
        <Appbar.Action icon="magnify" onPress={() => { }} /> */}
      </Appbar.Header>
      <View className='mx-4 mt-2 '>
        <ScrollView
          contentContainerStyle={{ paddingVertical: 30 }}
          showsVerticalScrollIndicator={false}
          className='flex gap-6 mb-20'>


          {gettingFact.map((preview) => (
            <Card className='pb-8' style={{ backgroundColor: theme.colors.secondary }}>
              <Card.Cover source={{ uri: urlFor(preview.image).url() }} />
              <Card.Title className='font-bold' title="Category" right={LeftContent} />
              <Card.Content>
                <Text variant='bodyMedium'>{preview.shortDetail}</Text>
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










// import { StyleSheet } from 'react-native';

// import EditScreenInfo from '@/components/EditScreenInfo';
// import { Text, View } from '@/components/Themed';

// export default function TabTwoScreen() {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Tab T</Text>
//       <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
//       <EditScreenInfo path="app/(tabs)/two.tsx" />
//       <Text className = 'bg-red-900'>Hello world</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   separator: {
//     marginVertical: 30,
//     height: 1,
//     width: '80%',
//   },
// });
