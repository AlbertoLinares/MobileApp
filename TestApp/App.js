/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';

import {
  Button,
  SafeAreaView,
  StatusBar,
  useColorScheme,
  View,
  StyleSheet,
} from 'react-native';

import DocumentsContent from './components/documents-content';
import Header from './components/header';
import {colors} from './styles';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
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
        //console.log('AQUI', await response.json());
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={colors.white}
      />
      <View style={{flex: 1}}>
        <Header />

        <DocumentsContent data={data} isLoading={isLoading} error={error} />
        <View style={styles.buttonContainer}>
          <Button title={'+ Add document'} color={colors.blue} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {padding: 15},
});

export default App;
