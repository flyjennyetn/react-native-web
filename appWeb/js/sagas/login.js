/**
 * Created by flyjennyetn on 2016-10-26.
 */
import {
	takeLatest
} from 'redux-saga';
import {
	take,
	put,
	call,
	fork,
	select
} from 'redux-saga/effects';
import {xFetch} from '../tools/xFetch';
import {Storage,naviGoBack,toastShort,History} from '../tools/common';

function* loginQuery({
	userData,navigator
}) {
	try {
		const items = yield call(xFetch, {
			requestUrl: 'loginInterface/login.json',
			...userData
		});
		console.log(items);
		yield call(Storage.save,'userData',eval('(' + items + ')'));
		History('main',{});
	} catch (error) {
	    yield toastShort(error);
	}
}

function* loginQueryAppid({code,navigator}){
	try {
		console.log(1)
		const data = yield call(xFetch, {
			requestUrl: 'wx/getOpenId.json',
			code
		});
		console.log(data)
		let obj = eval('(' + data + ')');
		console.log(obj);
		const items = yield call(xFetch, {
			requestUrl: 'checkOpenId/login',
			openId: obj.openid
		});
		console.log(items);
		// yield call(Storage.save,'userData',eval('(' + items + ')'));
  //       navigator.resetTo({
  //           component: Main,
  //           name: 'Main'
  //       });
	} catch (error) {
	    yield toastShort(error);
	}
}


function* watchLogin() {
	yield takeLatest('login/query', loginQuery);
}

function* watchLoginWeixin() {
	yield takeLatest('login/query/appid', loginQueryAppid);
}

export default function*() {
	yield fork(watchLogin)
	yield fork(watchLoginWeixin)
}