/**
 * Created by flyjennyetn on 2016-10-24.
 */
import { AppRegistry } from 'react-native';
import { Qsndyr } from './appWeb/';

AppRegistry.registerComponent('App', () => Qsndyr);
AppRegistry.runApplication('App', {
  rootTag: document.getElementById('app')
});
