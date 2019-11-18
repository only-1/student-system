<template>
  <div>
    <!-- 问答题样式开始 -->
    <ul class="askButtonList">
      <li class="askButton">
        <div class="askTestQuestions clearfix">
          <div class="fl askIndexAddType">
            <span class="askIndex fl">{{examAnswerRecord.orderNum}}</span>
            <span class="askType fl">问答题</span>
          </div>
          <div class="fl askContentAddOption">
            <div class="askConent">
              <div class=" clearfix">
                <span class="askIcon fl">问</span>
                <p class="askQuestionContent fl" v-html="examAnswerRecord.questionTitle"></p>
              </div>
              <div class="clearfix respond">
                <span class="respondIcon fl">答</span>
                <p class="respondQuestionContent fl" v-html="examAnswerRecord.userAnswer"></p>
              </div>
            </div>
          </div>
        </div>
        <div class="askQuestionDetail" v-if="showAnalysis">
          <div class="askQuestionTrueOrFalse clearfix">
            <!-- 动态切换 questionFalse/questionTrue 两个类 显示不同的图标-->
            <span class="questionWaring fl"></span>
            <span class="myAskQuestion fl">
              <span>参考答案为 :</span>
              <span v-html="examAnswerRecord.answer" style="color: #28d291" class="fl"></span>
						</span>

          </div>
          <div class="askQuestionAnalysis">
            <p class="askAnalysisTit">
              试题解析
            </p>
            <p class="askAnalysisContent" v-html="examAnswerRecord.remark"></p>
          </div>
        </div>
      </li>
    </ul>
    <!-- 问答题样式结束 -->
  </div>
</template>
<script>
  import '@css/reset.css'
  import '@css/ask.css'
  export default{
    props: {
      examAnswerRecord:{},
      showAnalysis:false,
    },
    data(){
      return{

      }
    }
  }
</script>
