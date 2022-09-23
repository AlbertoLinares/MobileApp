import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {textStyles, colors} from '../styles';
import Icon from 'react-native-vector-icons/Fontisto';

const Header = ({notificationNumber}) => {
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
        {notificationNumber > 0 ? (
          <View style={styles.notificationTextContainer}>
            <Text style={styles.notificationTextStyles}>
              {notificationNumber > 99 ? '99+' : notificationNumber}
            </Text>
          </View>
        ) : null}
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
  notificationTextContainer: {
    position: 'absolute',
    backgroundColor: colors.blue,
    width: 14,
    height: 14,
    right: 5,
    top: 5,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationTextStyles: {
    alignItems: 'center',
    justifyContent: 'center',
    color: colors.white,
    fontSize: 8,
  },
});

export default Header;
