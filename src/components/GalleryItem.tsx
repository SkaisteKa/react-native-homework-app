import React from 'react';
import {TouchableOpacity, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';

interface GalleryItemProps {
  server: number;
  id: number;
  secret: number;
}

const GalleryItem = ({server, id, secret}: GalleryItemProps) => {
  const imageURL = `https://live.staticflickr.com/${server}/${id}_${secret}.jpg`;
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Details', {id, imageURL})}>
      <Image
        style={{width: 100, height: 100}}
        source={{
          uri: imageURL,
        }}
      />
    </TouchableOpacity>
  );
};

export default GalleryItem;
