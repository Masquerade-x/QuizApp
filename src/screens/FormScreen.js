import React, { useState, useEffect } from 'react';
import {Text,View,StyleSheet, AsyncStorage,TextInput, ImageBackground, TextComponent} from 'react-native';
import { Formik } from 'formik';
import {  Button } from 'react-native-paper';
import { responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import Navigation from '../navigation/AppNavigator';
import { TouchableOpacity } from 'react-native-gesture-handler';



export default function FormScreen({navigation}){
    let[userUid,setUserUid]=useState('');

    async function userDataAdd(values,uid,name,age,gender,domain){
        database().ref(`/users/${uid}`)
        .update({
            name,
            age,
            gender,
            domain
        })
        .then(()=>navigation.navigate('Login'));
    }

  
    useEffect(()=>{
     let unsubscribe = auth().onAuthStateChanged(async user=>{
         if(user){
             console.log(user);
             setUserUid(user.uid);
             database().ref(`/users/${user.uid}`)
             .set({
                 uid:user.uid,
                 email:user.email
             })
         }
     })
     return ()=>{
         unsubscribe();
     }
    },[])

    return(
        <ImageBackground  source={require('../assets/cyan.jpg')} style={styles.img}>
            <View style={styles.welcomeMessage}>
                <Text style={{fontSize:25,color:'white',opacity:0.8}}> Please Fill your Details !</Text>
            </View>
        <Formik  initialValues={{name:'',age:'',gender:'',domain:''}}
        onSubmit={values=>userDataAdd(values)}>
            {({handleChange,handleSubmit,values})=>(
                <View style={styles.formik}>
                    <TextInput label='Name'
                                style={styles.textInput}
                                placeholderTextColor="white" 
                                placeholder='Enter Name'
                                onChangeText={handleChange('name')}
                                value={values.name}
                    />
                     <TextInput label='Age'
                                style={styles.textInput}
                                placeholderTextColor="white" 
                                placeholder='Enter Age'
                                onChangeText={handleChange('age')}
                                value={values.age}
                    />
                     <TextInput label='Gender'
                                style={styles.textInput}
                                placeholderTextColor="white" 
                                placeholder='Enter Gender'
                                 onChangeText={handleChange('gender')}
                                 value={values.gender}
                    />
                     <TextInput label='Domain'
                                style={styles.textInput}
                                placeholderTextColor="white" 
                                placeholder='Enter Domain'
                                onChangeText={handleChange('domain')}
                                value={values.domain}
                    />
                   <TouchableOpacity onPress={handleSubmit} style={styles.touch}>
                       <Text style={{color:'white',fontSize:22,opacity:0.9}}>Submit</Text>
                   </TouchableOpacity>
                </View>
            )
            }
        </Formik>
    </ImageBackground>
    )
}

let styles= StyleSheet.create({
    img:{
        flex:1
    },
    welcomeMessage:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },  
    formik:{flex:6,
        justifyContent:'space-evenly',
        alignItems:'center',
    },
    textInput:{
        width: responsiveWidth(70),
        fontSize:18,
        color:'white',
        textAlign:'center',
        borderBottomColor:'white',
        borderRadius:2,
        borderBottomWidth:2,
        opacity:0.8
    },
    touch:{
        borderRadius:25,
        borderWidth:2,
        borderColor:'white',
        height:responsiveHeight(8),
        width:responsiveWidth(50),
        justifyContent:'center',
        alignItems:'center',
        opacity:0.8
    }
})