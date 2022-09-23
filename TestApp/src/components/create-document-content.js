import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  Platform,
} from 'react-native';
import {colors, textStyles} from '../styles';
import Icon from 'react-native-vector-icons/FontAwesome';

function CreateDocumentContent({buttonTitle, onPress}) {
  const [name, setName] = useState('');
  const [version, setVersion] = useState('');
  return (
    <View style={{}}>
      <Text style={styles.headerStyles}>Document informations</Text>
      <Text style={textStyles.subTitle}>Name</Text>
      <TextInput
        style={styles.textInputStyles}
        placeholder="Placeholder"
        value={name}
        onChangeText={newValue => setName(newValue)}
      />
      <Text style={textStyles.subTitle}>Version</Text>
      <TextInput
        style={styles.textInputStyles}
        placeholder="Placeholder"
        value={version}
        onChangeText={newValue => setVersion(newValue)}
      />
      <Text style={textStyles.subTitle}>File</Text>
      <View style={styles.fileContainer}>
        <Icon
          name={'file-text-o'}
          color={colors.blue}
          size={12}
          style={styles.iconStyles}
        />
        <Text style={{...textStyles.subTitle, color: colors.blue}}>
          Choose file
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        {Platform.OS === 'android' ? (
          <Button
            title={buttonTitle}
            onPress={() => onPress(name, version)}
            color={colors.blue}
          />
        ) : (
          <View style={styles.iosButtonContainer}>
            <Button
              title={buttonTitle}
              onPress={() => onPress(name, version)}
              color={colors.white}
            />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textInputStyles: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.lightGray,
    height: 40,
    paddingHorizontal: 15,
    marginBottom: 10,
    marginTop: 5,
  },
  buttonContainer: {
    marginBottom: Platform.OS === 'android' ? 0 : 35,
    marginTop: 20,
  },
  fileContainer: {
    flexDirection: 'row',
    marginTop: 10,
    padding: 7,
    borderColor: colors.lightGray,
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  iconStyles: {marginRight: 7},
  headerStyles: {...textStyles.title, marginBottom: 10},
  iosButtonContainer: {backgroundColor: colors.blue, borderRadius: 5},
});

export default CreateDocumentContent;
