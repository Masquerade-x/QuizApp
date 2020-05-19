import React,{useState, useEffect} from 'react';
import { View, Text,TextInput, StyleSheet,Button,AsyncStorage } from 'react-native';
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
  } from "react-native-responsive-dimensions";
import auth from '@react-native-firebase/auth';


export default function LoginScreen({navigation}) {
    let[email,setEmail]=useState('');
    let[password,setPassword]=useState('');
    let[userInfo,setUserInfo]=useState('')
    
  
    // Set an initializing state whilst Firebase connects
    let [initializing, setInitializing] = useState(true);
    let [user, setUser] = useState();

    function onAuthStateChanged(user){
        setUser(user);
        if(initializing) setInitializing(false);
    }

    useEffect(()=>{
        let subscribe = auth().onAuthStateChanged(onAuthStateChanged);
        return subscribe;
    },[])


    async function Login(){
        console.log('Login');
        try{
            await auth().signInWithEmailAndPassword(email,password).then(()=>navigation.navigate('Home'))
        }catch(error){
            console.log(error);
        }

    }

     return (
      <View style={styles.container}>
          <View style={styles.form}> 
            <View style={styles.email}>
                <TextInput label='Email' style={styles.textInput}
                onChangeText={e=>setEmail(e)} 
                placeholder='Enter Email'
                 autoCapitalize="none"
                value={email}/>
            </View>
            <View style={styles.password}>
                <TextInput label='Password' style={styles.textInput}
                 secureTextEntry 
                 placeholder='Enter Password'
                 onChangeText={pass=>setPassword(pass)} 
                 autoCapitalize="none"
                 value={password}></TextInput>
            </View>
            <View style={styles.btnText}>
                <Button onPress={Login} title='Login'/>
                <Text style={{marginTop:10}}>New to it ?<Text onPress={()=>navigation.navigate('Signup')} style={{color:'#6310e3'}}> Signup</Text></Text>
            </View>
          </View>
          <View styles={styles.owner}>
            <Text style={{alignSelf:'flex-end',color:'#6310e3',marginEnd:10}}>
              &#xA9;Masquerade
             </Text>
          </View>
      </View>
    )
  }

  let styles= StyleSheet.create({
      container:{
          flex:1
        },
        form:{
            flex:2,
           justifyContent:'center',
          },
          email:{
            alignItems:'center',
            marginBottom:25,
          },
          password:{
            alignItems:'center',
            marginBottom:40,
          },
          textInput:{
            width: responsiveWidth(80),
            borderBottomColor:'#6310e3',
            borderBottomWidth:StyleSheet.hairlineWidth,
            color:'#6310e3'
          },
          btnText:{
            alignItems:'center',
          },
        })