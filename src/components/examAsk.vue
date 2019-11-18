<template>
  <div>
      <!-- 单选 -->
          <div class="examAsks">
            <div class="examAsksAll clearfix">
              <p class="examAsksIndex fl">
                <span class="fl">{{examRecord.orderNum}}</span>
                <span class="fr examAskTitle">问答题</span>
              </p>
              <div class="examAskConent fl">
                <p v-html="examRecord.questionTitle"></p>
              </div>
            </div>
            <div class="askOption">
                <textarea v-model="answer" ></textarea>
            </div>
          </div>
  </div>
</template>

<script>
  import '@css/reset.css'
  import '@css/examAsk.css'
  export default {
    props: {
      examRecord:{},
      showIndex: 0,
    },
    data(){
      return{
        answer: "",
        showQuestionIndex: 0,
      }
    },
    watch:{
      answer(val) {
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
