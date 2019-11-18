<template>
  <span :countDownAttr="countDownAttr"
        :remindTimeAttr="remindTimeAttr"
        :startCountDown="startCountDown"
        :callback="callback"
        :endText="endText">
      {{content}}
  </span>
</template>
<script>
  export default {
    data(){
      return {
        index: 0,
        content: '',
        duration: 0,
        remindTime: null,
      }
    },
    props:{
      startCountDown:{
        type: Boolean,
        default:false,
      },
      countDownAttr: {},
      remindTimeAttr: {},
      endText:{
        type : String,
        default:'已结束'
      },
      callback : {
        type : Function,
        default :''
      }
    },
    watch: {
      startCountDown(val) {
        this.index++;
        if(val && this.index===1){
          this.duration = this.initMSTime(this.countDownAttr);
          this.remindTime = this.initMSTime(this.remindTimeAttr);
          this.countDown();
        }
      }
    },
    methods: {
      initMSTime(object){
        let returnMSTime = 0;
        if(object!=null && object!="" && object!=undefined){
          let day = object.day;
          if(day!=null && day!="" && day!=undefined){
            returnMSTime += day * 24 * 60 * 60 * 1000;
          }
          let hour = object.hour;
          if(hour!=null && hour!="" && hour!=undefined){
            returnMSTime += hour * 60 * 60 * 1000;
          }
          let min = object.min;
          if(min!=null && min!="" && min!=undefined){
            returnMSTime += min * 60 * 1000;
          }
          let sec = object.sec;
          if(sec!=null && sec!="" && sec!=undefined){
            returnMSTime += sec * 1000;
          }
        }
        return returnMSTime;
      },
      countDown(){
        let self = this;
        let timer = setInterval(function(){
          let timestamp = self.duration;
          if(self.remindTime!=null && self.remindTime!="" && self.remindTime!= undefined
                && self.remindTime > 0 && timestamp === self.remindTime){
            self.$message({message: '离考试结束还有' + Math.floor((timestamp/(1000*60))%60) + "分钟",type: 'warning'});
          }
          if(timestamp>0){
            let day = Math.floor(timestamp/(1000*60*60*24));
            let hour=Math.floor((timestamp/(1000*60*60))%24);
            let min=Math.floor((timestamp/(1000*60))%60);
            let sec=Math.floor((timestamp/1000)%60);
            hour = hour < 10 ? "0" + hour : hour;
            min = min < 10 ? "0" + min : min;
            sec = sec < 10 ? "0" + sec : sec;
            let format = '';
            if(day > 0){
              format = `${day}天${hour}小时${min}分${sec}秒`;
            }
            if(day <= 0 && hour > 0 ){
              format = `${hour}小时${min}分${sec}秒`;
            }
            if(day <= 0 && hour <= 0){
              format =`${min}分${sec}秒`;
            }
            self.content = format;
            self.duration = self.duration-1000;
          }else{
            clearInterval(timer);
            self.content = self.endText;
            self._callback();
          }
        },1000);
      },
      _callback(){
        if(this.callback && this.callback instanceof Function){
          this.callback(...this);
        }
      }
    }
  }
</script>
