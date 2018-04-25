import React from 'react';
import { Provider } from 'react-redux';
import AppStore from "~/store/store";

const App = (props) => (
  <Provider store={AppStore}>
    <div>App</div>
  </Provider>
);

export default App;
