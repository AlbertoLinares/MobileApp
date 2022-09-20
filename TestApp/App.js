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

  async function fetchData() {
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
      setError(error);
      setIsLoading(false);
    }
  }

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

      <Header />
      <View style={{...backgroundStyle, ...styles.flex}}>
        <DocumentsHeaderContent viewMode={viewMode} setViewMode={setViewMode} />
        <ScrollView
          contentContainerStyle={styles.flex}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
            />
          }>
          <DocumentsContent
            data={data}
            isLoading={isLoading}
            error={error}
            viewMode={viewMode}
          />
        </ScrollView>
        <View style={styles.buttonContainer}>
          <Button title={'+ Add document'} color={colors.blue} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {padding: 15},
  flex: {flex: 1},
});

export default App;
