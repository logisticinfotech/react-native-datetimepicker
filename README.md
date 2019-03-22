<p align="left">
    <a href="https://www.npmjs.com/package/@logisticinfotech/react-native-horizontal-date-picker"><img alt="npm version" src="https://img.shields.io/badge/npm-v1.0.2-green.svg"></a>
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
| pickerType | datetime | enum of `["date","time","datetime"]` | Type of the picker user want to display.  |
| minDate | current date | `Date` | Minimum date from picker value start. |
| maxDate | 3 months from current date | `Date` | Maximum date upto picker value display. |
| isShowYear | true | `bool` | Dispay year above picker. |
| yearContainerStyle | null | `style` | Style of the year container. |
| datePickerContainerStyle | null | `style` | Style of the picker. |
| yearTextStyle | null | `style` | Style of the year display. |
| selectedTextStyle | null | `style` | Style of the selected date or time. |
| unSelectedTextStyle | null | `style` | Style of the non selected date or time. |
| datePickerBG | null | `object` or `reference` | Background image of date picker. |
| timePikerBG | null |  `object` or `reference` | Background image of time picker. |
| dayFormat | Do | `string` | Format of date to display. |
| monthFormat | MMM | `string` | Format of month to display. |
| yearFormat | yyyy | `string` | Format of year to display. |
| timeFormat | HH:mm | `string` | Format of time to display. |
| timeStep | 60 | `number` | Amount of the time divide in minutes for time picker. |
| returnDateFormat | DD-MM-YYYY | `string` | Return formate of the date selected. |
| returnTimeFormat | hh:mm a | `string` | Return formate of the time selected. |
| returnDateTimeFormat | DD-MM-YYYY hh:mm a | `string` | Return formate of the full datetime selected. |
| onDateSelected | () => null | `function` | Return date when date is selected. |
| onTimeSelected | () => null | `function` | Return time when date is selected. |
| onDateTimeSelected | () => null | `function` | Return object of date, time and datetime when date or time is selected. |
