import React from "react";
import {render } from '@testing-library/react'
import regeneratorRuntime from "regenerator-runtime";
import App from './App';

describe('<App />', () => {
  test('<App /> renders successfully', () => {
    render(<App />);
  });
});