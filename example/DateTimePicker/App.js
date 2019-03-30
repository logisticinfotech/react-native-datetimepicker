/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, View, Text, SafeAreaView } from 'react-native';

import HorizontalDatePicker from '@logisticinfotech/react-native-horizontal-date-picker';
import moment from 'moment';
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date1: '',
      time1: '',
      dateTime1: '',
      date2: '',
      time2: '',
      dateTime2: '',
      date3: '',
      time3: '',
      dateTime3: '',
    };
  }

  onDateSelected = date => {
    this.setState({
      date1: date,
      date2: moment(date, 'DD-MM-YYYY').format('DD MMM YYYY'),
      date3: moment(date, 'DD-MM-YYYY').format('Do MMMM YYYY'),
    });
  };

  onTimeSelected = time => {
    this.setState({
      time1: time,
      time2: moment(time, 'hh:mm a').format('HH:mm'),
      time3: moment(time, 'hh:mm a').format('HH:mm a'),
    });
  };

  onDateTimeSelected = datetime => {
    this.setState({
      dateTime1: datetime.datetime,
      dateTime2: moment(datetime.datetime, 'DD-MM-YYYY hh:mm a').format('DD MMM YYYY HH:mm'),
      dateTime3: moment(datetime.datetime, 'DD-MM-YYYY hh:mm a').format('Do MMMM YYYY [@] hh:mm a'),
    });
  };
  render() {
    const { date1, date2, date3, time1, time2, time3, dateTime1, dateTime2, dateTime3 } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <HorizontalDatePicker
          onDateSelected={this.onDateSelected}
          onTimeSelected={this.onTimeSelected}
          onDateTimeSelected={this.onDateTimeSelected}
        />
        <View style={styles.gapStyle} />

        <View style={styles.displayContainer}>
          <Text style={[styles.instructions, styles.textColor1]}>{date1}</Text>
          <Text style={[styles.instructions, styles.textColor1]}>{time1}</Text>
          <Text style={[styles.instructions, styles.textColor1]}>{dateTime1}</Text>
        </View>
        <View style={styles.displayContainer}>
          <Text style={[styles.instructions, styles.textColor2]}>{date2}</Text>
          <Text style={[styles.instructions, styles.textColor2]}>{time2}</Text>
          <Text style={[styles.instructions, styles.textColor2]}>{dateTime3}</Text>
        </View>
        <View style={styles.displayContainer}>
          <Text style={[styles.instructions, styles.textColor3]}>{date3}</Text>
          <Text style={[styles.instructions, styles.textColor3]}>{time3}</Text>
          <Text style={[styles.instructions, styles.textColor3]}>{dateTime3}</Text>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingVertical: 20,
  },
  gapStyle: {
    height: 50,
  },
  displayContainer: {
    marginVertical: 10,
    marginHorizontal: 15,
  },
  instructions: {
    width: '75%',
    textAlign: 'left',
    fontSize: 15,
    marginVertical: 2,
    fontWeight: 'bold',
  },
  textColor1: {
    color: '#0d47a1',
  },
  textColor2: {
    color: '#004d40',
  },
  textColor3: {
    color: '#d84315',
  },
});
