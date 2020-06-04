// In App.js in a new project

import React, {useState, useEffect} from 'react';
import {Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import HomeScreen from '../screens/HomeScreen';
import QuizScreen from '../screens/QuizScreen';
import FormScreen from '../extraFiles/FormScreen';
import EnterQuestion from '../extraFiles/EnterQuestions';
import ReviewScreen from '../screens/ReviewScreen';
import SuccessScreen from '../screens/SuccessScreen';
import auth from '@react-native-firebase/auth';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Quiz from '../extraFiles/Quiz';

let Stack = createStackNavigator();
let Drawer = createDrawerNavigator();

export default function Navigation({navigation}) {
  let [userToken, setUserToken] = useState({});

  useEffect(() => {
    let subscribe = auth().onAuthStateChanged(async user => {
      setUserToken(user);
    });
    return () => {
      subscribe();
    };
  }, [navigation]);

  async function signOut() {
    await auth().signOut();
  }

  function CustomDrawerContent(props) {
    return (
      <DrawerContentScrollView {...props}>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 20,
          }}
          onPress={() => props.navigation.navigate('Home')}>
          <Text style={{color: 'green'}}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{justifyContent: 'center', alignItems: 'center'}}
          onPress={signOut}>
          <Text style={{color: 'green'}}>Sign Out</Text>
        </TouchableOpacity>
      </DrawerContentScrollView>
    );
  }

  function Main() {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Quiz" component={QuizScreen} />
        <Stack.Screen name="Review" component={ReviewScreen} />
        <Stack.Screen name="Success" component={SuccessScreen} />
        <Stack.Screen name="Enter" component={EnterQuestion} />
      </Stack.Navigator>
    );
  }

  return (
    <NavigationContainer>
      {userToken == null ? (
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="Form" component={FormScreen} />
        </Stack.Navigator>
      ) : (
        <Drawer.Navigator
          drawerContent={props => <CustomDrawerContent {...props} />}>
          <Drawer.Screen name="Main" component={Main} />
        </Drawer.Navigator>
      )}
    </NavigationContainer>
  );
}
