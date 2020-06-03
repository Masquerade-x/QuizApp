import React, {useState, useCallback, useEffect} from 'react';
import {RefreshControl, ScrollView, Text, View, StyleSheet} from 'react-native';
import {List, Colors, IconButton} from 'react-native-paper';
import {
  responsiveWidth,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import auth from '@react-native-firebase/auth';

export default function HomeScreen({navigation}) {
  let [expanded, setExpanded] = useState(false);
  let [refreshing, setRefreshing] = useState(false);

  let onRefresh = useCallback(() => {
    setRefreshing(true);
    setRefreshing(false);
  }, []);

  function _handlePress() {
    setExpanded(!expanded);
  }

  return (
    <ScrollView
      contentContainerStyle={styles.scrollView}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View style={styles.topbar}>
        <IconButton
          icon="menu"
          color={Colors.green500}
          size={25}
          onPress={() => navigation.toggleDrawer()}
        />
      </View>
      <View style={styles.welcome}>
        <Text style={{fontSize: 28, color: 'green'}}>
          Welcome to the Quiz!!!
        </Text>
        <Text style={{fontSize: 28, color: 'green'}}>Cheating ends here!</Text>
      </View>
      <View style={styles.languages}>
        <List.Section>
          <List.Accordion
            title="Choose your Domain"
            style={styles.list}
            left={props => <List.Icon color={Colors.green500} icon="buffer" />}>
            <List.Item
              title="PHP"
              onPress={() => navigation.navigate('Quiz', {subject: 'PHP'})}
            />
            <List.Item
              title="React Native"
              onPress={() => navigation.navigate('Quiz', {subject: 'React'})}
            />
          </List.Accordion>
        </List.Section>
      </View>
    </ScrollView>
  );
}

let styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  topbar: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  welcome: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  touch: {
    backgroundColor: 'green',
    width: responsiveWidth(15),
    height: responsiveHeight(4),
  },
  languages: {
    flex: 4,
  },
  list: {
    marginTop: 70,
    width: responsiveWidth(95),
  },
});
