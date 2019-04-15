// Type definitions for react-native-modal-dropdown 0.6
// Project: https://github.com/sohobloo/react-native-modal-dropdown
// Definitions by: Carlos Li <https://github.com/echoulen>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.8

import * as React from 'react';

import HorizontalDatePicker = RNHorizontalDatePicker.HorizontalDatePicker;
export = HorizontalDatePicker;

declare namespace RNHorizontalDatePicker {
  interface HorizontalDatePickerProps {
    pickerType?: 'date' | 'time' | 'datetime';
    minDate?: Date;
    maxDate?: Date;
    defaultSelected?: Date;
    isShowYear?: boolean;
    yearContainerStyle?: any;
    yearTextStyle?: any;
    selectedTextStyle?: any;
    unSelectedTextStyle?: any;
    datePickerContainerStyle?: any;
    timePickerContainerStyle?: any;
    datePickerBG?: any;
    timePikerBG?: any;
    dayFormat?: string;
    monthFormat?: string;
    yearFormat?: string;
    timeFormat?: string;
    timeStep?: number;
    returnDateFormat?: string;
    returnTimeFormat?: string;
    returnDateTimeFormat?: string;
    onDateSelected?: (selectedDate: string) => void;
    onTimeSelected?: (selectedTime: string) => void;
    onDateTimeSelected?: (selectedDateTime: object) => void;
  }

  class HorizontalDatePicker extends React.Component<HorizontalDatePickerProps> {
    static default: typeof HorizontalDatePicker;
  }
}
