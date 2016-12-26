/**
 * Created by flyjennyetn on 2016-10-24.
 */
import React , { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform
} from 'react-native';
import {createStore,applyMiddleware,compose} from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware, {END} from 'redux-saga';

import ReducersManager from './js/reducers/';
import SagaManager from './js/sagas/';
import App from 'js/app';

const sagaMiddleware = createSagaMiddleware();
const initialState = window.__INITIAL_STATE__;

const store = createStore(
    ReducersManager,
    initialState,
    compose(applyMiddleware(sagaMiddleware))
);

store.runSaga = sagaMiddleware.run;
store.close = () => store.dispatch(END);
store.runSaga(SagaManager);

if(Platform.OS != 'web'){
  const isDebuggingInBrowser = __DEV__ && !!window.navigator.userAgent;
  if (isDebuggingInBrowser) {
      window.store = store;
  }
}

export class Qsndyr extends Component {
    render() {
        return (
            <Provider store = {store} >
                <App />
            </Provider>
        )
    }
}

// import React, { Component } from 'react';
// import {
//   StyleSheet,
//   Text,
//   View
// } from 'react-native';


// export class Qsndyr extends Component {

//   render() {
//     return (
//       <View style={styles.container}>
//           <Text style={styles.welcome}>
//             Welcome to React Native for Web Starter!
//           </Text>
//           <Text style={styles.instructions}>
//             To get started, edit index.web.js
//           </Text>
//           <Text style={styles.instructions}>
//             Press Cmd+R to reload,{'\n'}
//             Alt+Cmd+I for dev menu
//           </Text>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF'
//   },
//   logo: {
//     alignSelf: 'center',
//     marginBottom: 10
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5
//   },
//   touchable: {
//     backgroundColor: '#CAE6FE'
//   }
// });
