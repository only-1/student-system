<template>
	<div>
		<!-- 单选题样式开始 -->
		<ul class="radioButtonList">
			<li class="radioButton">
				<div class="radioTestQuestions clearfix">
					<div class="fl IndexAddType">
						  <span class="radioIndex fl">{{examAnswerRecord.orderNum}}</span>
						  <span class="radioType fl">{{examAnswerRecord.questionType==1?'单选题':'多选题'}}</span>
					</div>
					<div class="fl ContentAddOption">
            <div class="radioConent" v-html="examAnswerRecord.questionTitle"></div>
						<div class="radioOption">
							<ul class="radioOptionList">
								<li class="clearfix radioOptionLi" v-for="(option, index) in examRecordOption">
								<!-- 选中的答案上加 chooseQuestion类-->
									<span v-bind:class="examAnswerRecord.userAnswer.indexOf(option.id) >= 0 ?'fl optionLetter chooseQuestion':'fl optionLetter'">
                    {{optionIndex[index]}}
                  </span>
									<span class="optionContent fl" v-html="option.content"></span>
								</li>
							</ul>
						</div>
					</div>
				</div>
				<div class="testQuestionDetail" v-if="showAnalysis">
					<div class="questionTrueOrFalse clearfix">
					  <!-- 动态切换 questionFalse/questionTrue 两个类 显示不同的图标-->
						<span v-bind:class="examAnswerRecord.flagRight===1?'questionTrue fl':'questionFalse fl'"></span>
						<span class="myQuestion fl">正确答案 :
              <i v-for="(option, index) in examRecordOption" v-if="option.flgTrue===1">
                {{optionIndex[index]}}
              </i>
						</span>
					</div>
					<div class="questionAnalysis">
						<p class="analysisTit">
							试题解析
						</p>
						<p class="analysisContent" v-html="examAnswerRecord.remark"></p>
					</div>
				</div>
			</li>
		</ul>
		<!-- 单选题样式结束 -->
	</div>
</template>
<script>
import '@css/reset.css'
import '@css/radio.css'

  const optionIndex = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
	export default{
    props: {
      examAnswerRecord:{},
      showAnalysis: false,
    },
    watch: {
      examAnswerRecord() {
        this.initOption();
      }
    },
		data(){
			return{
        examRecordOption:[],
        optionIndex:optionIndex,
			}
		},
    methods:{
      initOption(){
        var optionVoList = this.examAnswerRecord.optionVoList;
        var orderArr = this.examAnswerRecord.optionOrder.split(",");
        var tempVoList = [];
        for(var i=0; i<orderArr.length; i++){
          var orderId = orderArr[i];
          for(var m=0; m<optionVoList.length; m++){
            if(orderId == optionVoList[m].id){
              tempVoList.push(optionVoList[m]);
              break;
            }
          }
        }
        this.examRecordOption = tempVoList;
      }
    },
    mounted(){
      this.initOption();
    }
	}
</script>
