/**
 * Created by flyjennyetn on 2016-10-24.
 */

import { AsyncStorage, Platform} from 'react-native';
// import {Actions} from "react-native-router-flux";
import {browserHistory} from 'react-router';

export const History =(name,params)=>{
  if(Platform.OS === 'web'){
    browserHistory.push({
      pathname:`/${name}`,
      params:{
        params
      }
    });
  }else{
    // Actions[name]({params:params})
  }
}

// // 是否有打开页
// export const naviGoBack = () => {
//     Actions.pop;
//     return true;
// };

// 缓存 封装
export class Storage {
  static get(key) {
    return AsyncStorage.getItem(key).then((value) => {
      const jsonValue = JSON.parse(value);
      return jsonValue;
    });
  }

  static save(key, value) {
    return AsyncStorage.setItem(key, JSON.stringify(value));
  }

  static update(key, value) {
    return DeviceStorage.get(key).then((item) => {
      value = typeof value === 'string' ? value : Object.assign({}, item, value);
      return AsyncStorage.setItem(key, JSON.stringify(value));
    });
  }

  static delete(key) {
    return AsyncStorage.removeItem(key);
  }
}


// 轻提示 几秒消失 
// isAlert 为true 需要用户确认
export const toastShort = (content, isAlert) => {
  if (isAlert) {
      alert(content)
  } else {
    alert(content)
  }
};

export function isNotNullObj(obj) {
	for (var i in obj) {
		if (obj.hasOwnProperty(i)) {
			return true;
		}
	}
	return false;
}

//渲染视频的
export function polyvObjects() {
	//polyvplayer_v2.0.min
	var width = "100%";
	var height = "5rem";
	var banSeekByLimitTime = 'off';
	var autoplay = '1';
	if (arguments.length > 1) {
		width = arguments[1];
		height = arguments[2];
		banSeekByLimitTime = 'on';
		autoplay = '0';
	}
	var player = polyvObject('#plv_' + arguments[0]).videoPlayer({
		'width': width,
		'height': height,
		'vid': arguments[0],
		'flashvars': {
			"ban_seek_by_limit_time": banSeekByLimitTime,
			"autoplay": autoplay
		}
	});
}

