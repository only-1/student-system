<template>
  <div>
    <!-- 填空 -->
    <div class="examFillings">
      <div class="examFillingsAll clearfix">
        <p class="examFillingsIndex fl">
          <span class="fl">{{examRecord.orderNum}}</span>
          <span class="fr examFillingTitle">填空题</span>
        </p>
        <div class="examFillingConent fl">
                  <span v-for="(title,index) in questionTitleArr">
                    {{title}}
                    <input type="text" v-if="index!=questionTitleArr.length-1"
                           v-model="valueList[index]" >
                  </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import '@css/reset.css'
  import '@css/examFilling.css'


  export default {
    props: {
      examRecord:{},
    },
    data(){
      return{
        questionTitleArr: [],
        valueList: [],
      }
    },
    mounted(){
      this.examRecord.questionTitle = this.examRecord.questionTitle.replace("<p>","").replace("</p>","");
      if(this.examRecord.questionTitle.indexOf("()") >= 0){
        this.questionTitleArr = this.examRecord.questionTitle.split("()");
      }else if(this.examRecord.questionTitle.indexOf("（）") >= 0){
        this.questionTitleArr = this.examRecord.questionTitle.split("（）");
      }
    },
    watch: {
      valueList(val) {
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
