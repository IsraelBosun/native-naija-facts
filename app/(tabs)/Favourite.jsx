import { View, Text } from 'react-native'
import React from 'react'

export default function Favourite() {
  return (
    <View>
      <Text>Favourite</Text>
    </View>
  )
}




// In your Favorites tab/screen component
// {likedFacts.map((fact) => (
//     <View key={fact.id}>
//       {/* Display the liked fact information */}
//       <Text>{fact.shortDetail}</Text>
//       {/* Add other details as needed */}
//     </View>
//   ))}