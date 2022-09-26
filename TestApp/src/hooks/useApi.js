import {ApiContext} from '../context/api';
import {useContext} from 'react';

export default function useApi() {
  const context = useContext(ApiContext);

  if (context === undefined) {
    throw new Error('useApi must be used within a ApiProvider');
  }

  return context;
}
