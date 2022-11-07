import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {API_KEY} from '@env';
import TagBox from '../components/TagBox';

interface infoState {
  title: string;
  description: string;
  tags: Array<any>;
  url: string;
  owner: string;
}

const infoInitialState: infoState = {
  title: '',
  description: '',
  tags: [],
  url: '',
  owner: '',
};

const Details = ({route}: any) => {
  const {id, imageURL} = route.params;
  const [isLoading, setIsLoading] = useState(true);
  const [info, setInfo] = useState(infoInitialState);
  const getInfoURL =
    'https://www.flickr.com/services/rest/?method=flickr.photos.getInfo&name=value';
  const params = `&api_key=${API_KEY}&photo_id=${id}&format=json&nojsoncallback=1`;

  const fetchInfo = async () => {
    await fetch(getInfoURL + params)
      .then(response => response.json())
      .then(data => {
        setInfo({
          ...info,
          title: data.photo.title._content,
          description: data.photo.description._content,
          tags: data.photo.tags.tag,
          url: data.photo.urls.url[0]._content,
          owner: data.photo.owner.username,
        });
        setIsLoading(false);
      })
      .catch(err => {
        setIsLoading(true);
        console.log(err);
      });
  };
  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <ScrollView style={styles.detailsContainer}>
          <Text style={[styles.mainFonts, {fontSize: 20}]}>{info.title}</Text>
          <View style={styles.midlleLine} />
          <Text style={styles.mainFonts}>
            {info.description.length < 100
              ? `${info.description}`
              : `${info.description.substring(0, 97)}...`}
          </Text>
          <Image
            style={styles.image}
            source={{
              uri: imageURL,
            }}
          />
          <Text style={[styles.mainFonts, {textAlign: 'right'}]}>
            By: {info.owner}
          </Text>
          <Text style={styles.mainFonts}>{info.url}</Text>
          <View style={styles.tagsList}>
            {info.tags.map(tag => (
              <TagBox tag={tag.raw} />
            ))}
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailsContainer: {
    flex: 1,
    margin: 5,
    paddingTop: 5,
    backgroundColor: '#fff',
  },
  mainFonts: {
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'Cochin',
    color: '#5b5555',
    padding: 8,
  },
  midlleLine: {
    borderBottomColor: '#5b5555',
    borderBottomWidth: 1,
    margin: 5,
  },
  image: {
    height: 350,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tagsList: {
    marginTop: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default Details;
