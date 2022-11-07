import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const TagBox = ({tag}: any) => {
  return (
    <View style={styles.box} key={tag}>
      <Text style={styles.tagText}>{tag}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    backgroundColor: '#5b5555c2',
    justifyContent: 'center',
    alignContent: 'center',
    margin: 2,
    padding: 5,
    borderRadius: 5,
    height: 30,
  },
  tagText: {
    textAlign: 'center',
    fontFamily: 'Cochin',
    color: '#fff',
  },
});

export default TagBox;
