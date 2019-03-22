<p align="left">
    <a href="https://www.npmjs.com/package/@logisticinfotech/react-native-horizontal-date-picker"><img alt="npm version" src="https://img.shields.io/badge/npm-v1.0.1-green.svg"></a>
    <a href="https://www.npmjs.com/package/@logisticinfotech/react-native-horizontal-date-picker"><img src="https://img.shields.io/badge/downloads-%3E1K-yellow.svg"></a>
    <a href="https://www.npmjs.com/package/@logisticinfotech/react-native-horizontal-date-picker"<><img src="https://img.shields.io/badge/license-MIT-orange.svg"></a>
</p>

### React Native horizontal date picker

## Npm repo
https://www.npmjs.com/package/@logisticinfotech/react-native-horizontal-date-picker

## Git repo
https://github.com/logisticinfotech/react-native-datetimepicker

# Guide

# Prerequisite
you need to install below librabry before use.
```
npm i moment

```

# Installation
```
npm i @logisticinfotech/react-native-horizontal-date-picker
```
# Usage
```
import HorizontalDatePicker from "@logisticinfotech/react-native-horizontal-date-picker";

...

<HorizontalDatePicker pickerType="date" />

```

![](RNHorizontalDatePicker.gif)

### Properties

#### Basic

| Prop | Default | Type | Description |
| ------ | -------- | ----- | ------------- |
| pickerType | datetime | enum of `["date","time","datetime"]` | type of the picker user want to display <br />  |
| minDate | current date | `Date` | minimum date from picker value start |
| maxDate | 3 months from current date | `Date` | maximum date upto picker value display |
| isShowYear | true | `bool` | dispay year above picker |
| yearContainerStyle | null | `style` | style of the year container |
| datePickerContainerStyle | null | `style` | style of the picker |
| yearTextStyle | null | `style` | style of the year display |
| selectedTextStyle | null | `style` | style of the selected date or time |
| unSelectedTextStyle | null | `style` | style of the non selected date or time |
| datePickerBG | null | `object` or `reference` | background image of date picker |
| timePikerBG | null |  `object` or `reference` | background image of time picker |
| dayFormat | Do | `string` | formate of date to display |
| monthFormat | MMM | `string` | formate of month to display |
| yearFormat | yyyy | `string` | formate of year to display |
| timeFormat | HH:mm | `string` | formate of time to display |
| timeStep | 60 | `number` | amount of the time divide in minutes for time picker |
| returnDateFormat | DD-MM-YYYY | `string` | return formate of the date selected |
| returnTimeFormat | hh:mm a | `string` | return formate of the time selected |
| returnDateTimeFormat | DD-MM-YYYY hh:mm a | `string` | return formate of the full datetime selected |
| onDateSelected | () => null | `function` | return date when date is selected |
| onTimeSelected | () => null | `function` | return time when date is selected |
| onDateTimeSelected | () => null | `function` | return object of date,time and datetime when date or time is selected |
