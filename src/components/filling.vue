<template>
	<div>
		<!-- 填空题样式开始 -->
		<ul class="fillButtonList">
			<li class="fillingButton">
				<div class="fillTestQuestions clearfix">
					<div class="fl fillIndexAddType">
						  <span class="fillIndex fl">{{examAnswerRecord.orderNum}}</span>
						  <span class="fillType fl">填空题</span>
					</div>
					<div class="fl fillContentAddOption">
						<p class="fillConent">
              <span v-for="(title,index) in questionTitleArr">
                {{title}}
                <span class="fillQuestionOption in_display" v-if="index!=questionTitleArr.length-1">
                  {{userAnswerArr[index]}}
                </span>
              </span>
						</p>
					</div>
				</div>
				<div class="testQuestionDetail" v-if="showAnalysis">
					<div class="fillquestionTrueOrFalse clearfix">
					<!-- 动态切换 questionFalse/questionTrue 两个类 显示不同的图标-->
						<span class="questionWaring fl"></span>
						<span class="myfillQuestion fl">参考答案为 :
							<p v-html="examAnswerRecord.answer"></p>
						</span>

					</div>
					<div class="fillquestionAnalysis">
						<p class="fillanalysisTit">
							试题解析
						</p>
						<p class="fillanalysisContent" v-html="examAnswerRecord.remark"></p>
					</div>
				</div>
			</li>
		</ul>
		<!-- 填空题样式结束 -->
	</div>
</template>
<script>
import '@css/reset.css'
import '@css/filling.css'
	export default{
    props: {
      examAnswerRecord:{},
      showAnalysis:false,
    },
		data(){
			return{
        questionTitleArr: [],
        userAnswerArr: [],
        answerArr: [],
			}
		},
    mounted(){
      this.examAnswerRecord.questionTitle = this.examAnswerRecord.questionTitle.replace("<p>","").replace("</p>","");
      if(this.examAnswerRecord.questionTitle.indexOf("()") >= 0){
        this.questionTitleArr = this.examAnswerRecord.questionTitle.split("()");
      }else if(this.examAnswerRecord.questionTitle.indexOf("（）") >= 0){
        this.questionTitleArr = this.examAnswerRecord.questionTitle.split("（）");
      }
      var userAnswer = this.examAnswerRecord.userAnswer;
      if(userAnswer!=null && userAnswer!="" && userAnswer!=undefined){
        this.userAnswerArr = userAnswer.split(",");
      }
      this.answerArr = this.examAnswerRecord.answer;
    },
	}
</script>
