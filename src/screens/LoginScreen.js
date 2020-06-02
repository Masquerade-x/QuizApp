import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  RefreshControl,
  ScrollView,
  ImageBackground,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import auth from '@react-native-firebase/auth';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {showMessage, hideMessage} from 'react-native-flash-message';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function LoginScreen({navigation}) {
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let [userInfo, setUserInfo] = useState('');
  let [refreshing, setRefreshing] = useState(false);
  let [user, setUser] = useState({});
  let [errorMessage, setErrorMessage] = useState('');

  // Set an initializing state whilst Firebase connects
  let [initializing, setInitializing] = useState(true);

  let onRefresh = useCallback(() => {
    setRefreshing(true);
    setEmail('');
    setPassword('');
    setRefreshing(false);
    setInitializing(true);
  }, []);

  function onAuthStateChanged(user) {
    setUser(user);
  }



  async function Login() {
    try {
      await auth().signInWithEmailAndPassword(email, password);
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
        source={require('../assets/green.jpg')}
        style={styles.img}>
      <KeyboardAvoidingView 
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      contentContainerStyle={styles.keyboard}>
        <View style={styles.title}>
          <Text style={{color: 'white', fontSize: 40}}>Login</Text>
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
            <View style={[styles.line, styles.linePlace1]} />
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
            <View style={[styles.line, styles.linePlace2]} />
            <View style={[styles.circle2, styles.semicircle]} />
            <View style={[styles.line, styles.linePlace3]} />
            <View style={[styles.circle3, styles.semicircle]} />
          </View>
          <View style={styles.btnText}>
            <TouchableOpacity onPress={Login} style={styles.touch}>
              <Text style={{fontSize: 22, color: 'white'}}>Login</Text>
            </TouchableOpacity>
            <View style={[styles.line, styles.linePlace4]} />
          </View>
          <View style={styles.join}>
            <TouchableOpacity
              style={styles.joinBtn}
              onPress={() => navigation.navigate('Signup')}>
              <Text style={{color: 'white', fontSize: 25}}>Join Us !</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View styles={styles.owner}>
          <Text style={{alignSelf: 'flex-end', color: 'white', marginEnd: 10}}>
            &#xA9;Masquerade
          </Text>
        </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </ScrollView>
  );
}

let styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  img: {
    flex: 1,
  },
  keyboard:{
    flex:1
  },
  title: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  form: {
    flex: 3,
    justifyContent: 'center',
  },
  email: {
    alignItems: 'center',
    marginBottom: 25,
  },
  password: {
    alignItems: 'center',
    marginBottom: 40,
  },
  textInput: {
    width: responsiveWidth(70),
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
  },
  line: {
    height: 2,
    backgroundColor: 'white',
  },
  linePlace1: {
    width: responsiveWidth(73),
    top: -64,
    right: 16,
  },
  linePlace2: {
    width: responsiveWidth(65),
    top: -62,
    left: 1,
  },
  linePlace3: {
    width: responsiveWidth(65),
    top: 14,
    left: 1,
  },
  linePlace4: {
    width: responsiveWidth(73),
    top: 21,
    left: 40,
  },
  circle: {
    borderTopRightRadius: 60,
    borderBottomRightRadius: 60,
    borderLeftWidth: 0,
    right: 30,
    top: -15.2,
  },
  circle2: {
    borderTopLeftRadius: 60,
    borderBottomLeftRadius: 60,
    borderRightWidth: 0,
    left: 32,
    top: -13,
  },
  circle3: {
    borderTopRightRadius: 60,
    borderBottomRightRadius: 60,
    borderLeftWidth: 0,
    right: 30,
    top: 65,
  },
  semicircle: {
    width: responsiveWidth(10),
    height: 80,
    borderColor: 'white',
    borderWidth: 2,
    position: 'absolute',
  },
  touch: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  join: {
    marginTop: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  joinBtn: {
    borderColor: 'white',
    borderRadius: 30,
    borderWidth: 2,
    width: responsiveWidth(60),
    height: responsiveHeight(7),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
