import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  yearTextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  yearTextStyle: {
    fontSize: 15,
    color: 'black',
  },
  datePickerContainer: {
    height: 60,
    marginVertical: 5,
  },
  flatListStyle: {
    marginHorizontal: 10,
  },
  itemViewStyle: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
    paddingHorizontal: 5,
    marginHorizontal: 5,
  },
  textSelected: {
    fontSize: 15,
    color: 'steelblue',
  },
  textUnSelected: {
    fontSize: 15,
    color: 'gray',
  },
});

export default styles;
