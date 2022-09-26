import React, {createContext, useContext, useEffect, useReducer} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import getDocuments from '../services/getDocuments';

export const initialState = {
  isLoading: false,
  isError: null,
  apiData: null,
};

const Context = createContext(initialState);

export const ApiContext = Context;

function reducer(state, action) {
  switch (action.type) {
    case 'INITIALIZE_BEGIN': {
      return {
        ...state,
        isLoading: true,
        isError: null,
      };
    }
    case 'INITIALIZE_ERROR': {
      return {
        ...state,
        isLoading: false,
        isError: action.payload.error,
      };
    }
    case 'INITIALIZE_SUCCESS': {
      return {
        ...state,
        isLoading: false,
        isError: null,
        apiData: action.payload.data,
      };
    }
    case 'POST': {
      return {
        ...state,
        apiData: action.payload.data,
      };
    }
  }
}

function Provider({children}) {
  const [state, dispatch] = useReducer(reducer, initialState);

  function fetchData() {
    getDocuments().then(async documents => {
      if (documents) {
        await AsyncStorage.setItem('documents', JSON.stringify(documents));
        return dispatch({
          type: 'INITIALIZE_SUCCESS',
          payload: {data: documents},
        });
      }
      return dispatch({
        type: 'INITIALIZE_ERROR',
        payload: {error: true},
      });
    });
  }

  async function initialize() {
    dispatch({
      type: 'INITIALIZE_BEGIN',
    });

    const initialApiData = await AsyncStorage.getItem('documents');

    if (initialApiData) {
      return dispatch({
        type: 'INITIALIZE_SUCCESS',
        payload: {data: JSON.parse(initialApiData)},
      });
    }

    fetchData();
  }

  async function refetchData() {
    fetchData();
  }

  async function postDocument({name, version}) {
    const newData = [
      ...state.apiData,
      {
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
      },
    ];
    await AsyncStorage.setItem('documents', JSON.stringify(newData));
    dispatch({
      type: 'POST',
      payload: {
        data: newData,
      },
    });
  }

  useEffect(() => {
    initialize();
  }, []);

  return (
    <Context.Provider value={{state, refetchData, postDocument}}>
      {children}
    </Context.Provider>
  );
}

export const ApiProvider = Provider;
