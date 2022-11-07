import {View, Text, FlatList} from 'react-native';
import React, {useState, useEffect} from 'react';
import {API_KEY} from '@env';
import GalleryItem from '../components/GalleryItem';

const Gallery = ({navigation}) => {
  const [photosData, setPhotosData] = useState<any>([]);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const numberPerPage: number = 50;
  const getRecentURL =
    'https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&name=value';
  const params = `&api_key=${API_KEY}&format=json&nojsoncallback=1&per_page=${numberPerPage}&page=${pageNumber}`;

  const fetchPhotos = async () => {
    await fetch(getRecentURL + params)
      .then(response => response.json())
      .then(items => setPhotosData(items.photos.photo))
      .catch(err => console.log(err));

    setPageNumber(pageNumber + 1);
  };

  const fetchNextPhotos = async () => {
    await fetch(getRecentURL + params)
      .then(response => response.json())
      .then(items => setPhotosData([...photosData, ...items.photos.photo]))
      .catch(err => console.log(err));

    setPageNumber(pageNumber + 1);
  };

  const renderItem = ({item}: any) => (
    <GalleryItem server={item.server} id={item.id} secret={item.secret} />
  );

  useEffect(() => {
    fetchPhotos();
  }, []);

  return (
    <View>
      <Text>Gallery</Text>
      <FlatList
        data={photosData}
        renderItem={renderItem}
        numColumns={3}
        keyExtractor={item => item.id}
        initialNumToRender={numberPerPage}
        onEndReachedThreshold={0.7}
        onEndReached={() => fetchNextPhotos()}
      />
    </View>
  );
};

export default Gallery;
