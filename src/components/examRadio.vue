<template>
  <div>
    <!-- 单选 -->
    <div class="examRideos">
      <div class="examRideosAll clearfix">
        <p class="examRideosIndex fl">
          <span class="fl">{{examRecord.orderNum}}</span>
          <span class="fr examRadioTitle">单选题</span>
        </p>
        <div class="examRideoConent fl">
          <p v-html="examRecord.questionTitle"></p>
        </div>
      </div>
      <div class="rideoOption" v-if="examRecordOption!=null && examRecordOption.length > 0">
          <el-radio-group v-model="radioValue" >
            <el-radio :label="option.id" v-for="(option, index) in examRecordOption">
              {{optionIndex[index]}}.<span class="in_display" style="margin-left: 10px;"  v-html="option.content"></span>
            </el-radio>
          </el-radio-group>
      </div>
    </div>
  </div>
</template>

<script>
  import '@css/reset.css'
  import '@css/examRadio.css'

  const optionIndex = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  export default {
    props: {
      examRecord:{},
      showIndex: 0,
    },
    data(){
      return {
        examRecordOption:[],
        radioValue:"",
        optionIndex: optionIndex,
        showQuestionIndex: 0,
      }
    },
    watch:{
      showIndex(val) {
        this.showQuestionIndex = val;
      },
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
