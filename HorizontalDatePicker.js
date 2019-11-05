import React, { Component } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment';

import styles from './HorizontalDatePickerStyle';

const defaultFormatDate = 'DD-MM-YYYY';
const defaultFormatTime = 'HH:mm:ss';

export default class HorizontalDatePicker extends Component {
  constructor(props) {
    super(props);
    this.viewabilityConfig = {
      waitForInteraction: true,
      itemVisiblePercentThreshold: 50,
    };
    this.state = {
      yearSelected: '',
      arrayDates: [],
      arrayTimes: [],
    };
  }

  componentDidMount = () => {
    const {
      pickerType,
      returnDateFormat,
      returnTimeFormat,
      returnDateTimeFormat,
      minDate,
      maxDate,
      defaultSelected,
      dayFormat,
      monthFormat,
      yearFormat,
      timeFormat,
      onDateSelected,
      onTimeSelected,
      onDateTimeSelected,
    } = this.props;
    let dateArray = [];
    let timeArray = [];

    if (minDate && maxDate) {
      if (pickerType === 'date' || pickerType == 'datetime') dateArray = this.getDateList(minDate, maxDate);
      if (pickerType === 'time' || pickerType == 'datetime') {
        let sameDay = false;
        if (moment(minDate).format(defaultFormatDate) === moment(maxDate).format(defaultFormatDate)) sameDay = true;
        timeArray = this.getTimeList(minDate, sameDay ? maxDate : moment(minDate).set({ hours: 24, minutes: 0 }));
      }
    } else if (minDate) {
      if (pickerType === 'date' || pickerType == 'datetime') {
        dateArray = this.getDateList(minDate, moment(minDate).add(3, 'months'));
      }
      if (pickerType === 'time' || pickerType == 'datetime') {
        timeArray = this.getTimeList(minDate, moment(minDate).set({ hours: 24, minutes: 0 }));
      }
    } else if (maxDate) {
      if (pickerType === 'date' || pickerType == 'datetime') {
        dateArray = this.getDateList(moment(maxDate).subtract(3, 'months'), maxDate);
      }
      if (pickerType === 'time' || pickerType == 'datetime') {
        timeArray = this.getTimeList(moment().startOf('day'), moment().set({ hours: 24, minutes: 0 }));
      }
    } else {
      if (pickerType === 'date' || pickerType == 'datetime') {
        dateArray = this.getDateList(moment(), moment().add(3, 'months'));
      }
      timeArray = this.getTimeList(moment(), moment().set({ hours: 24, minutes: 0 }));
    }

    const newDateArray = dateArray.map(item => ({
      date: item,
      day: moment(item, defaultFormatDate).format(dayFormat),
      month: moment(item, defaultFormatDate).format(monthFormat),
      year: moment(item, defaultFormatDate).format(yearFormat),
      isSelected: false,
    }));
    let isCurrentFoundDate = false;
    if (defaultSelected) {
      const selectedDate = moment(defaultSelected).format(defaultFormatDate);
      newDateArray.map(item => {
        if (item.date === selectedDate) {
          item.isSelected = true;
          isCurrentFoundDate = true;
        }
      });
      if (!isCurrentFoundDate) newDateArray[0].isSelected = true;
    } else if (newDateArray.length > 0) newDateArray[0].isSelected = true;
    const newTimeArray = timeArray.map(item => ({
      time: item,
      timeDisplay: moment(item, defaultFormatTime).format(timeFormat),
      isSelected: false,
    }));
    let isCurrentFoundTime = false;
    if (defaultSelected) {
      const selectedDate = moment(defaultSelected).format(defaultFormatTime);
      newTimeArray.map(item => {
        if (item.time === selectedDate) {
          item.isSelected = true;
          isCurrentFoundTime = true;
        }
      });
      if (!isCurrentFoundTime) newDateArray[0].isSelected = true;
    } else if (timeArray.length > 0) newTimeArray[0].isSelected = true;
    if ((pickerType === 'date' || pickerType == 'datetime') && onDateSelected) {
      if (defaultSelected && isCurrentFoundDate) {
        onDateSelected(moment(defaultSelected).format(returnDateFormat));
      } else {
        onDateSelected(moment(newDateArray[0].date, defaultFormatDate).format(returnDateFormat));
      }
    }
    if ((pickerType === 'time' || pickerType == 'datetime') && onTimeSelected) {
      if (defaultSelected && isCurrentFoundTime) {
        onDateSelected(moment(defaultSelected).format(returnTimeFormat));
      } else {
        onTimeSelected(moment(newTimeArray[0].time, defaultFormatTime).format(returnTimeFormat));
      }
    }
    if (onDateTimeSelected) {
      onDateTimeSelected({
        date:
          pickerType === 'date' || pickerType == 'datetime'
            ? defaultSelected && isCurrentFoundDate
              ? moment(defaultSelected).format(returnDateFormat)
              : moment(newDateArray[0].date, defaultFormatDate).format(returnDateFormat)
            : '',
        time:
          pickerType === 'time' || pickerType == 'datetime'
            ? defaultSelected && isCurrentFoundTime
              ? moment(defaultSelected).format(returnTimeFormat)
              : moment(newTimeArray[0].time, defaultFormatTime).format(returnTimeFormat)
            : '',
        datetime:
          pickerType == 'datetime'
            ? defaultSelected && isCurrentFoundDate && isCurrentFoundTime
              ? moment(defaultSelected).format(returnDateTimeFormat)
              : moment(newDateArray[0].date + newTimeArray[0].time, defaultFormatDate + defaultFormatTime).format(
                  returnDateTimeFormat
                )
            : '',
      });
    }
    this.setState({
      arrayDates: newDateArray,
      arrayTimes: newTimeArray,
      yearSelected: newDateArray.length > 0 && newDateArray[0].year,
    });
  };

