import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Alert,
  Share,
  TouchableOpacity,
} from 'react-native';
import {textStyles, colors} from '../styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontistoIcon from 'react-native-vector-icons/Fontisto';

const onShare = async () => {
  try {
    const result = await Share.share({
      message: 'Sharing a document',
    });
    if (result.action === Share.sharedAction) {
      console.log('User is sharing');
    } else if (result.action === Share.dismissedAction) {
      console.log('User is dismissing share');
    }
  } catch (error) {
    Alert.alert('ERROR', 'Now it is not possible to share, try later', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);
  }
};

const DocumentsContent = ({data, isLoading, error, viewMode}) => {
  if (isLoading) {
    return (
      <View style={styles.isLoadingContainer}>
        <ActivityIndicator color={colors.blue} />
      </View>
    );
  }

  if (data?.length) {
    return (
      <View
        testID={'document-test'}
        style={viewMode === 'grid' ? {...styles.gridContainer} : {}}>
        {data.map((document, index) => {
          const {Attachments, Contributors, ID, Title, Version} = document;
          if (viewMode === 'grid') {
            return (
              <View style={styles.gridItemContainer}>
                <Text style={{...textStyles.title, marginBottom: 3}}>
                  {Title}
                </Text>
                <Text style={textStyles.subText}>{`Version ${Version}`}</Text>
              </View>
            );
          }

          return (
            <View key={ID} style={styles.outerContainer}>
              <View style={styles.innerContainer}>
                <View style={styles.headerOuterContainer}>
                  <Text style={styles.headerContainer}>
                    <Text style={textStyles.title}>{Title} </Text>
                    <Text
                      style={textStyles.subText}>{`Version ${Version}`}</Text>
                  </Text>
                  <TouchableOpacity onPress={onShare}>
                    <FontistoIcon
                      name={'share'}
                      size={12}
                      color={colors.gray}
                    />
                  </TouchableOpacity>
                </View>

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
                    {Contributors.map(contributor => (
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
                    {Attachments.map(attachment => (
                      <Text style={textStyles.regularText}>{attachment}</Text>
                    ))}
                  </View>
                </View>
              </View>
            </View>
          );
        })}
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

  return (
    <View style={styles.noDataContainer}>
      <Text style={textStyles.title}>Documents are empty.</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  isLoadingContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  headerOuterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  gridContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  gridItemContainer: {
    width: '47.5%',
    padding: 15,
    elevation: 2,
    borderRadius: 5,
    marginBottom: 15,
    backgroundColor: colors.white,
  },
  noDataContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconStyles: {marginRight: 5},
  outerContainer: {
    elevation: 2,
    borderRadius: 5,
    marginVertical: 5,
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
