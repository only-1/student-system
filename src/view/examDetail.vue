<template>
  <div>
    <!-- 头部开始 -->
    <header-common></header-common>
    <!-- 头部结束 -->

    <!-- 面包屑开始 -->
    <div class="pageNav">
      <div class="wrapper clearfix">
        <ul class="pageNavList fl">
          <li class="pageNavOption fl">
            <span class="fl" @click="back2list('')">首页</span>
            <i class="fl"></i>
          </li>
          <li class="pageNavOption fl" v-for="category in categoryList">
            <span class="fl" @click="back2list(category.code)">{{category.name}}</span>
            <i class="fl"></i>
          </li>
        </ul>
        <div class="enterExam fr"  v-show="studyExamStatus==0||studyExamStatus==2">
          <p class="enterExamBtn clearfix">
            <i class="fl"><img src="../assets/images/exams_click.png" alt=""></i>
            <span class="fl" @click="takeInExam">进入考试</span>
          </p>
        </div>
      </div>
    </div>
    <!-- 面包屑结束 -->

    <!-- 考试详情列表 -->
    <div class="examDetailList">
      <div class="wrapper">
        <div class="detailListTit">
          <ul class="clearfix titList">
            <li class="examName">考试名称</li>
            <li class="examAllGrade1">试卷总分</li>
            <li class="basicGrade">及格分数</li>
            <li class="examCount">考试次数</li>
            <li class="examTimeLength">考试时长</li>
            <li class="examTime">考试时间</li>
          </ul>
          <ul class="conentList clearfix">
            <li class="examNameCon">{{examInfo.examName}}</li>
            <li class="examAllGradeCon">{{examInfo.paperTotalScore}}分</li>
            <li class="basicGradeCon">{{examInfo.examPass}}分</li>
            <li class="examCountCon">
              <span  v-if="studyExamStatus==3">{{examInfo.examCount-examInfo.studyExamCount}}次/{{examInfo.examCount}}次</span>
              <span v-if="studyExamStatus!=3">{{examInfo.examCount}}次</span>
            </li>
            <li class="examTimeLengthCon">{{examInfo.examTime}}分钟</li>
            <li class="examTimeCon">{{examInfo.beginTime}}---{{examInfo.endTime}}</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 考前须知 -->
    <div class="examBefore">
      <div class="wrapper examBeforeAll">
        <div class="examBeforeNotice">
          <span class="examBeforeTit in_display">考前须知</span>
          <p class="examBeforeCon" v-html="examInfo.examNotice" v-if="examInfo.examNotice!=''">
          </p>
          <p class="examBeforeCon" v-if="examInfo.examNotice==''">
          <p class="examBeforeCon" v-if="examInfo.examNotice==''">
            无
          </p>
        </div>
      </div>
    </div>

    <!-- 考试描述 -->
    <div class="examDescription">
      <div class="wrapper examDescriptionAll">
        <div class="examDescriptionNotice">
          <span class="examDescriptionTit in_display">考试描述</span>
          <p class="examDescriptionCon" v-html="examInfo.description" v-if="examInfo.description!=''">
          </p>
          <p class="examDescriptionCon" v-if="examInfo.description==''">
            无
          </p>
        </div>
      </div>
    </div>

    <!-- 考试记录 -->
    <div class="examRecord">
      <div class="wrapper examRecordAll">
        <div class="examRecordNotice">
          <span class="examRecordTit in_display">考试记录</span>
          <div class="examRecordList">
            <ul class="examRecordListTit clearfix">
              <li class="examRecordIndex"></li>
              <li class="examRecordTime">考试时间</li>
              <li class="examRecordTimeLength">考试时长</li>
              <li class="examRecordGrade">考试分数</li>
              <li class="examRecordHandle">操作</li>
              <li class="hiddenScroll"></li>
            </ul>
            <div class="examRecordListCon">
              <ul class="examRecordListConOption clearfix" v-for="(r,index) in examInfo.records">
                <li class="optionIndex">{{index+1}}</li>
                <li class="examRecordTimeCon">{{r.examRecordTime}}</li>
                <li class="examRecordLengthCon">{{r.examLength}}分钟</li>
                <li class="examRecordGradeCon">{{r.userScore}}分</li>
                <li class="cursorPointer" @click="recordDetail(r.id)" :class="examInfo.records.length>5 ? 'examRecordConDetail01':'examRecordConDetail02'">查看详情</li>
              </ul>
              <ul class="examRecordListConOption clearfix" v-if="examInfo.records==0">
                <p style="text-align: center;margin-top: 30px;">暂无数据！</p>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import '@css/reset.css'
  import '@css/examDetail.css'
  import httpTool from '@/httptool';
  import cast from '@/cast';
  import headerCommon from '@components/header.vue'
  export default{
    components:{headerCommon},
    data(){
      return{
        examInfo:{},
        studyExamStatus:0,
        categoryList:[],
      }
    },
    methods:{
      getExam(id){//获取考试详情
        httpTool.apiHttp({
          url: cast.apiUrl_exam + "/centerExam/getExam?examId="+id ,
          method: "get",
          cbfn: (res) => {
            if(res.code == cast.returnState().BIZ_SUCCESS){
              this.examInfo = res.data;
              this.getCatetory(this.examInfo.categoryId);
              if((this.examInfo.examStatus==0||this.examInfo.examStatus==1)&&this.examInfo.records.length==0){
                this.studyExamStatus=0;
              }
            if(this.examInfo.records.length>0){
              this.studyExamStatus = 2;
            }
            }
          }
        });
      },
      takeInExam(){//参加考试
        var flag=true;
        if(this.examInfo.examStatus==0){
          this.$message({
            message: '考试未开始！',
            type: 'warn'
          });
          flag=false;
          return flag;
        }
        if(this.examInfo.examStatus==2){
          this.$message({
            message: '考试已经结束！',
            type: 'warn'
          });
          flag=false;
          return flag;
        }
        if(this.examInfo.studyExamCount==this.examInfo.examCount){
          this.$message({
            message: '考试次数不能超过限制！',
            type: 'warn'
          });
          flag=false;
          return flag;
        }
        if(flag){
          this.$router.push({path:'/examOnline/'+this.examInfo.id});
        }
      },
      recordDetail(examId){
        this.$router.push({path:'/recordDetail/'+examId});
      },
      /** 获取分类 分支**/
      getCatetory(categoryId){
        httpTool.apiHttp({
          url: cast.apiUrl_basicsys + "/sysCategory/findParentById/3/"+categoryId,
          method: "get",
          cbfn: (response) => {
            this.categoryList = response.data;
            console.log(this.categoryList);
          }
        });
      },
      back2list(categoryCode){//跳转列表页面
        if(categoryCode!=null && categoryCode!="" && categoryCode!=undefined){
          this.$router.push({path:'/examCenter/'+categoryCode});
        }else{
          this.$router.push({path:'/'});
        }
      }
    },
    mounted(){
      var id=this.$route.params.examId;
      this.getExam(id);
    }
  }
</script>