  getDateList = (minDate, maxDate) => {
    const dateArray = [];
    let currentDate = moment(minDate);
    const stopDate = moment(maxDate);
    while (currentDate <= stopDate) {
      dateArray.push(moment(currentDate).format(defaultFormatDate));
      currentDate = moment(currentDate).add(1, 'days');
    }
    return dateArray;
  };

  getTimeList = (minDate, maxDate) => {
    const { timeStep } = this.props;
    const timeArray = [];
    const tmpCurrentDate = moment(minDate);
    let currentDate =
      tmpCurrentDate.minute() || tmpCurrentDate.second() || tmpCurrentDate.millisecond()
        ? tmpCurrentDate.add(1, 'hour').startOf('hour')
        : tmpCurrentDate.startOf('hour');
    const stopDate = moment(maxDate);
    while (currentDate <= stopDate) {
      if (timeArray.indexOf(moment(currentDate).format(defaultFormatTime)) === -1) {
        timeArray.push(moment(currentDate).format(defaultFormatTime));
      }
      currentDate = moment(currentDate).add(timeStep, 'minutes');
    }
    return timeArray;
  };

  changeTimeArrayOnDateChange = date => {
    const {
      pickerType,
      returnDateFormat,
      returnTimeFormat,
      returnDateTimeFormat,
      minDate,
      maxDate,
      timeFormat,
      onTimeSelected,
      onDateTimeSelected,
    } = this.props;
    const { arrayDates } = this.state;
    let timeArray = [];
    if (minDate && maxDate) {
      let sameDay = false;
      if (moment(minDate).format(defaultFormatDate) === moment(maxDate).format(defaultFormatDate)) sameDay = true;
      timeArray = this.getTimeList(minDate, sameDay ? maxDate : moment(minDate).set({ hours: 24, minutes: 0 }));
    } else if (minDate && moment(date, defaultFormatDate) === moment(minDate)) {
      timeArray = this.getTimeList(minDate, moment(minDate).set({ hours: 24, minutes: 0 }));
    } else if (maxDate && moment(date, defaultFormatDate) === moment(maxDate)) {
      timeArray = this.getTimeList(moment(maxDate).set({ hours: 0, minutes: 0 }), maxDate);
    } else if (date === arrayDates[0].date && date === moment().format(defaultFormatDate)) {
      timeArray = this.getTimeList(moment(), moment().set({ hours: 24, minutes: 0 }));
    } else {
      timeArray = this.getTimeList(moment().startOf('day'), moment().set({ hours: 24, minutes: 0 }));
    }
    const newTimeArray = timeArray.map(item => ({
      time: item,
      timeDisplay: moment(item, defaultFormatTime).format(timeFormat),
      isSelected: false,
    }));
    if (timeArray.length > 0) newTimeArray[0].isSelected = true;
    if (onTimeSelected) onTimeSelected(moment(newTimeArray[0].time, defaultFormatTime).format(returnTimeFormat));
    if (onDateTimeSelected) {
      onDateTimeSelected({
        date:
          pickerType === 'date' || pickerType == 'datetime'
            ? moment(date, defaultFormatDate).format(returnDateFormat)
            : '',
        time:
          pickerType === 'time' || pickerType == 'datetime'
            ? moment(newTimeArray[0].time, defaultFormatTime).format(returnTimeFormat)
            : '',
        datetime:
          pickerType == 'datetime'
            ? moment(date + newTimeArray[0].time, defaultFormatDate + defaultFormatTime).format(returnDateTimeFormat)
            : '',
      });
      this.setState({
        arrayTimes: newTimeArray,
      });
    }
  };

