/**
 * Created by flyjennyetn on 2016-10-24.
 */
'use strict';
import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform,
  Dimensions
} from 'react-native';
import {connect} from 'react-redux'

import DrawerLayout from 'react-native-drawer-layout';

import Courses from './Courses/';
// import Subject from './Subject/';
// import UserInfo from './User/Info';
// import About from './About/About';

import {IMGADDRESS} from '../tools/config';
import {Storage} from '../tools/common';

const changeMsg = require('../../images/changeMsg.png');
const lock = require('../../images/lock.png');
const mobile = require('../../images/mobile.png');
const back = require('../../images/closeVideo.png');
const discoverFill = require('../../images/discover_fill.png');
const wifi = require('../../images/wifi.png');
const camera = require('../../images/ic_photo_camera_36pt.png');
const scan = require('../../images/scan.png');

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
        	userData:{},
  	      	selectedTab:'courses',
		    drawerItems:[
	            ['账户修改',changeMsg,1],
	            ['修改密码',lock,2],
	            ['绑定手机',mobile,3],
	            ['访问wap版',discoverFill,4],
	            ['网络状态',wifi,5],
	            ['拍照摄影',camera,6],
	            ['扫一扫',scan,7],
	            ['退出',back,0]
		    ],
		    gradeGather:[
		    	'小学一年级',
		    	'小学二年级',
		    	'小学三年级',
		    	'小学四年级',
		    	'小学五年级',
		    	'小学六年级',
		    	'初中一年级',
		    	'初中二年级',
		    	'初中三年级',
		    	'高中一年级',
		    	'高中二年级',
		    	'高中三年级'
		    ]
	    };
    }

    componentWillMount(){
    	Storage.get('userData').then(ret=>{
    		this.state.userData = ret;
    		this.props.dispatch({
                type:'user/query/pci',
                token:ret.token
            })
    	});
    }

	onPressDrawerItem(index) {
	    // const { navigator } = this.props;
	    // this.drawer.closeDrawer();
	    // switch (index) {
	    //   case 1:
	    //   	Actions.userAccount()
	    //     break;
	    //   case 2:
	    //     Actions.userPassword()
	    //     break;	      
	    //   case 3:
	    //     Actions.userMoile()
	    //     break;		      
	    //   case 4:
	    //     Actions.webViews()
	    //     break;	 	      
	    //   case 5:
	    //     Actions.otherNetInfo()
	    //     break;	      
	    //   case 6:
	    //     Actions.otherCamera()
	    //     break;	      
	    //   case 7:
	    //   	Actions.otherQrcode()
	    //     break;		      
	    //   default:
	    //   	Storage.delete('userData');
	    //     Actions.login()
	    //     break;
	    // }
	}

	userPic(){
		this.drawer.closeDrawer();
		this.setState({selectedTab:'UserInfo'})
	}

    drawerView = ()=>{
    	const {patch} = this.props.user.userInfo;
    	return(
		    <View style={[styles.container, { backgroundColor: '#fcfcfc' }]}>
		        <View style={styles.drawerTitleContent} >
		        	<TouchableOpacity 
		            	onPress={()=>this.userPic()}>
                    	<Image style={styles.userImg} source={{uri:IMGADDRESS+patch}}/>
                    </TouchableOpacity>
                    <View>
			          <Text style={styles.drawerTitle}>
			            {this.state.userData.name}
			          </Text>
			          <Text style={styles.drawerTitle}>
			            {this.state.gradeGather[this.state.userData.grade-1]}
			          </Text>
			        </View>  
		        </View>
	            {
	            	this.state.drawerItems.map((el,i)=>
			            <TouchableOpacity 
			            	key={i}
			            	style={styles.drawerContent}
			            	onPress={() => this.onPressDrawerItem(el[2])}>
				                <Image style={styles.drawerIcon} source={el[1]} />
				                <Text style={styles.drawerText}>{el[0]}</Text>
			            </TouchableOpacity>
	            	)
	            }
	        </View>
    	)

    }
    
    render() {
        return (
        	<DrawerLayout
		        ref={(drawer) => { return this.drawer = drawer  }}
		    	drawerPosition={Platform.OS === 'android' ? DrawerLayoutAndroid.positions.Left : 'left'}
		        drawerWidth={Dimensions.get('window').width / 5 * 3}
		        renderNavigationView={this.drawerView}
	        >

        		{
        			this.state.selectedTab === 'courses' &&
        			<Courses {...this.props}/>
        		}
        		{
        			this.state.selectedTab === 'subject' &&
        			<Subject {...this.props}/>
        		}
        		{
        			this.state.selectedTab === 'UserInfo' &&
        			<UserInfo {...this.props}/>
        		}
        		{
        			this.state.selectedTab === 'About' &&
        			<About {...this.props}/>
        		}
	        	<View style={styles.container}>
	        		<View style={styles.navItems}>
			        	<TouchableOpacity onPress={() => this.setState({ selectedTab: 'courses' })}>
					        <Text style={styles.textStyle}>安全</Text>
	                        <Image style={styles.userImg} 
	                        	source={this.state.selectedTab === 'courses' ? 
	                        		require("../../images/unsecurity.png") :
	                        		require("../../images/security.png")
	                        	}/>
                    	</TouchableOpacity>
			        </View>
	        		<View style={styles.navItems}>
			        	<TouchableOpacity onPress={() => this.setState({ selectedTab: 'courses' })}>
					        <Text style={styles.textStyle}>专题</Text>
	                        <Image style={styles.userImg} 
	                        	source={this.state.selectedTab === 'subject' ? 
	                        		require("../../images/unproject.png") :
	                        		require("../../images/project.png")
	                        	}/>
                    	</TouchableOpacity>
			        </View>
	        		<View style={styles.navItems}>
			        	<TouchableOpacity onPress={() => this.setState({ selectedTab: 'UserInfo' })}>
					        <Text style={styles.textStyle}>安全</Text>
	                        <Image style={styles.userImg} 
	                        	source={this.state.selectedTab === 'UserInfo' ? 
	                        		require("../../images/mine.png") :
	                        		require("../../images/mined.png")
	                        	}/>
                    	</TouchableOpacity>
			        </View>
	        		<View style={styles.navItems}>
			        	<TouchableOpacity onPress={() => this.setState({ selectedTab: 'About' })}>
					        <Text style={styles.textStyle}>安全</Text>
	                        <Image style={styles.userImg} 
	                        	source={this.state.selectedTab === 'About' ? 
	                        		require("../../images/prompts.png") :
	                        		require("../../images/prompt.png")
	                        	}/>
                    	</TouchableOpacity>
			        </View>  
	        	</View>
			</DrawerLayout>
        );
    }
}

