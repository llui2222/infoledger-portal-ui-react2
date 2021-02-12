import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {sagaMiddleware} from "./redux";
import rootSaga from "./redux/sagas/root";

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);