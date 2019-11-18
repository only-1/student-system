<template>
  <div>
      <!-- 多选 -->
      <div class="examCheckbox">
        <div class="examCheckboxAll clearfix">
          <p class="examCheckboxIndex fl">
            <span class="fl">{{examRecord.orderNum}}</span>
            <span class="fr">多选题</span>
          </p>
          <div class="examCheckboxConent fl">
            <p v-html="examRecord.questionTitle"></p>
          </div>
        </div>
        <div class="checkboxOption" v-if="examRecordOption!=null && examRecordOption.length > 0">
          <el-checkbox-group v-model="checkboxValue" >
              <el-checkbox v-for="(option, index) in examRecordOption"
                           :label="option.id" :key="option.id">
                {{optionIndex[index]}}.<span class="in_display" style="margin-left: 10px;" v-html="option.content"></span>
              </el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
  </div>
</template>

<script>
  import '@css/reset.css'
  import '@css/examCheckbox.css'

  const optionIndex = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  export default {
    props: {
      examRecord:{},
      showIndex: 0,
    },
    data(){
      return{
        examRecordOption: [],
        checkboxValue: [],
        optionIndex: optionIndex,
        showQuestionIndex: 0,
      }
    },
    mounted(){
    },
    watch:{
      showIndex(val) {
        this.showQuestionIndex = val;
      },
      checkboxValue(val) {
        var object = {
          id:this.examRecord.id,
          questionId:this.examRecord.questionId,
          questionScore:this.examRecord.questionScore,
          userAnswer:val.toString(),
          questionType:this.examRecord.questionType
        };
        this.$emit("valueChange", object);
      }
    },
    methods:{
      initOption(){
        var optionVoList = this.examRecord.optionVoList;
        var orderArr = this.examRecord.optionOrder.split(",");
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
