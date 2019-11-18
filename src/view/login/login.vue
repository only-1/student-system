<template>
  <div style="height: 100%">
    <el-container :style="'height:'+pageHeight+'px'">
      <el-main id="login-main" >
        <el-container class="box-card">
          <el-header>兴汉培训管理系统</el-header>
          <el-main>
            <el-row :gutter="20">
              <el-col :span="12">&nbsp</el-col>
              <el-col :span="12">
                <div class="grid-content">
                  <img class="hantek" src="../../assets/images/hantek.png"/>
                  <div class="login-text">登录</div>
                  <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm XGma">
                    <el-form-item prop="username">
                      <el-input v-model="ruleForm.username" placeholder="请输入用户名"></el-input>
                    </el-form-item>
                    <el-form-item  prop="pass">
                      <el-input type="password" v-model="ruleForm.pass"  placeholder="请输入密码"></el-input>
                    </el-form-item>
                    <!--<el-form-item prop="code" >-->
                      <!--<el-col :span="12" style="padding-left: 0"  >-->
                        <!--<el-input   v-model="ruleForm.code" placeholder="请输入验证码"></el-input>-->
                      <!--</el-col>-->
                      <!--<el-col :span="8" style="padding-right: 0">-->
                        <!--<img :src='imgUrl'  @click="getvCode"   width="100%" style="margin-top: 2px;cursor: pointer" />-->
                      <!--</el-col>-->
                      <!--<el-col :span="3" style="padding-right: 0;line-height: 40px; text-align: center" >-->
                        <!--<i @click="getvCode" style="font-size: 20px; cursor: pointer"   class="el-icon-refresh"></i>-->
                      <!--</el-col>-->
                    <!--</el-form-item>-->

                    <el-form-item label=""  class="seepassword">
                      <el-checkbox label="记住密码" name="type"  v-model="ruleForm.isRemebme"></el-checkbox>
                    </el-form-item>
                    <el-form-item style="margin-bottom: 0">
                      <el-button type="warning" @click="submitForm('ruleForm')" style="width: 100%;">登录</el-button>
                    </el-form-item>
                    <el-button type="text" class="sign">免费注册</el-button>
                  </el-form>
                </div>
              </el-col>

            </el-row>
          </el-main>
        </el-container>

      </el-main>
      <el-footer>Copyright 2009 hantek softech 沪ICP备：06000338号 </el-footer>
    </el-container>
  </div>
