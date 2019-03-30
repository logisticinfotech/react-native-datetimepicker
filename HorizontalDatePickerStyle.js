import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  yearTextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    backgroundColor: '#00bfa5',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    marginHorizontal: 5,
  },
  yearTextStyle: {
    fontSize: 15,
    color: 'black',
  },
  datePickerContainer: {
    height: 60,
    marginHorizontal: 5,
    backgroundColor: '#1de9b6',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  timePickerContainer: {
    height: 60,
    marginHorizontal: 5,
    backgroundColor: '#1de9b6',
    marginTop: 10,
    borderRadius: 5,
  },
  flatListStyle: {
    marginHorizontal: 10,
  },
  itemViewStyle: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginHorizontal: 5,
  },
  textSelected: {
    fontSize: 15,
    color: '#f44336',
  },
  textUnSelected: {
    fontSize: 15,
    color: '#4A4A4A',
  },
});

export default styles;
