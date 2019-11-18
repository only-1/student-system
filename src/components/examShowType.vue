<template>
  <div>
    <!-- 单选题样式开始 -->
    <radio :examAnswerRecord="examAnswerRecord"
           :showAnalysis="showAnalysis"
           v-if="examAnswerRecord.questionType==1 || examAnswerRecord.questionType==2"></radio>
    <!-- 单选题样式结束 -->

    <!-- 判断题样式开始 -->
    <judge :examAnswerRecord="examAnswerRecord"
           :showAnalysis="showAnalysis"
           v-if="examAnswerRecord.questionType==3"></judge>
    <!-- 判断题样式结束 -->

    <!-- 填空题样式开始 -->
    <filling :examAnswerRecord="examAnswerRecord"
             :showAnalysis="showAnalysis"
             v-if="examAnswerRecord.questionType==4"></filling>
    <!-- 填空题样式结束 -->

    <!-- 问答题样式开始 -->
    <ask :examAnswerRecord="examAnswerRecord"
         :showAnalysis="showAnalysis"
         v-if="examAnswerRecord.questionType==5"></ask>
    <!-- 问答题样式结束 -->
  </div>
</template>
<script>
  import radio from '@components/radio'
  import filling from '@components/filling'
  import ask from '@components/ask'
  import judge from '@components/judge'

  export default {
    components:{radio,filling,ask,judge},
    props: {
      examAnswerRecord:{},
      showAnalysis: [Boolean],
    },
    data() {
      return {
      }
    },
    mounted(){
    },
  }
</script>
