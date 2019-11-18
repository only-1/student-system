<template>
  <div>
    <!-- 单选 -->
    <exam-radio v-if="examRecord.question.questionType == 1"
                :examRecord="examRecord.question"
                :showIndex="showIndex"
                v-on:valueChange="valueChange"></exam-radio>

    <!-- 多选 -->
    <exam-checkbox v-if="examRecord.question.questionType == 2"
                 :examRecord="examRecord.question"
                 :showIndex="showIndex"
                 v-on:valueChange="valueChange"></exam-checkbox>

    <!-- 判断 -->
    <exam-judge v-if="examRecord.question.questionType == 3"
                :examRecord="examRecord.question"
                :showIndex="showIndex"
                v-on:valueChange="valueChange"></exam-judge>

    <!-- 填空题 -->
    <exam-filling v-if="examRecord.question.questionType == 4"
                :examRecord="examRecord.question"
                :showIndex="showIndex"
                v-on:valueChange="valueChange"></exam-filling>

    <!-- 问答题 -->
    <exam-ask v-if="examRecord.question.questionType == 5"
                :examRecord="examRecord.question"
                :showIndex="showIndex"
                v-on:valueChange="valueChange"></exam-ask>
  </div>
</template>
<script>
  import examRadio from '@components/examRadio.vue'
  import examCheckbox from '@components/examCheckbox.vue'
  import examJudge from '@components/examJudge.vue'
  import examAsk from '@components/examAsk.vue'
  import examFilling from '@components/examFilling.vue'

  export default {
    components:{examRadio,examCheckbox,examJudge,examAsk,examFilling},
    props: {
      examRecord:{},
      showIndex: 0,
    },
    data() {
      return {
      }
    },
    mounted(){
    },
    methods: {
      valueChange(object){
        this.$emit("setExamValue", object);
      }
    }
  }
</script>