</template>
<script>
  import httpTool from '@/httptool'
  import cast from '@/cast'
  import MD5Util from '@js/md5'
  import tool from '@/utils'
  export default {
    data() {
      var username = (rule, value, callback) => {
         var usernameReg = /^[a-zA-Z0-9_]{5,19}$/;
         if(!value|| value.trim()==''||value)
         if (!value || value.trim()==''|| value.trim()==null || value.trim() ==undefined  ) {
            callback(new Error('用户名不能为空'));
         }else if(!usernameReg.test(value)){
           callback(new Error('账号必须为6-20的数字,字母,下划线的组合'));
         }else {
           callback()
         }
     };
     var password = (rule, value, callback) => {
       var passwordReg = /^[a-zA-Z0-9_]{5,19}$/;
       if ( !value|| value.trim()==''|| value.trim()==null || value.trim() ==undefined ) {
          callback(new Error('密码不能为空'));
       }else if(!passwordReg.test(value)){
         callback(new Error('密码错误'));
       }else{
         callback()
       }
     };
     var code = (rule, value, callback) => {
       if ( !value || value.trim()==''|| value.trim()==null || value.trim() ==undefined ) {
         callback(new Error('请输入验证码'));
       }else{
         callback()
       }

     };

      return {
        pageHeight:500,
//        imgUrl:require('../../assets/images/code.png'),
        capthaId:'',
        ruleForm: {
          username: '',
          pass: '',
          code: ''
        },

        rules: {
          username: [
            { validator: username, trigger: 'blur' }
          ],
          pass: [
            { validator: password, trigger: 'blur' }
          ],
          code: [
            { validator: code, trigger: 'blur' }
          ]
        }
      };
    },
    //页面加载完成，刷新验证码
    mounted(){
//      this.getvCode();
      this.pageHeight=document.documentElement.clientHeight;
    },
    //登录验证
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {


          if (valid) {
            httpTool.apiHttp({
              url:cast.apiUrl_login + '/login',
              method:"post",
              params:{
                "account"       : this.ruleForm.username,//用户名
                "pwd"           : MD5Util.md5(this.ruleForm.pass),//密码
                "captchaId"     : this.capthaId, //验证码关联码
                "captcha"        : this.ruleForm.code, //验证码
                "isRemebme"     : this.ruleForm.isRemebme //记住我（0.不记住1.记住，默认0）
              },
              cbfn : (res)=>{
                if( res.code == cast.returnState().BIZ_SUCCESS ){
                  tool.removeStorage("user");
                  tool.removeStorage("token");
                  tool.removeStorage("refreshToken");
                  tool.setStorage("user",res.data);
                  tool.setStorage("token",res.data.token);
                  tool.setStorage("refreshToken",res.data.refreshToken);
                  this.$router.push('/studentCenter');
                }else{

                  var fieldIndex;
                  if (res.code== '2' || res.code== '3'  || res.code== '5'){
                    fieldIndex = 0;
                  }
                  if(res.code == '4'){
                    fieldIndex = 2;
                  }

                  var field = this.$refs[formName].fields[fieldIndex];
                  if(null != field){
                    field.validateMessage = res.message;
                    field.validateState = "error";
                  }
//                  this.getvCode();
                }
              }
            });

          }
        });
      },
      //刷新验证码
//      getvCode(){
//        httpTool.apiHttp({
//            url:cast.apiUrl_login + '/captcha',
//            method:"get",
//            params:{
//            },
//            cbfn : (res)=>{
//              if( res.code == cast.returnState().BIZ_SUCCESS ){
//                this.imgUrl = "data:image/png;base64," + res.data.captcha_img_base64;
//                this.capthaId = res.data.captcha;
//              }else{
//
//              }
//            }
//        });
//      },

    }
  }
</script>
<style>
  /*html, body{ margin: 0;width: 100%; height:100%;}*/
  body{
    margin: 0 !important;
  }
  #login-main{
    width: 100%;
    height:100%;
    background: url("../../assets/images/login.jpg") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }
  .el-container{
    width: 100%;
    height:100%;
    position: relative;
  }
  .el-footer {
    text-align: center;
    line-height: 60px;
    height: 60px;
    background: #2B2B2B;
    color: #ffffff;
  }
  .box-card{
    width: 800px;
    height: 500px;
    margin: auto;
    position: absolute;
    top: -20px; left: 0; bottom: 0; right: 0;
    color: #ff9f2e;
    font-size: 32px;
  }
  .box-card>.el-header{
    text-align: center;
    line-height:  20px;
    color: #ff9f2e;
    background: rgba(0,0,0,0);
  }
  .box-card>.el-main{
    background:#ffffff url("../../assets/images/loginmain.jpg") no-repeat;
    -webkit-background-size: 50% 100%;
    font-size: 16px;
  }
  .hantek{
    display: block;
    margin: 10px auto;
  }
  .login-text{
    text-align: center;
    font-size: 24px;
    margin: 15px 0;
  }
  .grid-content{
    padding: 0 22px;
  }
  .XGma .el-form-item__content{
    margin-left: 10px !important;
  }
  .sign{
    text-align: right;
    display: block;
    width: 100%;
    padding-right:10px;
    color: #000;
  }
  .seepassword{
    margin-bottom: 10px;
  }
  .el-form-item__content{
    line-height: 20px;
  }
  .aside{
    float: left;
  }
  .main{
    float: right;
  }
</style>
