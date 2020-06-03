import React, {useState, useEffect, useRef} from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {CommonActions} from '@react-navigation/native';

import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Carousel from 'react-native-snap-carousel';
import reactQuestions from '../questions/reactQuestions';
import phpQuestions from '../questions/phpQuestions';
import {IconButton, Button, Colors} from 'react-native-paper';

export default function QuizScreen({navigation, route}) {
  let [questions, setQuestions] = useState([]);
  let carouselRef = useRef('');
  let [optionArray, setOptionArray] = useState([]);
  let [currentOption, setCurrentOption] = useState(null);
  const [index, setIndex] = useState(1);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (route.params.subject === 'React') {
      setQuestions(reactQuestions);
    } else {
      setQuestions(phpQuestions);
    }
  }, [route.params.subject]);

  function navigateAndReset(screenName) {
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [
          {
            name: screenName,
            params: {data: optionArray},
          },
        ],
      }),
    );
  }

  useEffect(() => {
    if (index === questions.length) {
      navigateAndReset('Success');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [optionArray]);

  function skipQuestion() {
    setCurrentOption(null);
    carouselRef.snapToNext();
  }

  const selectOption = (optionId, item) => {
    let selectedOption = {
      optionId,
      questionId: item.id,
    };
    setCurrentOption(selectedOption);
  };

  function submitAnswer() {
    if (currentOption) {
      setOptionArray(oldArray => [...oldArray, currentOption]);
    }
    setCurrentOption(null);
  }

  function nextQuestion() {
    submitAnswer();
    carouselRef.snapToNext();
  }

  function submitQuiz() {
    if (optionArray.length === 0) {
      Alert.alert(
        'Submit Quiz',
        'You have not answered any question. Do you still want to continue?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {text: 'OK', onPress: () => navigateAndReset('Success')},
          ,
        ],
        {cancelable: false},
      );
    }
    submitAnswer();
  }

  const renderOption = ({item}) => {
    return (
      <View style={styles.card}>
        <Text style={{fontSize: 20, color: 'white', marginLeft: 23}}>
          {item.question}
        </Text>
        <View style={styles.option}>
          {item.options.map(option => {
            const backgroundColorHighlighted =
              option.id === currentOption?.optionId ? 'orange' : 'green';

            return (
              <TouchableOpacity
                key={option.id.toString()}
                style={[
                  styles.touch,
                  {backgroundColor: backgroundColorHighlighted},
                ]}
                onPress={() => selectOption(option.id, item)}>
                <Text style={{fontSize: 20, color: 'white', marginLeft: 23}}>
                  {option.option}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {index !== questions.length && (
        <Button
          icon="check-outline"
          mode="contained"
          style={styles.skipBtn}
          onPress={skipQuestion}>
          Skip
        </Button>
      )}
      <View style={styles.slide}>
        <Carousel
          ref={c => (carouselRef = c)}
          data={questions}
          scrollEnabled={false}
          renderItem={renderOption}
          sliderWidth={responsiveWidth(100)}
          itemWidth={responsiveWidth(100)}
          removeClippedSubviews={false}
          useScrollView
          onSnapToItem={i => {
            setIndex(i + 1);
          }}
          activeSlideOffset={40}
        />
      </View>
      <View style={styles.doneBtn}>
        {index === questions.length && (
          <Button
            icon="check-outline"
            mode="contained"
            style={styles.btn}
            onPress={submitQuiz}>
            Submit
          </Button>
        )}
        {index !== questions.length && (
          <Button
            disabled={currentOption === null ? true : false}
            icon="arrow-right-bold-circle"
            mode="contained"
            style={styles.skipBtn}
            onPress={nextQuestion}>
            next
          </Button>
        )}
      </View>
      <View style={styles.creator}>
        <Text style={{color: 'green', fontSize: 14, fontStyle: 'italic'}}>
          &#xA9;Masquerade
        </Text>
      </View>
    </SafeAreaView>
  );
}
var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  skipBtn: {
    width: responsiveWidth(20),
    alignSelf: 'flex-end',
    marginRight: 10,
    marginTop: 20,
  },
  question: {
    fontSize: 20,
    color: 'black',
  },
  card: {
    backgroundColor: 'green',
    marginTop: 60,
    borderRadius: 30,
    paddingTop: 30,
    marginLeft: 10,
    height: responsiveHeight(60),
    marginRight: 10,
  },
  touch: {
    marginHorizontal: 10,
    borderRadius: 10,
    height: 40,
    justifyContent: 'center',
  },
  option: {
    height: responsiveHeight(40),
    marginTop: 35,
    justifyContent: 'space-evenly',
  },
  slide: {
    flex: 4,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  creator: {
    alignItems: 'flex-end',
    marginRight: 10,
  },
  doneBtn: {
    alignItems: 'center',
    marginBottom: 30,
  },
  iconBtn: {
    alignSelf: 'flex-end',
  },
});
