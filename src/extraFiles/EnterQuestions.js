import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, TextInput} from 'react-native';
import {Formik} from 'formik';
import {Button} from 'react-native-paper';
import {responsiveWidth} from 'react-native-responsive-dimensions';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import Navigation from '../navigation/AppNavigator';
import {TouchableOpacity, ScrollView} from 'react-native-gesture-handler';

export default function FormScreen({navigation}) {
  let [userUid, setUserUid] = useState('');
  let [questions, setQuestions] = useState([]);

  function questionDataAdd(values) {
    setQuestions(old => [...old, values]);
  }

  async function uploadQuestions() {
    try {
      await database()
        .ref('/data/')
        .update({
          questions,
        });
    } catch (error) {
      console.log(error);
    }
  }

  console.log(questions);

  useEffect(() => {
    let unsubscribe = auth().onAuthStateChanged(async user => {
      if (user) {
        setUserUid(user.uid);
        database()
          .ref(`/users/${user.uid}`)
          .set({
            uid: user.uid,
            email: user.email,
          });
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <ScrollView style={styles.scroll}>
      <Formik
        initialValues={{
          question: '',
          options: [
            {id: 1, optionA: ''},
            {id: 2, optionB: ''},
            {id: 3, optionC: ''},
            {id: 4, optionD: ''},
          ],
          answer: '',
        }}
        onSubmit={values => questionDataAdd(values)}>
        {({handleChange, handleSubmit, values}) => (
          <>
            <View style={styles.topbar}>
              <Button
                icon="check-outline"
                mode="contained"
                style={styles.btn}
                onPress={handleSubmit}
              />
            </View>
            <View style={styles.formik}>
              <TextInput
                label="Question"
                style={styles.textInput}
                placeholder="Enter Question"
                onChangeText={handleChange('question')}
                value={values.question}
              />
              <TextInput
                label="optionA"
                style={styles.textInput}
                placeholder="Enter option"
                onChangeText={handleChange('options.optionA')}
                value={values.optionA}
              />
              <TextInput
                label="optionB"
                style={styles.textInput}
                placeholder="Enter option"
                onChangeText={handleChange('options.optionB')}
                value={values.optionB}
              />
              <TextInput
                label="optionC"
                style={styles.textInput}
                placeholder="Enter option"
                onChangeText={handleChange('options.optionC')}
                value={values.optionC}
              />
              <TextInput
                label="optionD"
                style={styles.textInput}
                placeholder="Enter option"
                onChangeText={handleChange('options.optionD')}
                value={values.optionD}
              />
              <TextInput
                label="answer"
                style={styles.textInput}
                placeholder="Enter answer"
                onChangeText={handleChange('answer')}
                value={values.answer}
              />

              <Button
                icon="upload"
                mode="contained"
                style={styles.btn2}
                onPress={uploadQuestions}>
                Upload
              </Button>
            </View>
          </>
        )}
      </Formik>
    </ScrollView>
  );
}

let styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  formik: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  topbar: {
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  textInput: {
    width: responsiveWidth(80),
    marginTop: 40,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  btn: {
    marginRight: 10,
    marginTop: 10,
  },
  btn2: {
    marginRight: 10,
    marginTop: 28,
  },
});
