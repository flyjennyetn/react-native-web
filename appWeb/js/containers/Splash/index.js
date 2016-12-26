/**
 * Created by flyjennyetn on 2016-10-24.
 */
import React, { Component } from 'react';
import {
    Dimensions,
    Image,
    InteractionManager,
    View
} from 'react-native';
import {Actions} from "react-native-router-flux";
import {Storage} from '../../tools/common';

var {height, width} = Dimensions.get('window');

class Search extends Component {
	constructor(props) {
        super(props);
    }
    //插入真实DOM之后
    componentDidMount() {
        const {navigator} = this.props;
        this.timer = setTimeout(() => {
            //Interactionmanager可以将一些耗时较长的工作安排到所有互动或动画完成之后再进行。这样可以保证JavaScript动画的流畅运行。
            InteractionManager.runAfterInteractions(() => {
                Storage.get('userData').then(ret => {
                    if(ret){
                        //跳转到新的场景，并且重置整个路由栈
                        Actions.main();
                    }else{
                        Actions.login();
                    }
                })
            });
        }, 1);
    }

    // 移除真实DOM 之前
    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <Image
                    style={{flex: 1, width: width, height: height}}
                    source={require('../../../images/ic_welcome.jpg')}
                />
            </View>
        );
    }
}

export default Search