  onVisibleItemChange = ({ viewableItems }) => {
    const { yearSelected } = this.state;
    const { yearFormat } = this.props;
    if (yearSelected) {
      if (moment(yearSelected, yearFormat) !== moment(viewableItems[0].item.year, yearFormat)) {
        this.setState({
          yearSelected: moment(viewableItems[0].item.year, yearFormat).format(yearFormat),
        });
      }
    } else {
      this.setState({
        yearSelected: moment(viewableItems[0].item.year, yearFormat).format(yearFormat),
      });
    }
  };

  // onPressMethod
  onPressDate = item => () => {
    const { arrayDates } = this.state;
    const { pickerType, returnDateFormat } = this.props;
    const { onDateSelected, onDateTimeSelected } = this.props;
    arrayDates.map(element => {
      if (element.date === item.date) {
        element.isSelected = true;
      } else element.isSelected = false;
    });
    this.setState({
      arrayDates,
    });
    if (onDateSelected) onDateSelected(moment(item.date, defaultFormatDate).format(returnDateFormat));
    if (pickerType == 'datetime') {
      this.changeTimeArrayOnDateChange(item.date);
    } else if (onDateTimeSelected) {
      onDateTimeSelected({
        date: moment(item.date, defaultFormatDate).format(returnDateFormat),
        time: '',
        datetime: '',
      });
    }
  };

  onPressTime = item => () => {
    const { arrayTimes, arrayDates } = this.state;
    const { pickerType, returnDateFormat, returnTimeFormat, returnDateTimeFormat } = this.props;
    const { onTimeSelected, onDateTimeSelected } = this.props;
    arrayTimes.map(element => {
      if (element.time === item.time) {
        element.isSelected = true;
      } else element.isSelected = false;
    });
    this.setState({
      arrayTimes,
    });
    if (onTimeSelected) onTimeSelected(moment(item.time, defaultFormatTime).format(returnTimeFormat));
    const dateSelected = arrayDates.filter(item => item.isSelected);
    if (onDateTimeSelected) {
      onDateTimeSelected({
        date:
          pickerType === 'date' || pickerType == 'datetime'
            ? moment(dateSelected[0].date, defaultFormatDate).format(returnDateFormat)
            : '',
        time:
          pickerType === 'time' || pickerType == 'datetime'
            ? moment(item.time, defaultFormatTime).format(returnTimeFormat)
            : '',
        datetime:
          pickerType == 'datetime'
            ? moment(dateSelected[0].date + item.time, defaultFormatDate + defaultFormatTime).format(
                returnDateTimeFormat
              )
            : '',
      });
    }
  };

  // render Method
  keyExtractorDate = item => item.date.toString();

  renderDateItem = ({ item }) => {
    const { selectedTextStyle, unSelectedTextStyle } = this.props;

    return (
      <TouchableOpacity style={styles.itemViewStyle} onPress={this.onPressDate(item)}>
        <Text
          style={
            item.isSelected ? [styles.textSelected, selectedTextStyle] : [styles.textUnSelected, unSelectedTextStyle]
          }
        >
          {item.day}
        </Text>
        <Text
          style={
            item.isSelected ? [styles.textSelected, selectedTextStyle] : [styles.textUnSelected, unSelectedTextStyle]
          }
        >
          {item.month}
        </Text>
      </TouchableOpacity>
    );
  };

  setTimeFlatListRef = element => {
    this.timeFlatList = element;
  };

  keyExtractorTime = item => item.time.toString();

