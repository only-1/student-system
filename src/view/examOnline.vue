<template>
  <div>
    <div class="examContent">
      <div class="wrapper examBorder">
        <div class="examTitRecord clearfix">
          <span class="examQuestionType fl">{{recordInfo.name}}</span>
          <span class="fl examAllGrade">
              <i class="fl">总分 : </i>
              <i class="fl examAllNum">{{recordInfo.score}}分</i>
            </span>
          <span> | </span>
          <span class="allNumber fl">共{{questionList.length}}道题</span>
          <span class="examProgress fl" style="width:520px">
              <el-progress :stroke-width="10" :percentage="(questionList.length==null||questionList.length=='')
                   ?0:parseInt(answeredCount*100/questionList.length)">
                    </el-progress>
            </span>
          <span>
              <i>已完成</i>
              <i>{{answeredCount}}</i>
              <i>/{{questionList.length}}</i>
              <i>题</i>
            </span>
        </div>
        <div class="examPadding">
          <div class="examTimeAddQuestion clearfix">
            <div class="fl examOverTime">
              <div class="examCountDown clearfix">
                <p class="fl" style="padding-top: 5px">
                  <span class="examCountDownIcon in_display"></span>
                </p>
                <span class="TwoPadding fl">剩余时间</span>
                <span class="examCountDownTime fl">
                            <count-down
                              :startCountDown="startCountDown"
                              :countDownAttr="countDownAttr"
                              :remindTimeAttr="remindTime"
                              :callback="endCallback"></count-down>
                </span>
              </div>
              <div class="answerSheet">
                <p class="examAnswer" @click="answerClip=!answerClip">
                  <span class="in_display">答题卡</span>
                </p>
                <div class="answerSheetList" v-if="answerClip">
                  <p class="answerSheetListTit clearfix">
                    <span class="fl">答题卡</span>
                    <span class="fr answerClose" @click="answerClip=false"></span>
                  </p>
                  <div class="numberIndex">
                    <ul class="numberIndexList clearfix">
                      <li v-for="(answer,index) in answerCardList" @click="toIndex(index)">
                        <!-- 默认未做   给已做的span加上 readyComplate类-->
                        <span v-show="answer.answered==false">{{answer.orderNum}}</span>
                        <span class="readyComplate" v-show="answer.answered==true">{{answer.orderNum}}</span>
                      </li>
                    </ul>
                  </div>
                  <div class="numberFooter clearfix">
                    <span class="readlyOver">已做</span>
                    <span class="readlyBackOver"></span>
                    <span class="readlyOver">未做</span>
                    <span class="readlyBackNo"></span>
                    <!--<span class="readlyOverTip"> (填空题和问答题不显示答案) </span>-->
                  </div>
                </div>
              </div>
              <div class="submitSheet" @click="questionLayer=true">交卷</div>
              <div class="exitExam">
                <p @click="exitExam">
                  <span class="in_display"></span>
                  <i class="in_display">退出考试</i>
                </p>
              </div>
            </div>
            <div class="fr questionTypes" :style="'height:'+heights+'px'">
              <!-- 考試选项 -->
              <exam-choice-type v-on:setExamValue="changeAnswer" :examRecord="{question}" v-for="question in questionList"></exam-choice-type>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 交卷弹出框开始 -->
    <div class="submitPlayLayerBack" v-if="questionLayer">
      <div class="submitPlayLayer">
        <p class="submitPlayLayerTit clearfix">
          <span fl>您正在结束作答</span>
          <i class="el-icon-close fr" @click="questionLayer=false"></i>
        </p>
        <div class="submitPlayLayerTip clearfix">
           <span class="overTipIcon"></span>
           <span>您还有</span>
           <span class=" residueNum">{{questionList.length-answeredCount}}</span>
           <span>道试题未作答,是否确定交卷？</span>
        </div>
        <div class="submitPlayLayerBtn">
            <span class="in_display nextAnswer" @click="questionLayer=false">继续答题</span>
            <span class="in_display trueSubmit" @click="examCommit">确定交卷</span>
        </div>
      </div>
    </div>
    <!-- 交卷弹出框结束 -->
  </div>
</template>

