import axios from 'axios'
// import store from '@/store'
import router from '@/router'
import cast from '@/cast'
import tool from '@/utils'
import { Message } from 'element-ui';


var httpTool = {};

/**
 * 初始化axios 实例
 */
var baseAxios = axios.create({
    timeout: 30000,
    headers: {"Content-Type": "application/json"}
});

/**
 * 添加请求前置拦截  拦截token有效性
 * 如果token剩余时间为2分钟则刷新token
 */
baseAxios.interceptors.request.use(function (config) {
    config.headers['token'] = tool.getStorage("token");

//	    console.log("请求前置拦截" + JSON.stringify(config));

    // var refreshTokenUrl = cast.apiUrl + "/token";
    // var loginInUrl = cast.apiUrl + "/login";
    // var loginOutUrl = cast.apiUrl + "/loginout";
    //
    // //请求路径是刷token  和登录  则不拦截
    // if (config.url == refreshTokenUrl || config.url == loginInUrl || config.url == loginOutUrl) {
    //     return config;
    // }

    /*var refreshTokenTime = tool.getStorage("refreshTokenTime");
    var nowTime = new Date().getTime();
    // console.log("当前时间=" + nowTime + "||token刷新时间：" + refreshTokenTime + "||时间差值=" + (nowTime - refreshTokenTime) + "||设定差值=" + cast.tokentime)
    if (refreshTokenTime && (nowTime - refreshTokenTime < cast.tokentime)) {
        return config;
    }*/
    return config;
}, function (error) {
    //当出现请求错误是做一些事
    // resError(error);
    return Promise.reject(error);
});



/**
 * 请求后置拦截
 * 处理后台返回的数据 并做统一处理
 * 对http 状态处理
 * 对统一异常处理
 */
baseAxios.interceptors.response.use(function (response) {
    var data = response.data;
    // console.log("后置拦截")
    // console.dir(data);
    // tool.setStorage("globalResponseData", data);

    //业务字典
    var state = cast.returnState();
    //服务器返回的业务码
    var code = data.code;
    if (state.SUCCESS == code || state.FAIL == code) {
        return response;
    } else if (state.REPEATOPTS == code) {
        console.log("请勿重复提交");
    } else if (state.TOKENEXPIRATION == code || state.INVALIDTOKEN == code) {
        router.push({ name: 'login', params: { isRedirect: true }});
    } else if (state.INVALIDSIGNATURE == code || state.TOKENLOSE == code || state.ILLEGAL == code) {
        // router.push({ name: '500', params: { isRedirect: true }});
    } else {
        //服务器返回的http状态码
        // var httpState = response.status;
        // console.log(httpState);
        // if(httpState === 404){
        //     router.push({ path: '/404', params: { isRedirect: true }});
        // }else if(httpState === 500){
        //     router.push({ path: '/500', params: { isRedirect: true }});
        // }
    }
    return response;
}, function (error) {
    //对返回的错误进行一些处理
    resError(error);
    return Promise.reject(error);
});

/**
 * 统一的求情服务器ajax方法
 * @param config
 * var config = {
	 * 				(必填)url: '/login'  请求地址
	 * 				params: {name：'1234567890',pwd:'12321313'}  业务请求参数
	 * 				page: page 分页对象
	 * 				sign ： false|true  是否需要签名
	 * 				reqSuccess: function 业务成功处理方法
	 * 				reqError：function 业务失败处理方法
	 * 			}
 * 专注于业务的成功或则失败处理
 * 对于其他错误 比如 未登陆  权限  系统异常等无需处理
 * @returns {boolean}
 */
httpTool.apiHttp = function (userConfig) {
		//console.log("tool.apiReq ==> userConfig 初始值 ："+ userConfig);
    var _body = userConfig.params;
    if (typeof _body != "object" && !tool.isEmpty(_body)) {
        userConfig.params = JSON.parse(_body);
    }
    var _page = userConfig.page;
    if (typeof _page != "object" && !tool.isEmpty(_page)) {
        userConfig.page = JSON.parse(_page);
    }
    var requestBody = getRequestBody(userConfig.params, userConfig.page);

    if (userConfig.method && (userConfig.method === 'POST' || userConfig.method === 'post')) {
        baseAxios.post(userConfig.url, requestBody).then(function (response) {
          resFunction(response, userConfig);
        });
    } else {
        baseAxios.get(userConfig.url, {params: userConfig.params}).then(function (response) {
          resFunction(response, userConfig);
        });
    }
}

function refreshToken(){
  var instance = axios.create({
    timeout: 30000,
    headers: {"token": tool.getStorage("refreshToken") , "Content-Type": "application/json"}
  });

  instance.get(cast.apiUrl_login + "/token?oldToken=" + tool.getStorage("token")).then(function (response) {
    var data = response.data;
    if (data.status == cast.returnState().SUCCESS && data.result.code == cast.returnState().BIZ_SUCCESS) {
      var newToken = data.result.data;
      // console.log("token = " + newToken);
      tool.setStorage("token", newToken);
      //tool.setStorage("refreshTokenTime", new Date().getTime());
    } else {
      router.push({ path: '/'});
    }
  }).catch(function (error) {
    resError(error);
    return Promise.reject(error);
  });
}

/**
 * 构建访问参数实体
 * @param token 认证标示
 * @param body 具体业务参数
 * @param page 分页对象
 * @param sign 签名
 */
function getRequestBody(body, page, sign) {
    var requestBody = new Object();
    requestBody.rnd = Math.ceil(Math.random() * 10000);
    requestBody.timestamp = new Date().getTime();
    requestBody.appId = cast.appId;


    if (!tool.isEmpty(page)) {
        requestBody.page = page;
    }

    if (!tool.isEmpty(sign)) {
        requestBody.sign = sign;
    }

    if (!tool.isEmpty(body)) {
        requestBody.body = body;
    }
    return requestBody;
}

/**
 * 同意异常处理
 * @param {Object} response
 * @param {Object} userConfig
 */
function resError(error) {
    if (error.response) {
        console.log("==================333333====================");
        // 请求已发出，但服务器响应的状态码不在 2xx 范围内
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        if(error.response.status === 500){
          // router.push({ path: '/500'});
        }else if(error.response.status === 404){
          // router.push({ path: '/404'});
        }
    } else {
        console.log("==================4444444====================");
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
    }
    console.log("==================5555555====================");
    console.dir(error);
    console.dir(error.config);

    var globalResponseData = {
        msg: error.message,
        code: "E99999"
    };
    tool.setStorage("globalResponseData", globalResponseData);

}

/**
 * 后台返回编码与前端自定义方法处理
 * @param {Object} response
 * @param {Object} userConfig
 */
function resFunction(response, userConfig) {
    var data = response.data;
    if (data.status == cast.returnState().SUCCESS) {
        userConfig.cbfn(data.result);
    } else if(data.status == cast.returnState().PERMISSIONDENIED) {
      Message({
        message: data.message,
        type: 'error',
        duration:'2000'
      });
    } else if(data.status == cast.returnState().INVALIDTOKEN) {
      Message({
        message: data.message,
        type: 'error',
        duration:'2000'
      });
      router.push({ path: '/'});
    } else if (data.status == cast.returnState().TOKENEXPIRATION) {
        refreshToken();
    }
}

//将路由配置公布
export default httpTool
