import React, {useState, useEffect, useRef} from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Carousel from 'react-native-snap-carousel';
import reactQuestions from '../questions/reactQuestions';
import phpQuestions from '../questions/phpQuestions';
import {IconButton, Button, Colors} from 'react-native-paper';
import SuccessScreen from '../screens/SuccessScreen';

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
    console.log(optionArray);
  }

  function submitQuiz() {
    submitAnswer();
    console.log(optionArray);
    // navigation.navigate('Success', {data: optionArray});
  }
  console.log(optionArray, 'outer');

  const renderOption = ({item}) => {
    return (
      <View style={styles.card}>
        <Text style={{fontSize: 20, color: 'white', marginLeft: 23}}>
          {item.question}
        </Text>
        <View style={styles.option}>
          {item.options.map(option => {
            const backgroundColorHighlighted =
              option.id === currentOption?.optionId ? 'blue' : 'green';

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
      <View style={styles.dash}>
        <Text style={{fontSize: 24, color: 'green', marginRight: 20}}>
          No of questions:{index}
        </Text>
      </View>
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
          <IconButton
            icon="arrow-right-bold-circle"
            color={Colors.green500}
            style={styles.iconBtn}
            size={50}
            onPress={nextQuestion}
          />
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
    borderRadius: 30,
    height: 40,
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
  dash: {
    alignItems: 'flex-end',
    marginBottom: 20,
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
