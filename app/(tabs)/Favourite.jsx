import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { connect } from 'react-redux'
import { useSelector, useDispatch } from 'react-redux';
import { ADD_LIKED_FACT, REMOVE_LIKED_FACT } from '../../components/redux/actions'
import { Modal, Portal, PaperProvider, Appbar, useTheme, Avatar, Card, Icon, ActivityIndicator, IconButton } from 'react-native-paper';
import { urlFor } from '../../sanity';



function Favourite({ }) {
  // const likedFacts = useSelector((state) => state.likedFacts);
  const likedFacts = useSelector((state) => state.fact.likedFacts); 
  const dispatch = useDispatch()
  console.log('Dark facts:', likedFacts); // Log the likedFacts received from Redux

  // if (!likedFacts || likedFacts.length === 0) {
  //   return <Text className=''>No liked facts yet!</Text>;
  // }

  const theme = useTheme();


  return (
    <View className='mx-4 mt-12 '>
      <ScrollView
        contentContainerStyle={{ paddingVertical: 10 }}
        showsVerticalScrollIndicator={false}
        className='flex gap-6'>
        {likedFacts.map((preview) => (
          <Card key={preview.id} className='pb-8' style={{ backgroundColor: theme.colors.secondary }}>
            <Card.Cover source={{ uri: urlFor(preview.image).url() }} />
            <View className=' '>
              <Card.Title className='font-bold' title={preview.title} />
              <View className='flex-row items-center absolute left-60 top-3'>
                <TouchableOpacity >
                  <Icon source="heart" size={29} />
                </TouchableOpacity>
              </View>
            </View>
            <Card.Content>
              <Text variant='bodyMedium'>{preview.shortDetail}</Text>
            </Card.Content>
          </Card>
        ))}
      </ScrollView>
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