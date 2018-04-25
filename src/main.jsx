import React from 'react';
import ReactDOM from 'react-dom';
import './polyfills';
import './styles/main.scss';

import App from './components/App';

ReactDOM.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
  document.getElementById('cp-app')
);
