import React,{useState, useEffect} from 'react';
import {SafeAreaView,View,StyleSheet,TextInput,Button, AsyncStorage} from 'react-native'
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
      <View style={styles.container}>
          <View style={styles.form}> 
          <View style={[styles.name,styles.class]}>
                  <TextInput  placeholder='Enter Full Name' style={styles.textInput} autoCapitalize="none" onChangeText={e=>setName(e)} value={name}></TextInput>
              </View>
              <View style={[styles.email,styles.class]}>
                  <TextInput  placeholder='Enter Email' style={styles.textInput} autoCapitalize="none" onChangeText={e=>setEmail(e)} value={email}></TextInput>
              </View>
              <View style={[styles.class,styles.password]}>
                  <TextInput placeholder='Enter Password'  style={styles.textInput} autoCapitalize="none" onChangeText={e=>setPassword(e)} value={password}></TextInput>
              </View>
              <View style={[styles.btnText,styles.class]}>
                    <Button onPress={onCreateAccount} style={styles.btn} title="signuip"/>
                    
              </View>              
          </View>
        </View>
    )
  }
  
  let styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor:'white'
      },
    welcomemsg:{
      flex:1,
      justifyContent:'center',
      alignItems:'center',
    },
    class:{
      marginBottom:20,
      alignItems:'center'
    },
    form:{
      flex:2,
     justifyContent:'center',
    },
    password:{
      marginBottom:40,
    },
    textInput:{
      width:responsiveWidth(80),
      width:responsiveWidth(80),
      borderBottomColor:'#6310e3',
      borderBottomWidth:StyleSheet.hairlineWidth,
      color:'#6310e3'
    },
    btnText:{
      alignItems:'center',
    },
    btn:{
      width:responsiveWidth(50)
    }
  })