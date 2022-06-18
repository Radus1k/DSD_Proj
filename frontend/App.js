import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import BottomNavigator from './screens/BottomNavigatorScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

const Stack = createNativeStackNavigator();

import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import AddAuction from './screens/AddAuction';



export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name="test"
        component={BottomNavigator}
        options={{ headerShown: false }}
      /> 
      <Stack.Screen name="Home"  options={{ headerShown: false }} component={HomeScreen} />
      <Stack.Screen name="Login" options={{ headerShown: false }} component={LoginScreen} />
      <Stack.Screen name="Auction" options={{ headerShown: false }} component={AddAuction} />
    </Stack.Navigator>
 </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#34568B',
    alignItems: 'center',
    justifyContent: 'center',
  },
});