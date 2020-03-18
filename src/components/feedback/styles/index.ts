import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

import { colors } from '../../../application/styles';

interface Styles {
  closeButton: TextStyle;
  footerContainer: ViewStyle;
  footerTab: ViewStyle;
  headerElement: TextStyle;
  headerContainer: ViewStyle;
  input: TextStyle;
  inputLabel: ViewStyle;
  submitButton: ViewStyle;
  submitButtonDisabled: ViewStyle;
  submitText: TextStyle;
  submitTextDisabled: TextStyle;
}

const styles = StyleSheet.create<Styles>({
  closeButton: {
    color: colors.greyishBrown,
    fontSize: 16,
  },

  headerContainer: {
    alignItems: 'flex-start',
    backgroundColor: 'yellow',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  headerElement: {
    color: colors.teal,
    fontSize: 18,
  },

  input: {
    borderColor: colors.darkerGrey,
    borderWidth: 0.5,
    borderRadius: 8,
    fontSize: 16,
    padding: 5,
  },

  inputLabel: {
    color: colors.black,
    fontSize: 16,
    paddingLeft: 5,
    paddingBottom: 10,
  },

  footerContainer: {
    alignItems: 'center',
    backgroundColor: colors.white,
    borderTopWidth: 0.5,
    borderTopColor: colors.darkerGrey,
    justifyContent: 'center',
  },

  footerTab: {
    backgroundColor: colors.white,
  },

  submitButton: {
    marginLeft: 30,
    marginRight: 30,
  },

  submitButtonDisabled: {
    backgroundColor: colors.fadedGrey,
  },

  submitText: {
    fontSize: 16,
    color: colors.white,
  },

  submitTextDisabled: {
    fontSize: 16,
    color: colors.white,
  },
});

export default styles;
