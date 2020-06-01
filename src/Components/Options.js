import React, { useState, useEffect ,useRef} from 'react'
import { Text,View,StyleSheet,RefreshControl,ScrollView, SafeAreaView} from "react-native";

import {
    responsiveHeight,
    responsiveWidth,
      } from "react-native-responsive-dimensions";
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Carousel from 'react-native-snap-carousel';
import reactQuestions from '../questions/reactQuestions';
import phpQuestions from'../questions/phpQuestions';
import {  IconButton,Button,Colors } from 'react-native-paper';

export default function option(props){
    let[questions,setQuestions]=useState([]);
    let carouselRef = useRef('');
    let[currentOption,setCurrentOption]=useState({});

    const selectOption= (optionId,item)=>{
        let currentOption = {
            optionId,
            questionId:item.id
        }  
        setCurrentOption(currentOption);
    }

    console.log(currentOption);
   

    const renderOption=({item})=>{
        console.log(item,'jghghj');
        return(
            <View style={styles.card}>
              <Text style={{fontSize:20,color:'white',marginLeft:23}}>{item.question}</Text>
                <View style={styles.option}>
                    {item.options.map(option=>{
                        return(
                        <TouchableWithoutFeedback key={option.id.toString()} style={styles.touch} onPress={()=>selectOption(option.id,item)}>
                            <Text style={{fontSize:20,color:'white',marginLeft:23}}>{(option.option)}</Text>
                        </TouchableWithoutFeedback>
                        )
                    })}
                </View>
            </View>
        )
    }

    return(
            <View style={styles.slide}>
            <Carousel 
            ref={(c)=>carouselRef=c}
            data={props.data}
            scrollEnabled={false}
            renderItem={renderOption}
            sliderWidth={responsiveWidth(100)}
            snapToPrev={animated = true, fireCallback = true}
            snapToNext={animated = true, fireCallback = true}
            itemWidth={responsiveWidth(100)}
            removeClippedSubviews={false}
            useScrollView
            onSnapToItem={i =>{
                if(i+1<questions.length){
                    setDisableNext(false)
                }else{
                    setButtonShow(false)
                }
            }}
            activeSlideOffset={40}
            />
        </View>
        
    )
}

var styles=StyleSheet.create({
    card:{
        backgroundColor:'green',
        borderRadius:5,
        alignItems:'center',
        marginTop:60,
        borderRadius:30,
        paddingTop:30,
        marginLeft:10,
        height:responsiveHeight(60),
        marginRight:10
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
})