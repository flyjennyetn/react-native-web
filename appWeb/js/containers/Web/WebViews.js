/**
 * Created by flyjennyetn on 2016-10-24.
 */
import React, {Component} from 'react'
import {View,StyleSheet,WebView,Dimensions} from 'react-native';
import {connect} from 'react-redux'
import Toolbar from '../../components/Toolbar'
import {naviGoBack} from '../../tools/common';

let canGoBack = false;

class WebViews extends Component {

  state = {
    url: "http://101.201.107.72/wap/",
    scalesPageToFit: true,
  }

  onNavigationStateChange(navState) {
    canGoBack = navState.canGoBack;
  }

  render() {
    return (
      <View>
        <Toolbar
            title = "青少年第一人"
        />
        <WebView
          ref={(ref) => { this.webview = ref; }}
          automaticallyAdjustContentInsets={false}
          style={WebViewsStyles.webView}
          source={{uri: this.state.url}}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          decelerationRate="normal"
          onNavigationStateChange={this.onNavigationStateChange}
          scalesPageToFit={this.state.scalesPageToFit}
        />
      </View>  
    )
  }

}


const { height, width } = Dimensions.get('window');
const WebViewsStyles = StyleSheet.create({
    webView:{
        width:width,
        height:height-70,
    }
});

export default WebViews