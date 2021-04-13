import React from "react";
import {render } from '@testing-library/react'
import regeneratorRuntime from "regenerator-runtime";
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';

describe('<App />', () => {
  test('<App /> renders successfully', () => {
    render(<Router><App /></Router>);
  });
});