/**
 * Created by flyjennyetn on 2016-10-24.
 */
import React, { Component } from 'react';
import {
    View,
    Text,
    AppState,
    Platform,
    StatusBar,
    StyleSheet
} from 'react-native';

import {Scene,Reducer,Router,Switch,Modal,Actions,ActionConst} from 'react-native-router-flux';
import JPushModule from 'jpush-react-native';
import { registerApp } from 'react-native-wechat';

import Splash from './containers/Splash/';
import Main from './containers/Main';
import Login from './containers/Login';
import Quizzes from './containers/Courses/Quizzes'

import User from './containers/User/';
import UserAccount from './containers/User/Account';
import UserMoile from './containers/User/Moile';
import UserPassword from './containers/User/Password';
import WebViews from './containers/Web/WebViews';
import Activity from './containers/Activity/';
//其他例子
// 网络
import OtherNetInfo from './containers/Other/NetInfo';
// 拍照摄影
import OtherCamera from './containers/Other/Camera';
// 扫一扫
import OtherQrcode from './containers/Other/Qrcode';
// 后台唤醒之后手势密码
import GesturePassword from './containers/Other/GesturePassword';

const reducerCreate = params => {
  const defaultReducer = new Reducer(params);
  return (state, action) => {
    // console.log('ACTION:', action);
    return defaultReducer(state, action);
  };
};

const getSceneStyle = (props, computedProps) => {
  const style = {
    flex: 1,
    backgroundColor: '#fff',
    shadowColor: null,
    shadowOffset: null,
    shadowOpacity: null,
    shadowRadius: null,
  };
  if (computedProps.isActive) {
    style.marginTop = computedProps.hideNavBar ? 0 : 64;
    style.marginBottom = computedProps.hideTabBar ? 0 : 50;
  }
  return style;
};


class Root extends Component {
  render() {
    const {
      children
    } = this.props;
    return children
  }
}


class App extends Component {

  constructor(props) {
      super(props);
      registerApp('wx89cc0b1c5c672ecb');
      this.state = {
         currentAppState: AppState.currentState
      };
  }

  componentDidMount() {
      AppState.addEventListener('change', this._handleAppStateChange);

      JPushModule.addReceiveNotificationListener((message) => {
        //这是默认的通知消息   
          console.log("默认=",message);  
      })

      JPushModule.addReceiveCustomMsgListener((message) => {
          //这是自定义的通知消息    
          console.log("自定义=",message);
      });

      //点击通知进入应用的主页，相当于跳转到制定的页面  
      JPushModule.addReceiveOpenNotificationListener((message) => {  
        console.log(message);
        const data = eval('(' + message.extras + ')');  
        Actions.activity({params:{activityNum:data.id}})
      }) 

  }
  componentWillUnmount() {
      AppState.removeEventListener('change', this._handleAppStateChange);
      JPushModule.removeReceiveCustomMsgListener();
      JPushModule.removeReceiveNotificationListener();
  }

  _handleAppStateChange=(currentAppState)=>{
      this.setState({currentAppState:currentAppState});
      if(currentAppState == 'active'){
          Actions.gesturePassword();
      }
  }

  render() {
      return (
        <View style={{flex: 1}}>
          <StatusBar
              barStyle='light-content'
              backgroundColor='#66cc66'
              translucent={true}
          />
          <Router createReducer={reducerCreate} getSceneStyle={getSceneStyle}>
              <Scene key="modal" component={Modal} >
                <Scene key="root" hideNavBar={false} hideNavBar hideTabBar>
                  <Scene key="splash" component={Splash} initial title="Splash"  />
                  <Scene key="login" component={Login} title="Login" type="replace" />
                  <Scene key="main" component={Main}  hideNavBar={true} type="replace" />
                  <Scene key="quizzes" component={Quizzes}  />
                  <Scene key="userAccount" component={UserAccount}  />
                  <Scene key="userMoile" component={UserMoile}  />
                  <Scene key="userPassword" component={UserPassword}  />
                  <Scene key="webViews" component={WebViews}  />
                  <Scene key="activity" component={Activity}  />
                  <Scene key="userAccount" component={UserAccount}  />
                  <Scene key="otherNetInfo" component={OtherNetInfo}  />
                  <Scene key="otherCamera" component={OtherCamera}  />
                  <Scene key="otherQrcode" component={OtherQrcode}  />
                  <Scene key="gesturePassword" component={GesturePassword}  />
                </Scene>
              </Scene>
          </Router>
        </View>
      );
  }
}

export default App;