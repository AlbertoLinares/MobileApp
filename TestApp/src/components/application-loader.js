import React, {useEffect, useState, useCallback} from 'react';
import {
  Button,
  SafeAreaView,
  StatusBar,
  useColorScheme,
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Platform,
} from 'react-native';
import {useApi} from '../context/api';
import DocumentsContent from './documents-content';
import Header from './header';
import {colors} from '../styles';
import DocumentsHeaderContent from './documents-header-content';
import CustomActionSheet from './custom-action-sheet';
import {SheetManager} from 'react-native-actions-sheet';
import CreateDocumentContent from './create-document-content';

const ApplicationLoader = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const {
    state: {isError, apiData, isLoading},
    refetchData,
    postDocument,
  } = useApi();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [viewMode, setViewMode] = useState('list');
  const ws = new WebSocket('ws://localhost:8080/notifications');
  const [notifications, setNotifications] = useState([]);

  const fetchNotification = () => {
    const serverNotifications = [];
    ws.onopen = () => {
      console.log('Connected to the server');
    };
    ws.onclose = e => {
      console.log('Disconnected. Check internet or server.');
    };
    ws.onerror = e => {
      console.log(e.message);
    };
    ws.onmessage = e => {
      serverNotifications.push(e.data);
      setNotifications([...serverNotifications]);
    };
  };

  useEffect(() => {
    fetchNotification();
  }, []);

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    refetchData();
    setIsRefreshing(false);
  }, []);

  const handleCreateDocument = async ({name, version}) => {
    postDocument({name, version});
    await SheetManager.hide('new_document_sheet');
  };

  return (
    <SafeAreaView style={{...styles.flex, backgroundColor: colors.background}}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={colors.white}
      />

      <Header notificationNumber={notifications.length} />

      <DocumentsHeaderContent viewMode={viewMode} setViewMode={setViewMode} />
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
        }>
        <DocumentsContent
          data={apiData}
          isLoading={isLoading}
          error={isError}
          viewMode={viewMode}
        />
      </ScrollView>
      <View style={styles.buttonContainer}>
        {Platform.OS === 'android' ? (
          <Button
            title={'+ Add document'}
            color={colors.blue}
            onPress={async () => await SheetManager.show('new_document_sheet')}
          />
        ) : (
          <View style={styles.iosButtonContainer}>
            <Button
              title={'+ Add document'}
              color={colors.white}
              onPress={async () =>
                await SheetManager.show('new_document_sheet')
              }
            />
          </View>
        )}
      </View>
      <CustomActionSheet
        id={'new_document_sheet'}
        headerTitle={'Add Document'}
        children={
          <CreateDocumentContent
            buttonTitle={'Submit'}
            onPress={(name, version) => handleCreateDocument({name, version})}
          />
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    padding: 15,
    borderTopWidth: 0.5,
    borderTopColor: colors.lightGray,
  },
  flex: {flex: 1},
  iosButtonContainer: {backgroundColor: colors.blue, borderRadius: 5},
});

export default ApplicationLoader;
