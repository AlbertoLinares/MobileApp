import {StyleSheet} from 'react-native';

export const colors = {
  black: '#000000',
  white: '#FFFFFF',
  lightGray: '#DCDCDC',
  darkGray: '#606060',
  gray: '#AEAEAE',
  blue: '#0074FF',
};

export const textStyles = StyleSheet.create({
  header: {
    fontSize: 27,
    fontWeight: '700',
    fontStyle: 'normal',
    lineHeight: 30,
    letterSpacing: 0.19,
    color: colors.black,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    fontStyle: 'normal',
    letterSpacing: 0.1,
    color: colors.black,
  },
  subTitle: {
    fontSize: 12,
    fontWeight: '600',
    fontStyle: 'normal',
    color: colors.black,
  },
  regularText: {
    fontSize: 12,
    fontWeight: '400',
    fontStyle: 'normal',
    color: colors.gray,
  },
  subText: {
    fontSize: 10,
    fontWeight: '400',
    fontStyle: 'normal',
    color: colors.gray,
  },
});
