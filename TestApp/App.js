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
} from 'react-native';

import DocumentsContent from './components/documents-content';
import Header from './components/header';
import {colors} from './styles';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import DocumentsHeaderContent from './components/documents-header-content';
import CustomActionSheet from './components/custom-action-sheet';
import {SheetManager} from 'react-native-actions-sheet';
import CreateDocumentContent from './components/create-document-content';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
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

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:8080/documents', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
        },
      });
      setData(await response.json());
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setError(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNotification();
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    fetchData();
    setIsRefreshing(false);
  }, []);

  const handleCreateDocument = async ({name, version}) => {
    data.push({
      Attachments: ['Test1', 'Test2'],
      Contributors: [
        {ID: 'd3fe1bc2-ce9d-44be-9ddc-300e8a1ba5bc', Name: 'Test3'},
        {ID: 'c606519f-d396-4f61-abcd-63805d43c6bf', Name: 'Test4'},
      ],
      CreatedAt: '1931-01-01T04:28:43.806669208Z',
      ID: '234eba5e-25ae-4b04-a0c5-2811cfe65716',
      Title: name,
      UpdatedAt: '1943-03-28T18:43:25.650935533Z',
      Version: version,
    });
    setData(data);
    await SheetManager.hide('new_document_sheet');
  };

  return (
    <SafeAreaView style={styles.flex}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={colors.white}
      />

      <Header notificationNumber={notifications.length} />

      <DocumentsHeaderContent viewMode={viewMode} setViewMode={setViewMode} />
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
        }>
        <DocumentsContent
          data={data}
          isLoading={isLoading}
          error={error}
          viewMode={viewMode}
        />
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button
          title={'+ Add document'}
          color={colors.blue}
          onPress={async () => await SheetManager.show('new_document_sheet')}
        />
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
  buttonContainer: {padding: 15},
  flex: {flex: 1},
});

export default App;
