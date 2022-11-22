import React, {useState} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import {WEB_CLIENT_ID} from '@env';


const Login = () => {
  const [user, setUser] = useState();
  const navigation = useNavigation();

  GoogleSignin.configure({
    webClientId: WEB_CLIENT_ID,
  });

  const signIn = async () => {
    try {
      //await GoogleSignin.hasPlayServices();
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      const userInfo = await GoogleSignin.signIn();
      setUser(userInfo);
      navigation.navigate('Gallery', {user});
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      } else if (error.code === statusCodes.IN_PROGRESS) {
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      } else {
      }
    }
  };

  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      setUser(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.label}>
        <Text style={[styles.mainFonts, {fontSize: 25, fontWeight: 'bold'}]}>
          Gallery
        </Text>
        <View style={styles.midlleLine} />
        <Text style={styles.mainFonts}>Homework Assignment</Text>
      </View>
      <GoogleSigninButton
        style={{width: 192, height: 48}}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={signIn}
       // disabled={}
      />
      <Button onPress={signOut} title="Signout" color="#841584"></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5b5555',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    marginBottom: 120,
  },
  mainFonts: {
    textAlign: 'center',
    fontFamily: 'Cochin',
    color: '#fff',
    padding: 8,
  },
  midlleLine: {
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
  },
});

export default Login;
