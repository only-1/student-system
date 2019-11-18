<template>
	<div>
    <!-- 面包屑开始 -->
    <div class="pageNav">
      <div class="wrapper clearfix">
        <ul class="pageNavList fl">
          <li class="pageNavOption fl">
            <span class="fl" @click="back2list('')">首页</span>
            <i class="fl"></i>
          </li>
          <li class="pageNavOption fl">
            <span class="fl" @click="back2Exam('')">考试中心</span>
            <i class="fl"></i>
          </li>
          <li class="pageNavOption fl">
            <span class="fl" @click="back2Detail('')">考试详情</span>
            <i class="fl"></i>
          </li>
          <li class="pageNavOption fl">
            <span class="fl">考试记录</span>
            <i class="fl"></i>
          </li>
        </ul>
      </div>
    </div>
    <!-- 面包屑结束 -->
		<!-- 考前须知 -->
		<div class="examHistory">
			<div class="wrapper examHistotyDetail">
				<div class="examHistotyDetailOption clearfix">
					<p class="examHistotyDetailTit fl">{{examRecord.name}}</p>
					<div class="fl examHistotyDetailcon">
						<ul class="examHistotyDetailList fl">
							<li>
								<p class="examGoal">试卷得分</p>
								<p class="goalGrade">{{examRecord.userScore}}分</p>
							</li>
							<li>
								<p class="examGoal">交卷时间</p>
								<p class="submitTime">{{examRecord.endTime}}</p>
							</li>
							<li>
								<p class="examGoal">试卷总分</p>
								<p class="submitTime">{{examRecord.score}}分</p>
                <p class="submitTime">{{examRecord.score}}分</p>
							</li>
							<li>
								<p class="examGoal">考试时长</p>
								<p class="submitTime">{{examRecord.examTime}}分钟</p>
							</li>
              <li>
                <p class="examGoal">考试用时</p>
                <p class="submitTime">{{examRecord.examLength}}分钟</p>
              </li>
						</ul>
					</div>
				</div>
				<div class="errorNumber">
					<ul class="statisticsList clearfix">
						<li class="trueNumber">
							<span>正确 : </span>
							<i>{{rightCount}}</i>
						</li>
						<li class="falseNumber">
							<span>错误 : </span>
							<i>{{errorCount}}</i>
						</li>
						<li class="noRespond">
							<span>未作答 : </span>
							<i>{{noAnswerCount}}</i>
						</li>
					</ul>
					<ul class="errorIndex clearfix">
            <li v-bind:class="answerRecord.flagRight===1?'trueNumberBack':(answerRecord.flagRight===0?'falseNumberBack':'nullNumberBack')"
                v-for="answerRecord in examAnswerRecordAllList">
              {{answerRecord.orderNum}}
            </li>
					</ul>
				</div>
			</div>
			<div class="wrapper examHistoryAll">
				<div class="examHistoryNotice">
					<span class="examHistoryTit in_display">答题记录</span>
          <exam-show-type v-for="answerRecord in examAnswerRecordList"
                          :showAnalysis="showAnalysis"
                          :examAnswerRecord="answerRecord"></exam-show-type>
				</div>
			</div>
      <div style="margin:82px 0">
        <page v-on:castCurrentPage="getCurrentPage" :pages = "page"></page>
      </div>
		</div>

	</div>
</template>
<script>
  import '@css/reset.css'
  import '@css/examRecord.css'
  import page from '@components/page'
  import examShowType from '@components/examShowType'

  import httpTool from '@/httptool';
  import cast from '@/cast';
  import tool from '@/utils';

	export default{
		components:{examShowType, page},
		data(){
			return{
			  examRecord: {},
        examAnswerRecordList: [],
        examAnswerRecordAllList: [],
        rightCount:0,
        errorCount:0,
        noAnswerCount: 0,
        page:{
          currentPage:1,
          pageSize:5
        },
        examId: null,
        showAnalysis: true,
			}
		},
    methods:{
      getExamRecord(id) {//获取考试详情
        httpTool.apiHttp({
          url: cast.apiUrl_exam + "/centerExam/getExamRecord" ,
          method: "post",
          params: {
            id: id,
          },
          cbfn: (res) => {
            if(res.code == cast.returnState().BIZ_SUCCESS){
              this.examRecord = res.data.data;
              var userScore = this.examRecord.userScore;
              if(this.examRecord.answerOpenType == 2
                && new Date < new Date(this.examRecord.examEndTime)){
                //&& userScore!=null && userScore!="" && userScore!=undefined
                this.showAnalysis = false;
              }
              this.getExamAnswerRecordAll(id);
              this.getExamAnswerRecord(id);
            }
          }
        });
      },
      /**
       * 获取考试 所有试题  序号 是否正确 用户回答
       * @param id
       */
      getExamAnswerRecordAll(id){
        httpTool.apiHttp({
          url: cast.apiUrl_exam + "/centerExam/getExamAnswerRecordAll" ,
          method: "post",
          params: {
            examId: id,
          },
          cbfn: (res) => {
            if(res.code == cast.returnState().BIZ_SUCCESS){
              this.examAnswerRecordAllList = res.data.data;

              for(var i=0; i < this.examAnswerRecordAllList.length; i++){
                var temp = this.examAnswerRecordAllList[i];
                if(temp.flagRight === 1){
                  this.rightCount++;
                }else{
                  this.errorCount++;
                }
                if(temp.userAnswer==null || temp.userAnswer=="" || temp.userAnswer==undefined){
                  this.noAnswerCount++;
                }
              }
            }
          }
        });
      },
      getExamAnswerRecord(id){
        httpTool.apiHttp({
          url: cast.apiUrl_exam + "/centerExam/getExamAnswerRecord" ,
          method: "post",
          params: {
            examId: id,
          },
          page: this.page,
          cbfn: (res) => {
            if(res.code == cast.returnState().BIZ_SUCCESS){
              this.examAnswerRecordList = res.data.data.data;
              this.page = res.data.data.page;
              console.log(res.data.data);
            }
          }
        });
      },
      getCurrentPage(val){
        this.page.currentPage = val;
        this.getExamAnswerRecord(this.examId);
      },
      back2list(){//跳转列表页面
        this.$router.push({path:'/examCenter/0'});
      },
      back2Exam(){//跳转列表页面
        this.$router.push({path:'/examCenter/0'});
      },
      back2Detail(){//跳转列表页面
        this.$router.push({path:'/examDetail/' + this.examRecord.examId});
      },
    },
    mounted(){
      var id=this.$route.params.examId;
      this.examId = id;
      console.log(id);
      this.getExamRecord(id);
    }
	}
</script>
