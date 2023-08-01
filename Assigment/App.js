import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Screens/Home';
import Login from './Screens/Login';
import NewFeed from './Screens/NewFeed';
import Follow from './Screens/Follow';
import Posts from './Screens/Posts';
import Register from './Screens/Register';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
        <Stack.Screen name="Register" component={Register} options={{headerShown: false}}/>
        <Stack.Screen name="NewFeed" component={NewFeed} options={{headerShown: false}}/>
        <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/>
        <Stack.Screen name="Follow" component={Follow} options={{headerShown: false}}/>
        <Stack.Screen name="Posts" component={Posts} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
