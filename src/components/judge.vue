<template>
	<div>
		<!-- 判断题样式开始 -->
		<ul class="judgeButtonList">
			<li class="judgeButton">
				<div class="judgeTestQuestions clearfix">
					<div class="fl IndexAddType">
						  <span class="judgeIndex fl">{{examAnswerRecord.orderNum}}</span>
						  <span class="judgeType fl">判断题</span>
					</div>
					<div class="fl judgeContentAddOption">
						<p class="judgeConent" v-html="examAnswerRecord.questionTitle"></p>
						<div class="judgeOption">
							<ul class="judgeOptionList">
								<li class="clearfix judgeOptionLi">
								<!-- 选中的答案上加 chooseQuestion类-->
									<span v-bind:class="examAnswerRecord.userAnswer==='正确'?'fl judgeOptionLetter  chooseQuestion':'fl judgeOptionLetter'">Y</span>
									<span class="judgeOptionContent fl">正确</span>
								</li>
								<li class="clearfix judgeOptionLi">
                  <span v-bind:class="examAnswerRecord.userAnswer==='错误'?'fl judgeOptionLetter  chooseQuestion':'fl judgeOptionLetter'">N</span>
									<span class="judgeOptionContent fl">错误</span>
								</li>
							</ul>
						</div>
					</div>
				</div>
				<div class="judgeQuestionDetail" v-if="showAnalysis">
					<div class="judgeTrueOrFalse clearfix">
					<!-- 动态切换 questionFalse/questionTrue 两个类 显示不同的图标-->
						<span v-bind:class="examAnswerRecord.userAnswer===examAnswerRecord.answer?'questionTrue fl':'questionFalse fl'"></span>
						<span class="myQuestion fl">正确答案 :
              <i>{{examAnswerRecord.answer}}</i>
						</span>
					</div>
					<div class="judgeQuestionAnalysis">
						<p class="judgeAnalysisTit">
							试题解析
						</p>
						<p class="judgeAnalysisContent" v-html="examAnswerRecord.remark">
						</p>
					</div>
				</div>
			</li>
		</ul>
		<!-- 判断题样式结束 -->
	</div>
</template>
<script>
import '@css/reset.css'
import '@css/judge.css'
	export default{
    props: {
      examAnswerRecord:{},
      showAnalysis: false,
    },
		data(){
			return{

			}
		}
	}
</script>