const { height, width } = Dimensions.get('window');

const styles=StyleSheet.create({
    iconStyle:{
       width:26,
       height:26,
    },
    textStyle:{
       color:'#000',
    },
    selectedTextStyle:{
       color:'#33cc93',
    },
	userImg:{ 
	    width:70,
	    height:70,
	    borderRadius:70,
	    marginRight:8,
	},
	container: {
	    flex: 1,
	    flexDirection: 'column-reverse',
	    justifyContent: 'center',
	    backgroundColor: '#f4f4f4'
	},
	navItems:{
	  	width:width*2,
	  	alignItems: 'center',
	  	justifyContent: 'column',
	},
	drawerContent: {
	    flexDirection: 'row',
	    alignItems: 'center',
	    padding: 15,
	    borderBottomWidth: 1,
	    borderBottomColor: '#ddd'
	},
	drawerTitleContent: {
	    height: 120,
	    flexDirection:"row",
		justifyContent:"center",
	    alignItems:"center",
	    padding: 20,
	    backgroundColor: '#66cc66'
	},
	drawerIcon: {
	    width: 25,
	    height: 25,
	    resizeMode:'stretch',
	    marginLeft: 5
	},
	drawerTitle: {
	    fontSize: 20,
	    textAlign: 'left',
	    color: '#fcfcfc'
	},
	drawerText: {
	    fontSize: 18,
	    marginLeft: 15,
	    textAlign: 'center',
	    color: 'black'
	}
});


function mapStateToProps({user}) {
    return {user}
}

export default connect(mapStateToProps)(Main)

