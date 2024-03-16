import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Linking } from 'react-native';
import Modal from 'react-native-modal';

const CustomModal = ({ isVisible, onClose, link, url }) => {
  const handleLinkPress = () => {
    if (link) {
      Linking.openURL(link);
    }
  };

  return (
    <Modal isVisible={isVisible}>
      <View className="flex-1 justify-center items-center">
        <View className="bg-white p-4 rounded-lg w-full h-1/5">
          <Text className='text-black text-xl text-center font-semibold'>Sources</Text>
          {link && (
            <TouchableOpacity onPress={handleLinkPress}>
              <Text className="text-blue-500 text-md mt-2 text-center">{url}</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity  onPress={onClose}>
            <Text className="text-neutral-900 text-lg mt-4 text-center">Ok</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <View>

        </View>
      </View>
    </Modal>
  );
};

export default CustomModal;
