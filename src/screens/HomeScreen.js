import React, { useState } from 'react';
import { Text,View,StyleSheet} from "react-native";
import { List} from 'react-native-paper';
import { responsiveWidth } from 'react-native-responsive-dimensions';

export default function HomeScreen({navigation}){
    let[expanded,setExpanded]=useState(false);

   function  _handlePress(){
        setExpanded(!expanded)
    }; 
   
    return(
        <View style={styles.languages}>
            <List.Section >
            <List.Accordion title="Choose your Domain"  style={styles.list}
                left={props => <List.Icon {...props}  icon="folder" />}>
                    <List.Item title="PHP" onPress={()=>navigation.navigate('Quiz',{subject:'PHP'})} />
                    <List.Item title="React Native" onPress={()=>navigation.navigate('Quiz',{subject:"React"})} />
            </List.Accordion>    
            </List.Section>
        </View>
        
    )
}

let styles=StyleSheet.create({
    languages:{
    },
    list:{
       marginTop:70,
       width:responsiveWidth(95)
    }
})