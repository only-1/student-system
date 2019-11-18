import moment from 'moment' //日期库
export default {
    /**
     * 日期格式化
     * @param time
     * @param style
     * @returns {*}
     */
    formatDate(time, style){
        if (style == '' || style == undefined || style == null) {
            style = 'YYYY-MM-DD hh:mm:ss';
        }
        return moment(time).format(style);
    },

    sutTitle(title){
      var out = "";
      if(title!=null && title!="" && title!=undefined){
        if(title.length>12){
            out=title.substr(0,10);
            out=out+"..";
        }
      }
      return out;
    },

  /**
   * 状态转化
   * @param status
   * @returns {string}
   */
    statusValue(status){
      let value = '--';
      if(status == 0){
        value = "禁用";
      }else if(status == 1){
        value = "启用";
      }
      return value;
    },
  /**
   * 默认状态转化
   * @param default
   * @returns {string}
   */
  defaultValue(status){
    let value = '--';
    if(status == 0){
      value = "否";
    }else if(status == 1){
      value = "是";
    }
    return value;
  },

  /**
   * 专题 关联 类型转换
   * @param type
   */
  businessType(type){
    let value = "";
    if(type == 1){
      value = "课件";
    }else if(type == 2){
      value = "公开课";
    }else if(type == 3){
      value = "考试";
    }
    return value;
  },

  /**
   * 发布状态 类型转换
   */
  publishStatus(type){
    let value = "";
    if(type == 0){
      value = "未发布";
    }else if(type == 1){
      value = "已发布";
    }
    return value;
  },
  /**
   * 考试状态转化
   */
  examStatus(type){
    let value = "";
    if(type == 0){
      value = "未发布";
    }else if(type == 1){
      value = "未开始";
    }else if(type == 2){
      value = "进行中";
    }else if(type == 3){
      value = "已结束";
    }
    return value;
  }

}
