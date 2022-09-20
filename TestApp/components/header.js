import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {textStyles, colors} from '../styles';
import Icon from 'react-native-vector-icons/Fontisto';

const Header = () => {
  return (
    <View style={styles.headerContainer}>
      <Text style={textStyles.header}>Documents</Text>
      <View style={styles.iconContainer}>
        <Icon
          name={'bell'}
          size={15}
          color={colors.darkGray}
          style={styles.iconStyles}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  headerContainer: {
    padding: 20,
    backgroundColor: colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconStyles: {padding: 10},
  iconContainer: {
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 5,
  },
});

export default Header;
