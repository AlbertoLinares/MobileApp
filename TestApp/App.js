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
        onPress={() => console.log('action')}
        buttonTitle={'Submit'}
        headerTitle={'Add Document'}
        children={<CreateDocumentContent />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {padding: 15},
  flex: {flex: 1},
});

export default App;
