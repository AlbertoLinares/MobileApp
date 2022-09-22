import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import ActionSheet, {SheetManager} from 'react-native-actions-sheet';
import Icon from 'react-native-vector-icons/Fontisto';
import {colors, textStyles} from '../styles';

function CustomActionSheet({id, children, onPress, headerTitle}) {
  return (
    <ActionSheet
      id={id}
      defaultOverlayOpacity={0.6}
      containerStyle={styles.actionSheetContainer}>
      <View style={styles.headerContainer}>
        <Text style={textStyles.header}>{headerTitle}</Text>
        <TouchableOpacity onPress={async () => await SheetManager.hide(id)}>
          <Icon
            name={'close-a'}
            size={15}
            style={styles.iconStyles}
            color={colors.darkGray}
          />
        </TouchableOpacity>
      </View>
      {children}
    </ActionSheet>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  actionSheetContainer: {
    padding: 15,
    backgroundColor: colors.white,
  },
});

export default CustomActionSheet;
