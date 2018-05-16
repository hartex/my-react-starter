import React from 'react';
import { Provider } from 'react-redux';
import AppStore from "~/store";

const App = (props) => (
  <Provider store={AppStore}>
    <React.StrictMode>
      <h1>React starter pack</h1>
    </React.StrictMode>
  </Provider>
);

export default App;
