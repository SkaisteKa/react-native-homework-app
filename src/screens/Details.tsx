import React, {useEffect, useState} from 'react';
import {View, Text, Image, ActivityIndicator} from 'react-native';
import {API_KEY} from '@env';

interface infoState {
  title: string;
  description: string;
  tags: Array<string>;
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
    <View>
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <View>
          <Text>Title: {info.title}</Text>
          <Text>Description: {info.description}</Text>
          <Text>
            Tags:{' '}
            {info.tags.map(tag => (
              <Text key={tag.raw}>{tag.raw},</Text>
            ))}
          </Text>
          <Text>URL: {info.url}</Text>
          <Text>Owner: {info.owner}</Text>
          <Image
            style={{width: 300, height: 300}}
            source={{
              uri: imageURL,
            }}
          />
        </View>
      )}
    </View>
  );
};

export default Details;
