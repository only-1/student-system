<template>
  <div>
      <!-- 单选 -->
          <div class="examJudges">
            <div class="examJudgesAll clearfix">
              <p class="examJudgesIndex fl">
                <span class="fl">{{examRecord.orderNum}}</span>
                <span class="fr examJudgeTitle">判断题</span>
              </p>
              <div class="examJudgeConent fl">
                <p v-html="examRecord.questionTitle"></p>
              </div>
            </div>
            <div class="judgeOption">
              <el-radio-group v-model="radioValue" >
                <el-radio label="正确">正确</el-radio>
                <el-radio label="错误">错误</el-radio>
              </el-radio-group>
            </div>
          </div>
  </div>
</template>

<script>
  import '@css/reset.css'
  import '@css/examJudge.css'


  export default {
    props: {
      examRecord:{},
      showIndex: 0,
    },
    data(){
      return {
        radioValue:"",
        showQuestionIndex: 0,
      }
    },
    watch:{
      radioValue(val) {
        var object = {
          id:this.examRecord.id,
          questionId:this.examRecord.questionId,
          questionScore:this.examRecord.questionScore,
          userAnswer:val.toString(),
          questionType:this.examRecord.questionType
        };
        this.$emit("valueChange", object);
      }
    }
  }
</script>
