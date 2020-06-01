import React, { useState, useEffect ,useRef} from 'react'
import { Text,View,StyleSheet,RefreshControl,ScrollView, SafeAreaView} from "react-native";

import {
    responsiveHeight,
    responsiveWidth,
      } from "react-native-responsive-dimensions";
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';


export default function OptionComponent(props){
    let[currentOption,setCurrentOption]=useState({});

    console.log(currentOption);
    
    const selectOption= (optionId,item)=>{
        let currentOption = {
            optionId,
            questionId:item.id
        }  
        setCurrentOption(currentOption);
    }

    return(
        <TouchableWithoutFeedback key={props.option.id.toString()} style={styles.touch} onPress={()=>selectOption(props.option.id,props.item)}>
            <Text style={{fontSize:20,color:'white',marginLeft:23}}>{(props.option.option)}</Text>
        </TouchableWithoutFeedback>
        
    )
}

var styles=StyleSheet.create({
    touch:{
        width:responsiveWidth(60),
      },
})