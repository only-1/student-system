/**
 * Created by Administrator on 2017/3/28.
 */

var tool = {}

/**
 * 判断非空
 * @param val
 * @returns {Boolean}
 */
tool.isEmpty=function(val){
    // val = $.trim(val);
    if(val == null)
      return true;
    if(val == undefined || val == 'undefined')
      return true;
    if(val == "")
      return true;
    if(val.length == 0)
      return true;
    if(!/[^(^\s*)|(\s*$)]/.test(val))
      return true;
    return false;
};

//判断是否是对象
tool.isObject=function(value){
    if(value==null){
        return false;
    }
    var type=Object.prototype.toString(value).slice(8,-1);
    if(type == "Object"){
        return true;
    }else{
        return false;
    }
};

//分页对象
tool.page = function(options){
    var page = new Object();
    if(!tool.isEmpty(options)){
        page = options;
    }else{
        page.currentPage = 1;//当前页
        page.pageSize = 15;//每页条数
        page.pageTotal = 1;//总页数
        page.total = 0;//总页数
    }
    return page;
};


/**
 * 用当前事件 + 设置的缓存时长 得到 缓存数据的最后有效时间;
 * 在包装对象中加入 end 属性为缓存最后的有效时间；
 * @param key
 * @param value
 * @param exporttime 有效期
 * @param nowtime 存放时间
 */
tool.setStorage = function(key, value, exptime,nowtime){
    var item;
    if(exptime != null && exptime != '' && typeof exptime != undefined){
        if(nowtime == null || nowtime == '' && typeof nowtime == undefined){
            nowtime = new Date().getTime();
        }
        item = {
            data: value,
            end:  nowtime + exptime
        };
    }else{
        item = {
            data: value
        };
    }
    sessionStorage.setItem(key, JSON.stringify(item));
}

/**
 * 获取缓存数据时根据当前时间和缓存最后有效时间比较，如果过期则删除缓存返回null;
 * @param key
 * @returns {null}
 */
tool.getStorage = function(key){
    var item = sessionStorage.getItem(key);
    if(!item) return null;
    item = JSON.parse(item);
    if(item.end != null && item.end != '' && typeof item.end != undefined){
        if(new Date().getTime() > item.end){
            item = null;
            sessionStorage.removeItem(key);
        }else{
            item = item.data;
        }
    }else{
        item =  item.data;
    }
    return item;
}

/**
 * 清除缓存;
 * @param key
 */
tool.removeStorage = function(key){
    sessionStorage.removeItem(key);
}

//将路由配置公布
export default tool
