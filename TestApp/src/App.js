import React from 'react';
import {ApiProvider} from './context/api';
import ApplicationLoader from './components/application-loader';

const App = () => {
  return (
    <ApiProvider>
      <ApplicationLoader />
    </ApiProvider>
  );
};

export default App;
