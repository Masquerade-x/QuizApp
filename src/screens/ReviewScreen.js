import React, {useEffect} from 'react';
import {SafeAreaView, Text, View, FlatList, StyleSheet} from 'react-native';
import reactQuestions from '../questions/reactQuestions.json';

export default function ReviewScreen({navigation, route}) {
  function renderData({item}) {
    return (
      <View style={{fontSize: 20, marginVertical: 20, marginHorizontal: 20}}>
        {reactQuestions.map(question => {
          if (item.questionId === question.id) {
            return <Text style={{fontSize: 20}}>{question.question}</Text>;
          }
        })}
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={route.params.data}
        style={styles.flat}
        renderItem={renderData}
        keyExtractor={i => i.questionId.toString()}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
