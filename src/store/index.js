import { createStore } from 'redux';
import reducers from '~/reducers';
import initialState from '~/store/initial-state';

const AppStore = createStore(
  reducers,
  initialState,
);

export default AppStore;
