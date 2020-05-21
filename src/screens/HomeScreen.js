import React, { useState,useCallback,useEffect } from 'react';
import { RefreshControl,ScrollView,Text,View,StyleSheet} from "react-native";
import { List} from 'react-native-paper';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import auth from '@react-native-firebase/auth';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function HomeScreen({navigation}){
    let[expanded,setExpanded]=useState(false);
    let[refreshing,setRefreshing]=useState(false);
    let{currentuser}=auth();

    let onRefresh= useCallback(()=>{
        setRefreshing(true);
        setEmail(''); 
        setPassword('');
        setErrorMessage('');
        setRefreshing(false);
      },[refreshing]);

   function  _handlePress(){
        setExpanded(!expanded)
    }; 

    async function signOut(){
        auth().signOut()
        .then(() => navigation.navigate('Login'));
    }

   
   
    return(
        <ScrollView contentContainerStyle={styles.scrollView} 
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >            
            <View style={styles.heading}>
                <Text style={{fontSize:28,color:'white'}}>Choose Your Domain</Text>
                <TouchableOpacity onPress={signOut} >
                    <Text>signOut</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.languages}>
            <List.Section >
            <List.Accordion title="Choose your Domain"  style={styles.list}
                left={props => <List.Icon {...props}  icon="folder" />}>
                    <List.Item title="PHP" onPress={()=>navigation.navigate('Quiz',{subject:'PHP'})} />
                    <List.Item title="React Native" onPress={()=>navigation.navigate('Quiz',{subject:"React"})} />
            </List.Accordion>    
            </List.Section>
        </View>
    </ScrollView>
       
        
    )
}

let styles=StyleSheet.create({
    scrollView:{
        flex:1,
        
    },
    heading:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    languages:{
        flex:4,
    },
    list:{
       marginTop:70,
       width:responsiveWidth(95)
    }
})