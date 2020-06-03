import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Colors, IconButton} from 'react-native-paper';
import reactQuestions from '../questions/reactQuestions.json';

export default function Success({navigation, route}) {
  const [finalScore, setFinalScore] = useState(0);

  useEffect(() => {
    let score = 0;
    route.params.data.map(selected => {
      reactQuestions.map(question => {
        console.log(selected.questionId, question.id, 'inner');
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
    <View style={styles.container}>
      <View style={styles.topbar}>
        <IconButton
          icon="menu"
          color={Colors.green500}
          size={25}
          onPress={() => navigation.toggleDrawer()}
        />
      </View>
      <View style={styles.score}>
        <Text style={{fontSize: 40, color: 'green'}}>
          Your Score is {finalScore}
        </Text>
      </View>
    </View>
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
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
