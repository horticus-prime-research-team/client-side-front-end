import React from 'react';
import ReactDOM from 'react-dom';
import { LoginContext } from '../components/login/loginContext';

describe("`<LoginProvider />` component", () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<LoginContext.Provider />, div);
  });

});