import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

// Screens
import HomeScreen from './HomeScreen';
import LoginScreen from './LoginScreen';
import EditProfile from './EditProfileScreen';


//Screen names
const homeName = "Home";
const editProfileName = "EditProfile";

const Tab = createBottomTabNavigator();

function BottomNavigator() {
  return (
    <Tab.Navigator
    initialRouteName={homeName}
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        let rn = route.name;

        if (rn === homeName) {
          iconName = focused ? 'home' : 'home-outline';

        } else if (rn === editProfileName) {
          iconName = focused ? 'settings' : 'settings-outline';
        }

        // You can return any component that you like here!
        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}
    tabBarOptions={{
      activeTintColor: 'tomato',
      inactiveTintColor: 'grey',
      labelStyle: { paddingBottom: 10, fontSize: 10 },
      style: { padding: 10, height: 70}
    }}>

      <Tab.Screen name={homeName}  options={{ headerShown: false }} component={HomeScreen} />
      <Tab.Screen name={editProfileName} options={{ headerShown: false }} component={EditProfile} />
  </Tab.Navigator>
  );
}

export default BottomNavigator;