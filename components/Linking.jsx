import React from 'react';
import { View, Text, TouchableOpacity, Linking } from 'react-native';

const ExternalLink = ({ url, title }) => {
  const handlePress = () => {
    Linking.openURL(url);
  };

  return (
    <TouchableOpacity className='' onPress={handlePress}>
      <Text className='text-[15px]'>{title}</Text>
    </TouchableOpacity>
  );
};

export default ExternalLink;