<script>
  import '@css/reset.css'
  import '@css/examOnline.css'
  import httpTool from '@/httptool';
  import cast from '@/cast';
  import examChoiceType from '@components/examChoiceType.vue'
  import countDown from '@components/countDown.vue'
  export default {
    components:{examChoiceType,countDown},
    data(){
      return{
        examId: "",
        curriculumId:"",
        heights:100,//初始高度
        answerClip:false,//答题卡
        questionLayer:false,//交卷
        scroll:'',
        questionList:[],//试题列表
        recordInfo:{},//记录详情
        answerRecord:{//考生答案
          id:'',
          beginTime:'',
          endTime:'',
          answerRecordMap:[],
        },
        answerCardList:[],//答题卡信息
        answeredCount:0,//已答试题

        startCountDown: false, //开始倒计时 标志位
        countDownAttr:{},     //倒計時 总时间 属性
        remindTime:{},      //倒计时 提醒时间
        examType:0,//考试状态 用于返回考试详情
      }
    },
    methods:{
      left:function(obj){
        var w=obj.offsetLeft;
        var fuw=obj.offsetParent;
        while(fuw) {
          w+=fuw.offsetLeft;
          fuw=fuw.offsetParent;
        }
        return w;
      },
      top:function(obj){
        console.log(obj)
        var w = obj.offsetTop;
        var fuw=obj.offsetParent;
        while(fuw){
          w+=fuw.offsetTop;
          fuw=fuw.offsetParent;
        }
        return w+100;
      },
      toIndex(index){
        this.answerClip=false;
        var self=this;
//        this.$nextTick(function(){
//          var awList=$('.questionTypes').children();
//          for(var i=0;i<awList.length;i++){
//            if(index==i){
//              console.log(i)
//              $(awList[i]).offset(function(j,oldoffset){
//                  console.log(oldoffset)
//                console.log($('.questionTypes').scrollTop())
//              })
//            }
//          }
//        })

      },
      getData(examId, paperId, curriculumId){
        var url = "";
        if(examId!=null && examId!="" && examId!=undefined){
          url = cast.apiUrl_exam + "/centerExam/inExam?examId="+examId;
        }else{
          url = cast.apiUrl_exam + "/centerPaper/inPaperExam?paperId="+paperId+"&curriculumId="+curriculumId;
        }
        httpTool.apiHttp({
          url: url,
          method: "get",
          cbfn: (res) => {
            if(res.code == cast.returnState().BIZ_SUCCESS){
              this.questionList = res.data.answerRecordVoList;
              this.recordInfo=res.data;
              this.answerMap=new Map();
              for(var i=0;i<this.questionList.length;i++){
                var obj={
                  orderNum:this.questionList[i].orderNum,
                  id:this.questionList[i].id,
                  answered:false
                };
                this.answerCardList.push(obj);
              }
              this.countDownAttr.min = this.recordInfo.examTime;
              this.remindTime.min = this.recordInfo.remindTime;
              this.startCountDown = true;
            }else{
              this.$message.error(res.message);
            }
          }
        });
      },
      changeAnswer(data){
        //更新考生答案
        this.answerMap.set(data.id,data);
        console.log(this.answerMap);
        this.answeredCount=0;
        for(var i=0;i<this.answerCardList.length;i++){
          //改变答题卡题号颜色
          if(this.answerCardList[i].id==data.id){
            if(data.userAnswer==""){
              this.answerCardList[i].answered=false;
            }else{
              this.answerCardList[i].answered=true;
            }
          }
          if(this.answerCardList[i].answered){
            this.answeredCount+=1;
          }
        }
      },
      examCommit(){
        this.questionLayer=false;
        var endTime=new Date();
        var answerRecordList=[];
        this.answerMap.forEach((value,key)=>{
          answerRecordList.push(value);
        });
        this.answerRecord={
          id:this.recordInfo.id,
          beginTime:this.recordInfo.beginTime,
          endTime:endTime,
          answerRecordMap:answerRecordList,
        };
        httpTool.apiHttp({
          url: cast.apiUrl_exam + "/centerExam/commiteExam",
          method: "post",
          params:this.answerRecord,
          cbfn: (res) => {
            if(res.code == cast.returnState().BIZ_SUCCESS){
              this.$message({
                message: '提交成功',
                type: 'success'
              });
              this.back2list();
            }
          }
        });

      },
      /***  倒计时 结束 回调方法***/
      endCallback(){
        this.examCommit();
      },
      exitExam(){
        this.$confirm('确认要退出考试吗?', '提示', {
          confirmButtonText: '是',
          cancelButtonText: '否',
          type: 'warning'
        }).then(() => {
          this.back2list();
        }).catch(() => {});

      },
      back2list(){
        if(this.examId!=null && this.examId!="" && this.examId!=undefined){
          this.$router.push({path:'/examDetail/'+this.recordInfo.examId});
        }else{
          this.$router.push({path:'/curriculumDetail/'+this.curriculumId});
        }
      }
    },
    beforeRouteLeave (to, from, next) {
      next();
    },
    beforeRouteEnter(to, from, next) {
      /*console.log("========>");
      console.log(from);
      //alert("刷新");
      console.log(to);
      if(to.fullPath == from.fullPath){
        alert("刷新");
      }*/
      next();//
    },
    mounted(){
      this.heights=document.documentElement.clientHeight-180;
      var examId=this.$route.params.examId;
      this.examId = examId;
      var paperId=this.$route.params.paperId;
      var curriculumId=this.$route.params.curriculumId;
      this.curriculumId = curriculumId;
      this.getData(examId, paperId, curriculumId);
    }
  }
</script>
<style scoped>
  body{
    height: 100%;
    overflow-y:hidden;
  }
</style>
