import React, { useState, useEffect ,useRef} from 'react'
import { Text,View,StyleSheet,RefreshControl,ScrollView, SafeAreaView} from "react-native";

import {
    responsiveHeight,
    responsiveWidth,
      } from "react-native-responsive-dimensions";
import { TouchableOpacity } from 'react-native-gesture-handler';
import Carousel from 'react-native-snap-carousel';
import reactQuestions from '../questions/reactQuestions';
import phpQuestions from'../questions/phpQuestions';
import {  IconButton,Button,Colors } from 'react-native-paper';


export default function QuizScreen({navigation,route}){
    let[questions,setQuestions]=useState([])
    let[noOfQuestion,setNoOfQuestion]=useState(1)
    let[noOfAnsweredQuestion,setNoOfAnsweredQuestion]=useState(0)
    let[currentQuestionIndex,setCurrentQuestionIndex]=useState(0)
    let[score,setScore]=useState(0)
    let[correctAnswers,setCorrectAnswers]=useState(0)
    let[wrongAnswers,setWrongAnswers]=useState(0)
    let[choice,setChoice]=useState('');
    let carouselRef = useRef('');
    let[refreshing,setRefreshing]=useState(false);
    let[correctQuestionsArray,setCorrectQuestionsArray]=useState([]);
    let[buttonShow,setButtonShow]=useState(true);


    useEffect(()=>{

        if(route.params.subject ==='React'){
            setQuestions(reactQuestions);
        }else{
            setQuestions(phpQuestions);
        }
    },[])

   const checkAnswer= (id,item)=>{
       let correct = item.item.correctAnswer.id === id;
       console.log(id)
       correct ? correctAnswer(id) : wrongAnswer(id)
   }

   function correctAnswer(id){
    setCurrentQuestionIndex(currentQuestionIndex +1),
    setNoOfAnsweredQuestion(noOfAnsweredQuestion+1),
    setCorrectQuestionsArray(oldArray=>[...oldArray,id])
    }

    function wrongAnswer(id){
        setCurrentQuestionIndex(currentQuestionIndex +1),
        setNoOfAnsweredQuestion(noOfAnsweredQuestion+1)
    }

    console.log(correctQuestionsArray);

   const renderOption=(item)=>{
       console.log(item);
        return(
        <>
            <View style={styles.card}>
              <Text style={{fontSize:20,color:'white',marginLeft:23}}>{item.item.question}</Text>
                <View style={styles.option}>
                    <TouchableOpacity style={styles.touch} onPress={()=>checkAnswer(item.item.options[0].id,item)}>
                        <Text style={{fontSize:20,color:'white',marginLeft:23}}>{item.item.options[0].option}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.touch} onPress={()=>checkAnswer(item.item.options[1].id,item)}>
                        <Text style={{fontSize:20,color:'white',marginLeft:23}}>{item.item.options[1].option}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.touch} onPress={()=>checkAnswer(item.item.options[2].id,item)}>
                        <Text style={{fontSize:20,color:'white',marginLeft:23}}>{item.item.options[2].option}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.touch} onPress={()=>checkAnswer(item.item.options[3].id,item)}>
                        <Text style={{fontSize:20,color:'white',marginLeft:23}}>{item.item.options[3].option}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.doneBtn}>
                <IconButton icon="arrow-left-bold-circle" color={Colors.green500} size={50} onPress={()=>carouselRef.snapToPrev(animated = true, fireCallback = true)} />        
                <Button icon="check-outline" mode="contained" disabled={buttonShow} style={styles.btn} onPress={showSubmitButton}>Submit</Button>
                <IconButton icon="arrow-right-bold-circle" color={Colors.green500} size={50} onPress={()=>carouselRef.snapToNext(animated = true, fireCallback = true)} />
            </View>
        </>
        )
    }

    function showSubmitButton(){
        console.log('done')
    }


    return(
    <SafeAreaView style={styles.container}>
        <View style={styles.dash}>
            <Text style={{fontSize:24,color:'green',marginRight:20}}>No of questions:{noOfQuestion}</Text>
        </View>
        <View style={styles.slide}>
            <Carousel 
            ref={(c)=>carouselRef=c}
            data={questions}
            scrollEnabled={false}
            renderItem={renderOption}
            firstItem={1}     
            sliderWidth={350}
            snapToPrev={animated = true, fireCallback = true}
            snapToNext={animated = true, fireCallback = true}
            itemWidth={350}
            />
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
    card:{
        backgroundColor:'green',
        borderRadius:5,
        alignItems:'center',
        marginTop:60,
        borderRadius:30,
        paddingTop:30,
        marginLeft:10,
        height:responsiveHeight(60)
    },
    option:{
        height:responsiveHeight(40),
        marginTop:35,
        justifyContent:'space-evenly',
        alignItems:'flex-start',
        alignSelf:'flex-start'
    },
    touch:{
      width:responsiveWidth(60),
    },
    slide:{
        flex: 4, 
        flexDirection:'row', 
        justifyContent: 'center',
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
        justifyContent:'space-between',
        alignItems:'center',
        marginBottom:30,
    }
    
})