import React from 'react';
import {Text, View,StyleSheet} from 'react-native';
import { Colors,IconButton} from 'react-native-paper';

export default function Success({navigation,route}){
    return(
        <View style={styles.container}>
            <View style={styles.topbar}>    
                    <IconButton  icon="menu" color={Colors.green500} size={25} onPress={() => navigation.toggleDrawer()} />
            </View>
            <View style={styles.score}>
                <Text style={{fontSize:40,color:'green'}}>Your Score is {route.params.score}</Text>
            </View>
        </View>
    )
}

var styles = StyleSheet.create({
    container:{
        flex:1
    },
    topbar:{
        justifyContent:'flex-start',
        alignItems:'flex-start',
    },
    score:{
        flex:2,
        justifyContent:'center',
        alignItems:'center'
    }
})