import React from 'react';
import ReactDOM from 'react-dom';

require('core-js/fn/array/find');
require('core-js/fn/array/from');
import './styles/main.scss';

import App from './App';

ReactDOM.render(
  <App/>,
  document.getElementById('app')
);
