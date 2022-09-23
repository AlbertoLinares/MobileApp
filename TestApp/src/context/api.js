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

    console.log(apiResponse);

    dispatch({
      type: 'INITIALIZE_SUCCESS',
      payload: {data: await apiResponse.json()},
    });
  }

  async function refetchData() {
    initialize();
  }

  function postDocument({name, version}) {
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

function Hook() {
  const context = useContext(Context);

  if (context === undefined) {
    throw new Error('useApi must be used within a ApiProvider');
  }

  return context;
}

export const useApi = Hook;
