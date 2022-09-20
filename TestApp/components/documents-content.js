import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  useColorScheme,
  ActivityIndicator,
} from 'react-native';
import {textStyles, colors} from '../styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import DocumentsHeaderContent from './documents-header-content';

const DocumentsContent = ({data, isLoading, error}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const [viewMode, setViewMode] = useState('list');

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  if (isLoading) {
    return (
      <View style={styles.isLoadingContainer}>
        <ActivityIndicator color={colors.gray} />
      </View>
    );
  }
  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={textStyles.title}>
          Server Error data is not available.
        </Text>
      </View>
    );
  }

  if (data?.length) {
    return (
      <ScrollView style={{...backgroundStyle}}>
        <DocumentsHeaderContent viewMode={viewMode} setViewMode={setViewMode} />
        {data.map(document => {
          const {Attachments, Contributors, ID, Title, Version} = document;
          return (
            <View key={ID} style={styles.outerContainer}>
              <View style={styles.innerContainer}>
                <Text style={styles.headerContainer}>
                  <Text style={textStyles.title}>{Title} </Text>
                  <Text style={textStyles.subText}>{`Version ${Version}`}</Text>
                </Text>
                <View style={{flexDirection: 'row'}}>
                  <View style={{flex: 1}}>
                    <View style={styles.columnContainer}>
                      <Icon
                        name={'account-group-outline'}
                        size={12}
                        style={styles.iconStyles}
                      />
                      <Text style={textStyles.subTitle}>Contributors</Text>
                    </View>
                    {Contributors.map((contributor, index) => (
                      <Text style={textStyles.regularText}>
                        {contributor.Name}
                      </Text>
                    ))}
                  </View>
                  <View style={{flex: 1}}>
                    <View style={styles.columnContainer}>
                      <Icon
                        name={'attachment'}
                        size={12}
                        style={styles.iconStyles}
                      />
                      <Text style={textStyles.subTitle}>Attachments</Text>
                    </View>
                    {Attachments.map((attachment, index) => (
                      <Text style={textStyles.regularText}>{attachment}</Text>
                    ))}
                  </View>
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>
    );
  }
  return (
    <View style={styles.noDataContainer}>
      <Text style={textStyles.title}>Documents are empty.</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  isLoadingContainer: {
    height: '100%',
    justifyContent: 'center',
  },
  noDataContainer: {alignItems: 'center', marginTop: 20},
  errorContainer: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconStyles: {marginRight: 5},
  outerContainer: {
    elevation: 2,
    borderRadius: 5,
    marginVertical: 10,
    backgroundColor: colors.white,
    marginHorizontal: 20,
  },
  innerContainer: {padding: 15},
  headerContainer: {marginBottom: 10},
  columnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
    marginBottom: 5,
  },
});

export default DocumentsContent;
