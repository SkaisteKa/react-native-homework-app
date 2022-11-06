import {View, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import {API_KEY} from '@env';

const Gallery = () => {
  const [photosData, setPhotosData] = useState<any>([]);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const numberPerPage = 50;
  const url =
    'https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&name=value';
  const params = `&api_key=${API_KEY}&format=json&nojsoncallback=1&per_page=${numberPerPage}&page=${pageNumber}`;

  const fetchPhotos = async () => {
    await fetch(url + params)
      .then(response => response.json())
      .then(items => setPhotosData(items.photos.photo))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  return (
    <View>
      <Text>Gallery</Text>
    </View>
  );
};

export default Gallery;
