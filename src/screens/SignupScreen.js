import React, {useState, useEffect, useCallback} from 'react';
import {
  RefreshControl,
  ScrollView,
  ImageBackground,
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import auth from '@react-native-firebase/auth';
import {showMessage, hideMessage} from 'react-native-flash-message';

export default function SignupsScreen({navigation}) {
  let [password, setPassword] = useState('');
  let [email, setEmail] = useState('');
  let [errorMessage, setErrorMessage] = useState('');
  let [refreshing, setRefreshing] = useState(false);

  // function getErrorMessage(){
  //   if(!email && !password ){
  //    return 'fields are mandatory'
  //   }
  //   if(!email){
  //     return 'Email is missing'
  //   }
  //   if(!password){
  //     return 'Password is missing'
  //   }
  // }

  let onRefresh = useCallback(() => {
    setRefreshing(true);
    setEmail('');
    setPassword('');
    setErrorMessage('');
    setRefreshing(false);
  }, []);

  async function onCreateAccount() {
    try {
      await auth().createUserWithEmailAndPassword(email, password);
    } catch (error) {
      showMessage({
        message: 'Error',
        description: 'Invalid credentials !!! Please try again !',
        type: 'Cutstom',
        backgroundColor: 'none',
        color: 'white', // text color
      });
    }
  }

  return (
    <ScrollView
      contentContainerStyle={styles.scrollView}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <ImageBackground
        source={require('../assets/button.jpg')}
        style={styles.container}>
        <View style={styles.error}>
          <Text style={{color: 'white'}}>{errorMessage}</Text>
        </View>
        <View style={styles.form}>
          <View style={styles.email}>
            <TextInput
              label="Email"
              style={styles.textInput}
              placeholderTextColor="white"
              placeholderTextSize="40"
              onChangeText={e => setEmail(e)}
              placeholder="Enter Email"
              autoCapitalize="none"
              value={email}
            />
            <View style={[styles.circle, styles.semicircle]} />
          </View>
          <View style={styles.password}>
            <TextInput
              label="Password"
              style={styles.textInput}
              secureTextEntry
              placeholderTextColor="white"
              placeholder="Enter Password"
              onChangeText={pass => setPassword(pass)}
              autoCapitalize="none"
              value={password}
            />
            <View style={[styles.circle2, styles.semicircle]} />
          </View>
          <View style={styles.btn}>
            <TouchableOpacity onPress={onCreateAccount} style={styles.touch}>
              <Text style={{fontSize: 22, color: 'white'}}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </ScrollView>
  );
}

let styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  form: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  email: {
    alignItems: 'center',
    padding: 30,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    width: responsiveWidth(60),
    borderColor: 'white',
  },
  password: {
    alignItems: 'center',
    padding: 30,
    borderBottomWidth: 2,
    width: responsiveWidth(60),
    borderColor: 'white',
  },
  textInput: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
  },
  circle: {
    borderTopRightRadius: 60,
    borderBottomRightRadius: 60,
    borderLeftWidth: 0,
    right: -responsiveWidth(10),
    top: 0,
  },
  circle2: {
    borderTopLeftRadius: 60,
    borderBottomLeftRadius: 60,
    borderRightWidth: 0,
    left: -responsiveWidth(10),
    top: 0,
  },
  semicircle: {
    width: responsiveWidth(20),
    borderColor: 'white',
    borderWidth: 2,
    position: 'absolute',
    top: -2,
    bottom: -2,
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  touch: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 80,
    height: responsiveHeight(6),
    borderWidth: 2,
    borderColor: 'white',
    width: responsiveWidth(70),
    borderRadius: 30,
  },
});
