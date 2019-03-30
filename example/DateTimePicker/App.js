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
      dateTime: datetime.datetime,
    });
  };
  render() {
    const { date, time, dateTime } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <HorizontalDatePicker
          onDateSelected={this.onDateSelected}
          onTimeSelected={this.onTimeSelected}
          onDateTimeSelected={this.onDateTimeSelected}
        />
        <View style={styles.gapStyle} />

        <View style={styles.displayContainer}>
          <Text style={styles.title}>Date:</Text>
          <Text style={styles.instructions}>{date}</Text>
        </View>
        <View style={styles.displayContainer}>
          <Text style={styles.title}>Time:</Text>
          <Text style={styles.instructions}>{time}</Text>
        </View>
        <View style={styles.displayContainer}>
          <Text style={styles.title}>DateTime:</Text>
          <Text style={styles.instructions}>{dateTime}</Text>
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
    flexDirection: 'row',
    marginVertical: 10,
    marginHorizontal: 15,
  },
  title: {
    width: '25%',
    color: 'red',
    textAlign: 'left',
    fontSize: 15,
    fontWeight: 'bold',
  },
  instructions: {
    width: '75%',
    color: 'steelblue',
    textAlign: 'left',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
