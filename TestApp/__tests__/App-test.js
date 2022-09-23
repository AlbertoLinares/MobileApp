/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../src/App';

// Note: test renderer must be required after react-native.
import {render, waitFor} from '@testing-library/react-native';
import {ApiProvider} from '../src/context/api';

let component;

describe('<App />', () => {
  beforeEach(() => {
    global.getch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve([
            {
              Attachments: ['Test1', 'Test2'],
              Contributors: [
                {ID: 'd3fe1bc2-ce9d-44be-9ddc-300e8a1ba5bc', Name: 'Test3'},
                {ID: 'c606519f-d396-4f61-abcd-63805d43c6bf', Name: 'Test4'},
              ],
              CreatedAt: '1931-01-01T04:28:43.806669208Z',
              ID: '234eba5e-25ae-4b04-a0c5-2811cfe65716',
              Title: 'Alberto',
              UpdatedAt: '1943-03-28T18:43:25.650935533Z',
              Version: '20',
            },
          ]),
      }),
    );
    component = render(<App />, {wrapper: ApiProvider});
  });

  it('renders correctly', () => {
    expect(component).toBeDefined();
  });

  it('documents renders', () => {
    waitFor(() => expect(component.getByTestId('document-test').toBeDefined()));
  });
});
