import React, {useEffect, useState} from 'react';
import {Text, SafeAreaView, View, StyleSheet} from 'react-native';
import {Colors, IconButton} from 'react-native-paper';
import reactQuestions from '../questions/reactQuestions.json';

export default function Success({navigation, route}) {
  const [finalScore, setFinalScore] = useState(0);

  useEffect(() => {
    let score = 0;
    route.params?.data.map(selected => {
      reactQuestions.map(question => {
        if (selected.questionId === question.id) {
          if (selected.optionId === question.correctAnswer.id) {
            score++;
          }
        }
      });
    });
    setFinalScore(score);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topbar}>
        <IconButton
          icon="menu"
          color={Colors.green500}
          size={25}
          onPress={() => navigation.toggleDrawer()}
        />
      </View>
      <View style={styles.score}>
        {route.params?.data.length === 0 ? (
          <Text style={{fontSize: 20, color: 'green'}}>
            You have not answered any question thus we are not able to calculate
            the score.
          </Text>
        ) : (
          <View
            style={{
              alignItems: 'flex-start',
              justifyContent: 'center',
            }}>
            <Text style={{fontSize: 30, color: 'green', marginVertical: 20}}>
              Total no of questions : {reactQuestions.length}
            </Text>
            <Text style={{fontSize: 30, color: 'green', marginVertical: 20}}>
              Your Score is :{finalScore}
            </Text>
            <Text style={{fontSize: 30, color: 'green', marginVertical: 20}}>
              No. of wrong answers : {reactQuestions.length - finalScore}
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topbar: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  score: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
});
