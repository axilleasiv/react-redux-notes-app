import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import initialState from './dummyState';

const middlewares = [thunk];

if (process.env.NODE_ENV === `development`) {
  const { createLogger } = require(`redux-logger`);
  const logger = createLogger({
    // collapsed: false,
    collapsed: function(getState, action, logEntry) {
      // console.log(logEntry);
      return false;
    }
  });

  middlewares.push(logger);
}

const store = compose(applyMiddleware(...middlewares))(createStore)(
  rootReducer,
  initialState
);

export default store;
