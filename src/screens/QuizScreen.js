import React, { useState, useEffect ,useRef} from 'react'
import { Text,View,StyleSheet,RefreshControl,ScrollView, SafeAreaView} from "react-native";

import {
    responsiveHeight,
    responsiveWidth,
      } from "react-native-responsive-dimensions";
import { TouchableOpacity,TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Carousel from 'react-native-snap-carousel';
import reactQuestions from '../questions/reactQuestions';
import phpQuestions from'../questions/phpQuestions';
import {  IconButton,Button,Colors } from 'react-native-paper';
import Options from '../Components/Options';


export default function QuizScreen({navigation,route}){
    let[questions,setQuestions]=useState([]);
    let[noOfQuestion,setNoOfQuestion]=useState(1);
    let[choice,setChoice]=useState('');
    let carouselRef = useRef('');
    let[refreshing,setRefreshing]=useState(false);
    let[buttonShow,setButtonShow]=useState(true);
    let[disableChoice,setDisableChoice]=useState(false);
    let[disableNext,setDisableNext]=useState(true);
    let[optionArray,setOptionArray]=useState([]);


    useEffect(()=>{

        if(route.params.subject ==='React'){
            setQuestions(reactQuestions);
        }else{
            setQuestions(phpQuestions);
        }
    },[])

    
    function submit(){
        console.log('submitted');   
    }

    useEffect(()=>{
        console.log(optionArray);
    })

    function nextQuestion(){
        setOptionArray(oldArray=>[...oldArray,currentOption])
        carouselRef.snapToNext(animated = true, fireCallback = true)

    }

    return(
    <SafeAreaView style={styles.container}>
        <View style={styles.dash}>
            <Text style={{fontSize:24,color:'green',marginRight:20}}>No of questions:{noOfQuestion}</Text>
        </View>
        <Options data={questions}  style={styles.carousel}/>
        <View style={styles.doneBtn}>
                <Button icon="check-outline" mode="contained" disabled={buttonShow} style={styles.btn} onPress={submit}>Submit</Button>
                <IconButton icon="arrow-right-bold-circle" color={Colors.green500} style={styles.iconBtn} size={50} onPress={nextQuestion} />
        </View> 
        <View style={styles.creator}>
            <Text style={{color:'green',fontSize:14,fontStyle:'italic'}}>&#xA9;Masquerade</Text>
        </View>
        
    </SafeAreaView>
    )
}
var styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white',
    },
    question:{
        fontSize:20,
        color:'black',
      
    },
    dash:{
        alignItems:'flex-end',
        marginBottom:20
    },
    creator:{
        alignItems:'flex-end',
        marginRight:10,
        
    },
    doneBtn:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        marginBottom:30,
    },
    btn:{
        left:45
    },
    iconBtn:{
        left:90
    }
    
})