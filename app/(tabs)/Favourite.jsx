import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useSelector, useDispatch } from 'react-redux';
import { ADD_LIKED_FACT, REMOVE_LIKED_FACT } from '../../components/redux/actions'
import { Modal, Portal, PaperProvider, Dialog, Appbar, useTheme, Avatar, Card, Icon, ActivityIndicator, IconButton } from 'react-native-paper';
import { urlFor } from '../../sanity';
import { useRouter } from 'expo-router';
import { addLikedFact, removeLikedFact } from '../../components/redux/actions'




function Favourite({ }) {
  // const likedFacts = useSelector((state) => state.likedFacts);
  const likedFacts = useSelector((state) => state.fact.likedFacts); 
  console.log('Dark facts:', likedFacts); // Log the likedFacts received from Redux

  // if (!likedFacts || likedFacts.length === 0) {
  //   return <Text className=''>No liked facts yet!</Text>;
  // }


  const router = useRouter()
  const [isModalVisible, setModalVisible] = useState(false);
  const [gettingFact, setGettingFact] = useState([]);
  const [loading, setLoading] = useState(true)
  const [toggledHeart, setToggledHeart] = useState({});
  const [visible, setVisible] = React.useState(false);


  console.log('Likedfacttss', likedFacts)
  const dispatch = useDispatch();
  const theme = useTheme();

  const toggleHeart = (id) => {
    console.log('clicked')
    setToggledHeart(prevState => ({
      ...prevState,
      [id]: !prevState[id], 
    }));
  };

  const handleLike = (fact) => {
    if (toggledHeart[fact.id]) {
      dispatch(removeLikedFact(fact.id)); // Dispatch removeLikedFact when unliking
    } else {
      dispatch(addLikedFact(fact)); // Dispatch addLikedFact when liking
    }
    toggleHeart(fact.id);
  };

  // useEffect(() => {
  //   getOnlyFacts().then(data => {
  //     setGettingFact(data)
  //   })
  //   .finally(() => setLoading(false))
  // }, []);

  const hideDialog = () => setVisible(false);
  const showDialog = () => setVisible(true);

  const handleLinkPress = (url) => {
    Linking.openURL(url);
  };


  return (
    <View>
      <Appbar.Header style={{ backgroundColor: theme.colors.secondary }}>
        <Appbar.BackAction onPress={() => { router.back() }} />
        <Appbar.Content title="Favorites" />
      </Appbar.Header>
    <View className='mx-4 mt-'>
    {likedFacts.length === 0 ? (
      <View className='flex absolute top-[300px] left-14 items-center justify-center'>
        <Text className='text-xl text-neutral-400 font-bold'>No favorites added yet</Text>
      </View>
    ) : (
      <ScrollView
        contentContainerStyle={{ paddingVertical: 80 }}
        showsVerticalScrollIndicator={false}
        className='flex gap-6'>
        {likedFacts.map((preview) => (
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
    )}
  </View>
    </View>
  )
};

export default Favourite;

// const mapStateToProps = (state) => ({
//   likedFacts: state.likedFacts,
// });

// export default connect(mapStateToProps)(Favourite);




// In your Favorites tab/screen component
// {likedFacts.map((fact) => (
//     <View key={fact.id}>
//       {/* Display the liked fact information */}
//       <Text>{fact.shortDetail}</Text>
//       {/* Add other details as needed */}
//     </View>
//   ))}