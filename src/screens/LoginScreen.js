import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  RefreshControl,
  ScrollView,
  ImageBackground,
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
  let [refreshing, setRefreshing] = useState(false);

  // Set an initializing state whilst Firebase connects
  let [initializing, setInitializing] = useState(true);

  let onRefresh = useCallback(() => {
    setRefreshing(true);
    setEmail('');
    setPassword('');
    setRefreshing(false);
    setInitializing(true);
  }, []);

  async function Login() {
    try {
      await auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      showMessage({
        message: 'Error',
        description: error.message,
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
          <View style={styles.touch}>
            <TouchableOpacity onPress={Login}>
              <Text style={{fontSize: 22, color: 'white'}}>Login</Text>
            </TouchableOpacity>
            <View style={[styles.circle, styles.semicircle]} />
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
  keyboard: {
    flex: 1,
  },
  title: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  form: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  email: {
    alignItems: 'center',
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderColor: 'white',
    paddingVertical: 30,
    width: responsiveWidth(60),
  },
  password: {
    alignItems: 'center',
    borderBottomWidth: 2,
    borderColor: 'white',
    paddingVertical: 30,
    width: responsiveWidth(60),
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
  touch: {
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 2,
    borderColor: 'white',
    paddingVertical: 30,
    width: responsiveWidth(60),
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
