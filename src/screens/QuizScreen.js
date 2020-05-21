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


    console.log(route.params.subject,'heklkfjla');  
    console.log(questions);

    useEffect(()=>{

        if(route.params.subject ==='React'){
            setQuestions(reactQuestions);
        }else{
            setQuestions(phpQuestions);
        }
    },[])

   const checkAnswer= (item,i)=>{
       console.log(item,i);
       if(item == i){
          correctAnswer()
       }else{
           wrongAnswer()
       }
   }

   function correctAnswer(){
    setCorrectAnswers(correctAnswers+1),
    setCurrentQuestionIndex(currentQuestionIndex +1),
    setNoOfAnsweredQuestion(noOfAnsweredQuestion+1)
    }

    function wrongAnswer(){
        setWrongAnswers(wrongAnswers+1),
        setCurrentQuestionIndex(currentQuestionIndex +1),
        setNoOfAnsweredQuestion(noOfAnsweredQuestion+1)
    }

   const renderOption=(item)=>{
        return(
            <View style={styles.card}>
              <Text style={{fontSize:20,color:'white',marginLeft:23}}>{item.item.question}</Text>
                <View style={styles.option}>
                    <TouchableOpacity style={styles.touch} onPress={()=>checkAnswer(item.item.options[0].id,item.item.options[4].id)}>
                        <Text style={{fontSize:20,color:'white',marginLeft:23}}>{item.item.options[0].option}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.touch} onPress={()=>checkAnswer(item.item.options[1].id,item.item.options[4].id)}>
                        <Text style={{fontSize:20,color:'white',marginLeft:23}}>{item.item.options[1].option}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.touch} onPress={()=>checkAnswer(item.item.options[2].id,item.item.options[4].id)}>
                        <Text style={{fontSize:20,color:'white',marginLeft:23}}>{item.item.options[2].option}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.touch} onPress={()=>checkAnswer(item.item.options[3].id,item.item.options[4].id)}>
                        <Text style={{fontSize:20,color:'white',marginLeft:23}}>{item.item.options[3].option}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    return(
    <SafeAreaView style={styles.container}>
        <View style={styles.slide}>
            <Carousel 
            ref={carouselRef}
            data={questions}
            renderItem={renderOption}
            sliderWidth={300}
            itemWidth={300}
            onSnapToItem = { (i)=>setNoOfQuestion(i+1).setIndex(i) }
            />
        </View>
        <View style={styles.dash}>
            <Text style={{fontSize:24,color:'#6a0dad',marginRight:20}}>No of questions:{noOfQuestion}</Text>
            <Text style={{fontSize:24,color:'#6a0dad',marginRight:20}}>No of correctAnswer:{correctAnswers}</Text>
            <Text style={{fontSize:24,color:'#6a0dad',marginRight:20}}>No of worng:{wrongAnswers}</Text>
        </View>
        <View style={styles.creator}>
            <Text style={{color:'#6a0dad',fontSize:14,fontStyle:'italic'}}>&#xA9;Masquerade</Text>
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
        backgroundColor:'#6a0dad',
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
        flex:1,
        alignItems:'flex-end',
    },
    creator:{
        alignItems:'flex-end',
        marginRight:10,
        
    }
    
})