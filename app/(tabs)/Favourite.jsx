import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { connect } from 'react-redux'

function Favourite({ likedFacts}) {
  return (
    <ScrollView>
      {likedFacts.map((fact) => (
        <View key={fact.id}>
          <Text>{fact.text}</Text>
          {/* Render other details of the liked fact */}
        </View>
      ))}
    </ScrollView>
  )
};

const mapStateToProps = (state) => ({
  likedFacts: state.likedFacts,
});

export default connect(mapStateToProps)(Favourite);




// In your Favorites tab/screen component
// {likedFacts.map((fact) => (
//     <View key={fact.id}>
//       {/* Display the liked fact information */}
//       <Text>{fact.shortDetail}</Text>
//       {/* Add other details as needed */}
//     </View>
//   ))}