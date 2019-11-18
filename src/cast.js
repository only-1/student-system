/**
 * 常量
 */
var cast = {};

//api请求地址
cast.apiUrl_login = "/api/auth";
cast.apiUrl_basicsys = "/api/basic";
cast.apiUrl_lms = "/api/lms";
cast.apiUrl_exam = "/api/exam";
cast.apiUrl_player = "/api/player";


/**
 * 学习状态（0：未学习，1：学习中，2：已完成）
 */
cast.LEARN_STATUS_0 = 0;
/**
 * 学习状态（0：未学习，1：学习中，2：已完成）
 */
cast.LEARN_STATUS_1 = 1;
/**
 * 学习状态（0：未学习，1：学习中，2：已完成）
 */
cast.LEARN_STATUS_2 = 2;
/**
 * 课件类型 url value
 * @type {number}
 */
cast.fileTypeUrlValue = "2";
/**
 * 权限向上
 */
cast.DATA_SCOPE_UP = "up";
/**
 * 权限向下
 */
cast.DATA_SCOPE_DOWN = "down";
/**
 * 权限上下兼容
 */
cast.DATA_SCOPE_ALL = "all";
/**
 * 状态：禁用
 */
cast.STATUS_DISABLE = 0;

/**
 * 状态：启用
 */
cast.STATUS_ENABLE = 1;

/**
 * 删除状态 ： 删除
 */
cast.IS_DELETE_YES = 1;

/**
 * 删除状态 ： 未删除
 */
cast.IS_DELETE_NO = 0;
/**
 * 封面图片 最大SIZE (单位：MB)
 */
cast.IMG_MAX_SIZE = 1;
/**
 * 上传文件 最大SIZE (单位：MB)
 */
cast.UPLOAD_FILE_MAX_SIZE = 500;
/**
 * 登陆有效时间
 * 24小时
 * @type {string}
 */
cast.logintime = 24 * 60 * 60 * 1000;
/**
 * token有效期
 * 5分钟
 * @type {string}
 */
cast.tokentime = 7 * 24 * 60 * 60 * 1000;
/**
 *
 * 登录页面密码输入4次锁定账户1个小时
 *
 */
cast.loginErrorTime = 60 * 60 * 1000;


/**
 * 视频播放保存学习记录轮询间隔时间 单位秒
 * @type {number}
 */
cast.playerLoopTime = 60;

/**
 * 设备类型
 * ios，android，wechat，pc
 * @type {string}
 */
cast.appId = "pc";
/**
 * 服务器返回状态
 * @returns {Object}
 */
cast.returnState = function () {
  var state = new Object();
  state.SUCCESS = "1000"; //"成功"
  state.FAIL = "1001"; //业务失败"
  state.PERMISSIONDENIED = "1002";//权限不足
  state.INVALIDTOKEN = "1003"; //无效token"
  state.TOKENEXPIRATION = "1004";//token过期
  state.TOKENLOSE = "1005"; //token丢失"
  state.INVALIDSIGNATURE = "1006"; //签名无效"
  state.PARAMETERMISSING = "1007"; //参数丢失"
  state.REPEATOPTS = "1100"; //重复提交"
  state.ERROR = "9999"; //系统错误"
  state.ILLEGAL = "1009"; //非法请求"

  state.BIZ_SUCCESS = "1";//业务成功
  return state;
}

//将路由配置公布
export default cast
