/* main.js 项目主入口注入实例 */
// import mqttTool from './lib/mqttTool.js'
// Vue.prototype.$mqttTool = mqttTool

/* 使用范例见 /pages/index/index.vue */
// mqtt协议：H5使用ws/wss APP-PLUS使用wx/wxs

var mqtt = require('mqtt/dist/mqtt.js')

let mqttTool = {
	client: null
}

mqttTool.connect = function(params){
	let options = {
		clientId: params.clientId,
		username: params.username,
		password: params.password,
		clean: params.clean,
		connectTimeout: 10000, 
		cleanSession: false,
		keepalive: 30
	}
	let client = mqtt.connect(params.url, options);
	mqttTool.client = client
	return client;
}

mqttTool.end = function(){
	return new Promise((resolve, reject) => {
		if(mqttTool.client == null){
			resolve('未连接')
			console.log('App_text' + ":end 未连接")
			return;
		}
		mqttTool.client.end()
		mqttTool.client = null
		resolve('连接终止')
	})
}

mqttTool.reconnect = function(){
	return new Promise((resolve, reject) => {
		if(mqttTool.client == null){
			resolve('未连接')
			console.log('App_text' + ":reconnect 未连接")
			return;
		}
		mqttTool.client.reconnect()
	})
}

mqttTool.subscribe = function(params){
	return new Promise((resolve, reject) => {
		if(mqttTool.client == null){
			resolve('未连接')
			console.log('App_text' + ":unconnect 未连接")
			return;
		}
		mqttTool.client.subscribe(params.topic, {qos:params.qos}, function(err,res) {
			console.log(err,res)
			if (!err && res.length>0) {
				resolve('订阅成功')
				console.log('App_text' + ":subscribe success 订阅成功")
			}else{
				resolve('订阅失败')
				console.log('App_text' + ":subscribe failed 订阅失败")
				return;
			} 
		})  
	})
}

mqttTool.unsubscribe = function(params){
	return new Promise((resolve, reject) => {
		if(mqttTool.client == null){
			resolve('未连接')
			console.log('App_text' + ":unconnect 未连接")
			return;
		}
		mqttTool.client.unsubscribe(params.topic, function(err) {
			if (!err) {
				resolve('取消订阅成功')
				console.log('App_text' + ":unsubscribe success 取消订阅成功")
			}else{
				resolve('取消订阅失败')
				console.log('App_text' + ":unsubscribe failed 取消订阅失败")
				return;
			} 
		})  
	})
}

mqttTool.publish = function(params){
	return new Promise((resolve, reject) => {
		if(mqttTool.client == null){
			resolve('未连接')
			console.log('App_text' + ":unconnect 未连接")
			return;
		}
		mqttTool.client.publish(params.topic, params.message, function(err){
			if (!err) {
				resolve(params.topic + '-' + params.message + '-发送成功')
				console.log('App_text' + ":publish success 发送成功")
			}else{
				resolve(params.topic + '-' + params.message + '-发送失败')
				console.log('App_text' + ":publish failed 发送失败")
				return;
			} 
		})
	})
}

export default mqttTool
