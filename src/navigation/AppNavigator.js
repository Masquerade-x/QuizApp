  // In App.js in a new project

import React , {useState,useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen'
import SignupScreen from '../screens/SignupScreen';
import HomeScreen from '../screens/HomeScreen';
import QuizScreen from '../screens/QuizScreen';
import FormScreen from '../screens/FormScreen';
import EnterQuestion from '../screens/EnterQuestions';
import auth from '@react-native-firebase/auth';



let Stack = createStackNavigator();

export default function Navigation({navigation}) {
  let[userToken,setUserToken]=useState({});
  
  useEffect(()=>{
    let subscribe = auth().onAuthStateChanged(async user=>{
      setUserToken(user);
    });
    return ()=>{
      subscribe();
    }
  },[navigation]);

  console.log(userToken);

  return (
    <NavigationContainer>
      {userToken == null ? (
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Form" component={FormScreen} />        
      </Stack.Navigator>
        ):(
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Quiz" component={QuizScreen} />   
        <Stack.Screen name="Enter" component={EnterQuestion} /> 
      </Stack.Navigator>
      )}  
    </NavigationContainer>
     )
  }
