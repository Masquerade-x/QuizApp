import React,{useState, useEffect} from 'react';
import {SafeAreaView,ImageBackground,Text,View,StyleSheet,TextInput,TouchableOpacity, AsyncStorage} from 'react-native'
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from "react-native-responsive-dimensions";
import  auth from '@react-native-firebase/auth'

export default function SignupsScreen({navigation}){
    let[password,setPassword]=useState('');
    let[email,setEmail]=useState('');
    let[name,setName]=useState('');
    let[errorMessage,setErrorMessage]=useState('');
  
    function getErrorMessage(){ 
      if(!email && !password ){
        return 'fields are mandatory'
      }
      if(!email){
        return 'Email is missing'
      }
      if(!password){
        return 'Password is missing'
      }
    }

    async function onCreateAccount(){
        try{
            await AsyncStorage.setItem('@storage_Key',name);
            await auth().createUserWithEmailAndPassword(email,password).then(()=>navigation.navigate('Form'))
        }catch(error){
            console.log(error);
        }

    }

    return(
      <ImageBackground source={require('../assets/button.jpg')} style={styles.container}>
          <View style={styles.form}> 
            <View style={styles.email}>
                <TextInput label='Email' style={styles.textInput}
                placeholderTextColor="white" 
                placeholderTextSize='40'
                onChangeText={e=>setEmail(e)} 
                placeholder='Enter Email'
                 autoCapitalize="none"
                value={email}/>
                <View style={[styles.line,styles.linePlace1]} />
                <View style={[styles.circle,styles.semicircle]} />
            </View>
           <View style={styles.password}>
                <TextInput label='Password' style={styles.textInput}
                 secureTextEntry 
                 placeholderTextColor="white" 
                 placeholder='Enter Password'
                 onChangeText={pass=>setPassword(pass)} 
                 autoCapitalize="none"
                 value={password}></TextInput>
                <View style={[styles.line,styles.linePlace2]} />
                <View style={[styles.circle2,styles.semicircle]} />
                <View style={[styles.line,styles.linePlace3]} />
            </View>
              <View style={styles.btn}>
              <TouchableOpacity onPress={onCreateAccount} style={styles.touch}>
                      <Text style={{fontSize:22,color:'white'}}>Sign Up</Text>
              </TouchableOpacity>
                    
              </View>              
          </View>
        </ImageBackground>
    )
  }
  
  let styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor:'white'
    },
    form:{
      flex:2,
     justifyContent:'center',
    },
    password:{
      marginBottom:40,
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
      width: responsiveWidth(70),
      fontSize:18,
      color:'white',
      textAlign:'center',
    },
    line:{
        height:2,
        backgroundColor:'white',
    },
    linePlace1:{
      width:responsiveWidth(73),
      top:-64,
      right:16
    },
    linePlace2:{
      width:responsiveWidth(65),
      top:-62,
      left:1
    },
    linePlace3:{
      width:responsiveWidth(72),
      top:14,
      left:15
    },
    circle: {
      borderTopRightRadius: 60,
      borderBottomRightRadius:60,
      borderLeftWidth:0,
      right:30,
      top:-15.2
    },
    circle2: {
      borderTopLeftRadius: 60,
      borderBottomLeftRadius:60,
      borderRightWidth:0,
      left:32,
      top:-13,
      
    },
    semicircle:{
      width:responsiveWidth(10),
      height: 80,
      borderColor:'white',
      borderWidth:2,
      position:"absolute",
    },
    btn:{
      justifyContent:'center',
      alignItems:'center'
    },
    touch:{
      justifyContent:'center',
      alignItems:'center',
      marginTop:80,
      height:responsiveHeight(6),
      borderWidth:2,
      borderColor:'white',
      width:responsiveWidth(70),
      borderRadius:30
    }
  })