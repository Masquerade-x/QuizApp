import React, { useState, useEffect } from 'react';
import {Text,View,StyleSheet, TextInput} from 'react-native';
import { Formik } from 'formik';
import {  Button } from 'react-native-paper';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import Navigation from '../navigation/AppNavigator';
import { TouchableOpacity } from 'react-native-gesture-handler';



export default function FormScreen({navigation}){
    let[userUid,setUserUid]=useState('');
    let [questions,setQuestions]=useState([]);

    function questionDataAdd(values){

        setQuestions(old=>[...old,values]);
        
    }

    async function uploadQuestions(){
        try{
            await database().ref(`/data/`)
            .update({
                questions
            })
        }catch(error){
            console.log(error);
        }

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

    console.log(questions)

    return(
        <Formik  initialValues={{question:'',optionA:'',optionB:'',optionC:'',optionD:'',answer:''}}
        onSubmit={values=>questionDataAdd(values)}>
            {({handleChange,handleSubmit,values})=>(
                <View style={styles.formik}>
                    <TextInput label='Question'
                                style={styles.textInput}
                                mode='outlined'
                                onChangeText={handleChange('question')}
                                value={values.question}
                    />
                     <TextInput label='optionA'
                                style={styles.textInput}
                                mode='outlined'
                                onChangeText={handleChange('optionA')}
                                value={values.optionA}
                    />
                     <TextInput label='optionB'
                                style={styles.textInput}
                                mode='outlined'
                                 onChangeText={handleChange('optionB')}
                                 value={values.optionB}
                    />
                     <TextInput label='optionC'
                                style={styles.textInput}
                                mode='outlined'
                                onChangeText={handleChange('optionC')}
                                value={values.optionC}
                    />
                     <TextInput label='optionD'
                                style={styles.textInput}
                                mode='outlined'
                                onChangeText={handleChange('optionD')}
                                value={values.optionD}
                    />
                     <TextInput label='answer'
                                style={styles.textInput}
                                mode='outlined'
                                onChangeText={handleChange('answer')}
                                value={values.answer}
                    />
                    <Button icon="camera" mode="contained" style={styles.btn} onPress={handleSubmit}>
                        Submit
                    </Button>  
                    <TouchableOpacity onPress={uploadQuestions} style={styles.touch}>
                        <Text>Upload Data</Text>
                    </TouchableOpacity>
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