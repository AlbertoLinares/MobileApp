import React, {createContext, useContext, useEffect, useReducer} from 'react';

export const initialState = {
  isLoading: false,
  isError: null,
  apiData: null,
};

const Context = createContext(initialState);

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
  }
}

function Provider({children}) {
  const [state, dispatch] = useReducer(reducer, initialState);

  async function initialize() {
    dispatch({
      type: 'INITIALIZE_BEGIN',
    });

    let apiResponse;

    try {
      apiResponse = await fetch('http://localhost:8080/documents', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
        },
      });
    } catch (error) {
      return dispatch({
        type: 'INITIALIZE_ERROR',
        payload: {error},
      });
    }

    dispatch({
      type: 'INITIALIZE_SUCCESS',
      payload: {data: await apiResponse.json()},
    });
  }

  async function refetchData() {
    initialize();
  }

  useEffect(() => {
    initialize();
  }, []);

  return (
    <Context.Provider value={{state, refetchData}}>{children}</Context.Provider>
  );
}

export const ApiProvider = Provider;

function Hook() {
  const context = useContext(Context);

  if (context === undefined) {
    throw new Error('useApi must be used within a ApiProvider');
  }

  return context;
}

export const useApi = Hook;
