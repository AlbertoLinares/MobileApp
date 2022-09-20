import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {textStyles, colors} from '../styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const DocumentsHeaderContent = ({setViewMode, viewMode}) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.sortByContainer}>
        <Icon name={'sort'} size={15} style={styles.iconSortStyles} />
        <Text style={styles.textStyles}>Sort by</Text>
        <Icon name={'angle-down'} size={15} style={styles.iconArrowStyles} />
      </View>
      <View style={styles.viewSelectorContainer}>
        <TouchableOpacity
          style={{
            ...styles.listIconContainer,
            backgroundColor: viewMode === 'list' ? colors.white : 'transparent',
          }}
          onPress={() => setViewMode('list')}>
          <Icon
            name={'list-ul'}
            size={15}
            color={viewMode === 'list' ? colors.blue : colors.darkGray}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            ...styles.gridIconContainer,
            backgroundColor: viewMode === 'grid' ? colors.white : 'transparent',
          }}
          onPress={() => setViewMode('grid')}>
          <MaterialIcon
            name={'grid-large'}
            size={15}
            color={viewMode === 'grid' ? colors.blue : colors.darkGray}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  headerContainer: {
    marginVertical: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textStyles: {
    ...textStyles.title,
    flex: 1,
  },
  sortByContainer: {
    flexDirection: 'row',
    borderColor: colors.lightGray,
    borderWidth: 1,
    width: 110,
    borderRadius: 5,
    backgroundColor: colors.white,
    alignItems: 'center',
  },
  iconSortStyles: {
    paddingVertical: 10,
    paddingHorizontal: 7,
    color: colors.darkGray,
  },
  iconArrowStyles: {
    color: colors.darkGray,
    borderLeftWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderLeftColor: colors.lightGray,
  },
  viewSelectorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: colors.lightGray,
    borderWidth: 1,
    borderRadius: 5,
  },
  listIconContainer: {
    borderTopStartRadius: 5,
    borderBottomStartRadius: 5,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  gridIconContainer: {
    borderTopEndRadius: 5,
    borderBottomEndRadius: 5,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});

export default DocumentsHeaderContent;
