import React, { useState, useEffect } from 'react';
import {Text,View,StyleSheet, AsyncStorage} from 'react-native';
import { Formik } from 'formik';
import { TextInput, Button } from 'react-native-paper';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';



export default function FormScreen(){
    let[userUid,setUserUid]=useState('');

    async function userDataAdd(uid,name,age,gender,domain){
        database().ref(`/users/${uid}`)
        .update({
            name,
            age,
            gender,
            domain
        })
        .then(() => console.log('Data updated.'));
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
        <Formik  initialValues={{name:'',age:'',gender:'',domain:''}}
        onSubmit={values=>userDataAdd(userUid,values.name,values.age,values.gender,values.domain)}>
            {({handleChange,handleSubmit,values})=>(
                <View style={styles.formik}>
                    <TextInput label='Name'
                                style={styles.textInput}
                                mode='outlined'
                                onChangeText={handleChange('name')}
                                value={values.name}
                    />
                     <TextInput label='Age'
                                style={styles.textInput}
                                mode='outlined'
                                onChangeText={handleChange('age')}
                                value={values.age}
                    />
                     <TextInput label='Gender'
                                style={styles.textInput}
                                mode='outlined'
                                 onChangeText={handleChange('gender')}
                                 value={values.gender}
                    />
                     <TextInput label='Domain'
                                style={styles.textInput}
                                mode='outlined'
                                onChangeText={handleChange('domain')}
                                value={values.domain}
                    />
                    <Button icon="camera" mode="contained" style={styles.btn} onPress={handleSubmit}>
                        Submit
                    </Button>  
                </View>
            )
            }
        </Formik>
    )
}

let styles= StyleSheet.create({
    formik:{
        justifyContent:'center',
        alignItems:'center',
        marginTop:40
    },
    textInput:{
        width:responsiveWidth(80),
        marginTop:40,
    },
    btn:{
        marginTop:40
    }
})