/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import HorizontalDatePicker from '@logisticinfotech/react-native-horizontal-date-picker';
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: '',
      time: '',
      dateTime: null,
    };
  }

  onDateSelected = date => {
    this.setState({
      date: date,
    });
  };

  onTimeSelected = time => {
    this.setState({
      time: time,
    });
  };

  onDateTimeSelected = datetime => {
    this.setState({
      dateTime: JSON.stringify(datetime),
    });
  };
  render() {
    const { date, time, dateTime } = this.state;
    return (
      <View style={styles.container}>
        <HorizontalDatePicker
          onDateSelected={this.onDateSelected}
          onTimeSelected={this.onTimeSelected}
          onDateTimeSelected={this.onDateTimeSelected}
        />
        <Text style={styles.instructions}>Date:==>{date}</Text>
        <Text style={styles.instructions}>Time:==>{time}</Text>
        <Text style={styles.instructions}>DateTime:==>{dateTime}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  instructions: {
    color: '#333333',
    textAlign: 'center',
    fontSize: 15,
    marginVertical: 5,
    marginHorizontal: 10,
  },
});