  renderTimeItem = ({ item }) => {
    const { selectedTextStyle, unSelectedTextStyle } = this.props;

    return (
      <TouchableOpacity style={styles.itemViewStyle} onPress={this.onPressTime(item)}>
        <Text
          style={
            item.isSelected ? [styles.textSelected, selectedTextStyle] : [styles.textUnSelected, unSelectedTextStyle]
          }
        >
          {item.timeDisplay}
        </Text>
      </TouchableOpacity>
    );
  };

  render() {
    const {
      pickerType,
      isShowYear,
      yearContainerStyle,
      yearTextStyle,
      datePickerContainerStyle,
      timePickerContainerStyle,
      datePickerBG,
    } = this.props;
    const { yearSelected, arrayDates, arrayTimes } = this.state;
    return (
      <View>
        {(pickerType === 'date' || pickerType === 'datetime') && isShowYear && (
          <View style={[styles.yearTextContainer, yearContainerStyle]}>
            <Text style={[styles.yearTextStyle, yearTextStyle]}>{yearSelected}</Text>
          </View>
        )}
        {(pickerType === 'date' || pickerType === 'datetime') && (
          <ImageBackground style={[styles.datePickerContainer, datePickerContainerStyle]} source={datePickerBG || null}>
            <FlatList
              horizontal
              style={styles.flatListStyle}
              data={arrayDates}
              renderItem={this.renderDateItem}
              extraData={this.state}
              onViewableItemsChanged={this.onVisibleItemChange}
              viewabilityConfig={this.viewabilityConfig}
              showsHorizontalScrollIndicator={false}
              keyExtractor={this.keyExtractorDate}
            />
          </ImageBackground>
        )}
        {(pickerType === 'time' || pickerType === 'datetime') && (
          <ImageBackground style={[styles.timePickerContainer, timePickerContainerStyle]} source={datePickerBG || null}>
            <FlatList
              ref={this.setTimeFlatListRef}
              horizontal
              style={styles.flatListStyle}
              data={arrayTimes}
              renderItem={this.renderTimeItem}
              extraData={this.state}
              showsHorizontalScrollIndicator={false}
              keyExtractor={this.keyExtractorTime}
            />
          </ImageBackground>
        )}
      </View>
    );
  }
}

HorizontalDatePicker.propTypes = {
  pickerType: PropTypes.oneOf(['date', 'time', 'datetime']),
  minDate: PropTypes.instanceOf(Date),
  maxDate: PropTypes.instanceOf(Date),
  defaultSelected: PropTypes.objectOf(Date),
  isShowYear: PropTypes.bool,
  yearContainerStyle: PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array]),
  yearTextStyle: PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array]),
  selectedTextStyle: PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array]),
  unSelectedTextStyle: PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array]),
  datePickerContainerStyle: PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array]),
  timePickerContainerStyle: PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array]),
  datePickerBG: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
  timePikerBG: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
  dayFormat: PropTypes.string,
  monthFormat: PropTypes.string,
  yearFormat: PropTypes.string,
  timeFormat: PropTypes.string,
  timeStep: PropTypes.number,
  returnDateFormat: PropTypes.string,
  returnTimeFormat: PropTypes.string,
  returnDateTimeFormat: PropTypes.string,
  onDateSelected: PropTypes.func,
  onTimeSelected: PropTypes.func,
  onDateTimeSelected: PropTypes.func,
};
HorizontalDatePicker.defaultProps = {
  pickerType: 'datetime',
  minDate: null,
  maxDate: null,
  defaultSelected: null,
  isShowYear: true,
  yearContainerStyle: null,
  yearTextStyle: null,
  datePickerContainerStyle: null,
  timePickerContainerStyle: null,
  selectedTextStyle: null,
  unSelectedTextStyle: null,
  datePickerBG: null,
  timePikerBG: null,
  dayFormat: 'Do',
  monthFormat: 'MMM',
  yearFormat: 'YYYY',
  timeFormat: 'HH:mm',
  timeStep: 60,
  returnDateFormat: 'DD-MM-YYYY',
  returnTimeFormat: 'hh:mm a',
  returnDateTimeFormat: 'DD-MM-YYYY hh:mm a',
  onDateSelected: () => {},
  onTimeSelected: () => {},
  onDateTimeSelected: () => {},
};
