import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Gallery from './src/screens/Gallery';
import Details from './src/screens/Details';

type StackParamList = {
  Gallery: undefined;
  Details: {id: string; imageURL: string};
};

const Stack = createNativeStackNavigator<StackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Gallery"
          component={Gallery}
          options={{title: ''}}
        />
        <Stack.Screen
          name="Details"
          component={Details}
          options={{title: ''}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
