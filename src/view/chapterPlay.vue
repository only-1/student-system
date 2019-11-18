<template>
  <div>
      <!--导航开始-->
      <div class="playHead">
        <p class="playMenu">
          <!--<i class="el-icon-arrow-left"></i>-->
          <span class="in_display" @click="back2list">{{className}}</span>
          <span class="in_display">
            {{currentCourseware.coursewareName!=undefined? '>' + currentCourseware.coursewareName:''}}
            > {{currentChapter.chapterName}}
          </span>
        </p>
      </div>
      <!--导航结束-->

      <!-- 播放开始 -->
      <div class="playBanner" :style="'height:'+contentHeight+'px'">
        <div class="playLeft">
          <div style="width: 100%;height: 100%;background-color:#999;margin-left: 40px;">
            <video-player-mp4 style="width: 100%;height: 100%;background-color:#999;margin-left: 40px;"
                              :cswId="cswId"
                              :chapterId="currentChapter.chapterId"
                              :userId="currentChapter.userId"></video-player-mp4>
          </div>
        </div>
        <div class="playRight">
          <ul class="handleMenu">
          <!-- 给激活的状态加 chapterAvtive类-->
            <li @click="note(1)" v-bind:class="{chapterAvtive : activeIndex == 1}">
              <p class="handleChapterIcon">
                <!--<img src="../assets/images/chapter.png" alt="">-->
                <i class="el-icon-tickets"></i>
              </p>
              <p class="handleChapterCon">章节</p>
            </li>
            <li class="" @click="note(2)" v-bind:class="{chapterAvtive : activeIndex == 2}">
              <p class="handleChapterIcon">
                <!--<img src="../assets/images/note.png" alt="">-->
                <i class="el-icon-document"></i>
              </p>
              <p class="handleChapterCon">笔记</p>
            </li>
            <li class="" @click="note(3)" v-bind:class="{chapterAvtive : activeIndex == 3}">
              <p class="handleChapterIcon">
                <!--<img src="../assets/images/question.png" alt="">-->
                <i class="el-icon-question"></i>
              </p>
              <p class="handleChapterCon">提问</p>
            </li>
          </ul>
          <h3 class="playTit">{{className}}</h3>
          <ul class="playList">
            <li class="playListOne">
              <ul class="playListDetail  clearfix">
                <li class="playListTwo fl" v-for="(courseware,coursewareIndex) in coursewareList">
                  {{courseware.coursewareName}}
                  <ul class="playListDetail fl">
                    <li class="playListTwo fl" v-for="(chapter,index) in courseware.chapterRecordVoList"
                        @click="changeChapter(courseware.coursewareId, chapter.chapterId,index)" :class="{activePlay:chapter.isActive}">
                      <span class="el-icon-caret-right fl"></span>
                      <span class="fl playChapterTit">{{chapter.chapterName}}</span>
                      <!--<span class="fl playChapterTimeLong"> (10.00)</span>-->
                      <!-- 学习状态   未学习用noPlay类  已完成用overPlay  正在学用 playing -->
                      <span v-bind:class="chapter.learnStatus===2?'fr overPlay':(chapter.learnStatus===1?'fr playing':'fr noPlay')"></span>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
      <!-- 播放结束 -->

      <!-- 提问、笔记弹出框开始 -->
      <div class="playLayerBack" v-if="questionLayer">
        <div class="playLayer">
          <p class="playLayerTit clearfix">
            <span fl>{{layerTit}}</span>
            <i class="el-icon-close fr" @click="questionLayer=false"></i>
          </p>
          <div class="playLayerTextarea">
            <textarea v-model="layerCon" placeholder="请输入内容"></textarea>
            <span class="layerCount">{{layerCon | getLength}}/500</span>
          </div>
          <div class="playLayerBtn">
            <span class="in_display" @click="saveQuestion">确定</span>
          </div>
        </div>
      </div>
      <!-- 提问、笔记弹出框结束 -->

      <!-- 评论、问答、笔记开始开始 -->
      <div class="playRespond">
        <div class="wrapper playRespondWrapper">
          <div class="respondTabTitPlay">
            <ul class="respondTabTitListPlay clearfix">
              <!-- 选中的tab上加 replyPitchOn类-->
              <li @click="changeTab(2)" v-bind:class="{replyPitchOn : showTab.showIndex == 2}">评论</li>
              <li @click="changeTab(3)" v-bind:class="{replyPitchOn : showTab.showIndex == 3}">问答</li>
              <li @click="changeTab(4)" v-bind:class="{replyPitchOn : showTab.showIndex == 4}">笔记</li>
            </ul>
          </div>

          <div class="respondTabConPlay">
            <div v-if="showTab.showIndex != 1">
              <div class="respondBorderPlay">
                <textarea v-model='content' maxlength="500" placeholder="请输入你的回答"></textarea>
                <span class="fontSizeCountPlay">{{content | getLength}}/500</span>
                <div class="submitInputPlay clearfix">
                  <div class="fl" v-if="showTab.showIndex == 3">
                    <el-switch
                      v-model="lockMyself_question"
                      active-color="#f8a50b"
                      inactive-color="#d7d6d6">
                    </el-switch>
                    <span class="switchBtnPlay">只看我的</span>
                  </div>
                  <div class="fl" v-if="showTab.showIndex == 4">
                    <el-switch
                      v-model="lockMyself_note"
                      active-color="#f8a50b"
                      inactive-color="#d7d6d6">
                    </el-switch>
                    <span class="switchBtnPlay">只看我的</span>
                  </div>
                  <span class="fr submitBtnPlay" @click="publishComment(null,null)">{{btnTitle}}</span>
                </div>
              </div>
              <div class="reviewListPlay">
                <ul class="reviewListUlPlay">
                  <li class="reviewListLi" v-for="(record, index) in queryList">
                    <div class="reviewContent clearfix">
                      <span class="reviewHeadPlay fl"></span>
                      <div class="reviewDetailPlay fl">
                        <span class="reviewNamePlay">发表人名称 : {{record.userName}}</span>
                        <span class="reviewNamePlay">源自 : {{record.chapterName}}</span>
                        <p class="reviewFontSizePlay">{{record.comment}}</p>
                      </div>
                    </div>
                    <div class="reviewCountPlay" v-if="showTab.showIndex == 3">
                      <!-- 数量小于三位数用 reviewLessThree类   大于三位数用greaterThree 类 -->
                      <span class="greaterThree in_display"  @click='openChildreDialog(index)'>{{record.children==null?0 : record.children.length}}</span>
                      <span class="reviewDisplayBlockPlay">回答 | </span>
                      <span class="myReviewPlay" @click="openAnswerDialog(index)">我要回答</span>
                      <div class="clearfix" v-if='showAnswerDialog && index == questionIndex'>
                        <div class="myReviewBoxPlay fr">
                          <div class="triangleIconPlay"></div>
                          <textarea v-model='fontCount' maxlength="500"  placeholder="请输入你的回答"></textarea>
                          <span class="myReviewCountPlay">{{fontCount | getLength}}/500</span>
                          <p class="myReviewBoxBtnPlay">
                            <span class="myReviewTrue in_display" @click="submitAnswer(record.id)">回答</span>
                            <span class="myReviewFalse in_display" @click="showAnswerDialog=false">取消</span>
                          </p>
                        </div>
                      </div>
                      <div class="clearfix" v-if='record.children !=null && record.children.length > 0 && showChildren && index == questionIndex'>
                        <div class="reviewReplyPlay fr">
                          <div class="reviewTriangleIconPlay"></div>
                          <i class='reviewReplyClosePlay in_display' @click="showChildren=false"></i>
                          <ul class="reviewReplyListPlay">
                            <li class="clearfix reviewReplyLiPlay" v-for="answer in record.children">
                              <span class="fl reviewReplyHeadPlay"></span>
                              <div class="fl reviewReplyDetailPlay">
                                <span class="reviewReplyNamePlay fl">回答人的名称 : {{answer.userName}}</span>
                                <p class="reviewReplyContentPlay fl">{{answer.comment}}</p>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <!--分页开始-->
            <div style="margin:82px 0" v-if="showTab.showIndex > 1">
              <page v-on:castCurrentPage="changePage" :pages = "tempPage"></page>
            </div>
            <!--分页结束-->
          </div>
        </div>
      </div>
      <!-- 评论、问答、笔记开始结束 -->
  </div>
</template>
<script>
  import httpTool from '@/httptool';
  import cast from '@/cast';
  import tool from '@/utils';
  import page from '@components/page.vue'
  import videoPlayerMp4 from '@components/video_player_mp4.vue'

  import '@css/reset.css'
  import '@css/chapterPlay.css'
  export default{
     components:{page, videoPlayerMp4},
     filters:{
      getLength(val){
        return val.length
      }
    },
    data(){
      return{
        curriculumId: "",
        cswId: "",       //课程ID
        chapterId: "",
        coursewareList:[],
        currentCourseware:{},
        currentChapter: {},

        className:"",
        contentHeight:0,
        showTab:{
          showIndex: 2,
        },
        btnTitle:"发表评论",
        classDetail:{},
        questionLayer:false,//提问、笔记弹出框
        layerTit:'',//弹出框标题
        activeIndex:1,
        layerCon:'',//内容
        content:"", //内容
        fontCount:"",//内容
        queryList:[],//查詢出來的 评论，问答，笔记
        tempPage:{
          currentPage:1,
          pageSize:10,
        },
        commentPage:{
          currentPage:1,
          pageSize:10,
        },
        questionPage:{
          currentPage:1,
          pageSize:10,
        },
        notePage:{
          currentPage:1,
          pageSize:10,
        },
        lockMyself_question:true,
        lockMyself_note:true,
        showAnswerDialog:false,
        showChildren: false,

        playerOptions:{},
      }
    },
    methods:{
      /** 详情 **/
      getDetailById(curriculumId , cswId){
        var url;
        if(curriculumId!=null && curriculumId!='' && curriculumId!=undefined){
          url = cast.apiUrl_lms + "/centerLearnCurriculum/queryPlayListByCurriculumId/" + curriculumId;
        }else{
          url = cast.apiUrl_lms + "/centerLearnCoursewareRecord/queryById/" + cswId;
        }
        httpTool.apiHttp({
          url: url,
          method: "get",
          cbfn: (response) => {
            if(response.code == cast.returnState().BIZ_SUCCESS){
              this.classDetail = response.data;
              this.className = this.classDetail.name;
              if(curriculumId!=null && curriculumId!='' && curriculumId!=undefined){
                this.coursewareList = this.classDetail.coursewareLearnVoList;
              }else{
                var chapterList = this.classDetail.chapterRecordVoList;
                this.coursewareList = [];
                var coursewareObject = {
                  chapterRecordVoList: chapterList
                };
                this.coursewareList.push(coursewareObject);
              }
              this.initCurrentChapter(this.chapterId);
            }
          }
        });
      },
      changeChapter(coursewareId, chapterId,val){
        for(var m =0; m < this.coursewareList.length; m++) {
          var chapterList = this.coursewareList[m].chapterRecordVoList;
          for (var i = 0; i < chapterList.length; i++) {
            chapterList[i].isActive = false;
          }
          if(coursewareId!=null && coursewareId!='' && coursewareId!=undefined){
            if(coursewareId == this.coursewareList[m].coursewareId){
              chapterList[val].isActive = true;
            }
          }else{
            chapterList[val].isActive = true;
          }
        }
        this.initCurrentChapter(chapterId);
        this.flushTabList();
      },
      initCurrentChapter(chapterId){
        var continueFlag = true;
        for(var m =0; m < this.coursewareList.length; m++){
          if(continueFlag == false){
            break;
          }
          var chapterList = this.coursewareList[m].chapterRecordVoList;
          for(var i=0; i < chapterList.length; i++){
            if(chapterList[i].chapterId == chapterId){
              continueFlag = false;
              this.currentCourseware = this.coursewareList[m];
              this.currentChapter = chapterList[i];
              this.currentChapter.userId = this.classDetail.userId;
              this.chapterId = this.currentChapter.chapterId;
              break;
            }
          }
        }
      },
      note(index){
        this.activeIndex=index;
        if(index==1){
          this.$nextTick(function(){
            if($(".playRight").css('marginRight')=='0px'){
              $(".playRight").animate({marginRight:-326},500)
              $(".playLeft").animate({paddingRight:100},500)
            }else{
              $(".playRight").animate({marginRight:0},500);
              $(".playLeft").animate({paddingRight:450},500)
            }
          })
        }else if(index==2){
          this.questionLayer=true;
          this.layerTit="笔记"
        }else{
          this.questionLayer=true;
          this.layerTit="提问"
        }
      },
      /** 切换tab页 **/
      changeTab(index){
        this.showTab.showIndex = index;
        this.content = "";
        this.flushTabList();
      },
      changePage(val){
        this.tempPage.currentPage = val;
        this.flushTabList();
      },
      flushTabList(){
        var index = this.showTab.showIndex;
        switch(index){
          case 1:
            break;
          case 2: this.getCommentByCswId(); this.btnTitle="发表评论";break;
          case 3: this.getQuestionByCswId(); this.btnTitle="我要提问";break;
          case 4: this.getNoteByCswId(); this.btnTitle="保存笔记";break;
        }
      },
      /** 获取评论list **/
      getCommentByCswId(){
        httpTool.apiHttp({
          url: cast.apiUrl_lms + "/centerLearnCoursewareComment/queryCourseware",
          method: "post",
          params: {
            curriculumId: this.curriculumId,
            //cswId: this.cswId,
            chapterId: this.chapterId,
          },
          page: this.commentPage,
          cbfn: (response) => {
            this.queryList = response.data.data;
            this.commentPage = response.data.page;
            this.tempPage = this.commentPage;
          }
        })
      },
      /** 获取问答list **/
      getQuestionByCswId(){
        httpTool.apiHttp({
          url: cast.apiUrl_lms + "/centerLearnCoursewareQuestion/queryCourseware",
          method: "post",
          params: {
            curriculumId: this.curriculumId,
            //cswId: this.cswId,
            chapterId: this.chapterId,
            mySelf: this.lockMyself_question,
          },
          page: this.questionPage,
          cbfn: (response) => {
            this.queryList = response.data.data;
            this.questionPage = response.data.page;
            this.tempPage = this.questionPage;
          }
        })
      },
      /** 获取笔记list **/
      getNoteByCswId(){
        httpTool.apiHttp({
          url: cast.apiUrl_lms + "/centerLearnCoursewareNote/queryNote",
          method: "post",
          params: {
            curriculumId: this.curriculumId,
            //cswId: this.cswId,
            chapterId: this.chapterId,
            mySelf: this.lockMyself_note,
          },
          page: this.notePage,
          cbfn: (response) => {
            this.queryList = response.data.data;
            this.notePage = response.data.page;
            this.tempPage = this.notePage;
          }
        })
      },
      saveQuestion(){
        var index = 0;
        if(this.activeIndex == 2){
          index = 4;
        }else if(this.activeIndex == 3){
          index = 3;
        }
        this.publishComment(index, this.layerCon);
        this.questionLayer = false;
        this.layerCon = "";
      },
      ////发布
      publishComment(index, content){
        if(index == null || index == "" || index == undefined){
          index = this.showTab.showIndex
        }
        var url = "";
        var title = "";
        switch(index){
          case 2:
            url = cast.apiUrl_lms + "/centerLearnCoursewareComment/publishComment";
            title = "评论";
            break;
          case 3:
            url = cast.apiUrl_lms + "/centerLearnCoursewareQuestion/publishQuestion";
            title = "问答";
            break;
          case 4:
            url = cast.apiUrl_lms + "/centerLearnCoursewareNote/publishNote";
            title = "笔记";
            break;
        }
        if(content == null || content == "" || content == undefined){
          content = this.content;
        }
        if(content == null || content == "" || content == undefined){
          this.$message.error("请输入"+title+"内容");
          return false;
        }
        httpTool.apiHttp({
          url: url,
          method: "post",
          params: {
            curriculumId: this.curriculumId,
            cswId: this.cswId,
            content: content,
            chapterId: this.chapterId
          },
          cbfn: (response) => {
            if(response.code == cast.returnState().BIZ_SUCCESS){
              this.content = "";
              this.$message({message: response.message,type: 'success'});
              this.flushTabList();
            }else{
              this.$message.error(response.message);
            }
          }
        })
      },

      openChildreDialog(index){
        this.questionIndex = index;
        this.showAnswerDialog = false;
        this.showChildren = true;
      },
      /**打开回答框**/
      openAnswerDialog(index){
        this.fontCount = "";
        this.showAnswerDialog = true;
        this.showChildren = false;
        this.questionIndex = index;
      },
      /**提交回答**/
      submitAnswer(parentId){
        if(this.fontCount == null || this.fontCount == "" || this.fontCount == undefined){
          this.$message.error("请输入要回答的内容");
          return false;
        }
        httpTool.apiHttp({
          url: cast.apiUrl_lms + "/centerLearnCoursewareQuestion/publishQuestion",
          method: "post",
          params: {
            curriculumId: this.curriculumId,
            cswId: this.cswId,
            content: this.fontCount,
            parentId: parentId,
            chapterId: this.chapterId
          },
          page: this.notePage,
          cbfn: (response) => {
            if(response.code == cast.returnState().BIZ_SUCCESS){
              this.getQuestionByCswId();
              this.fontCount = "";
              this.showAnswerDialog = false;
              this.$message({message: response.message,type: 'success'});
            }else{
              this.$message.error(response.message);
            }
          }
        })
      },
      back2list() {
        if(this.curriculumId != null && this.curriculumId != "" && this.curriculumId != undefined){
          this.$router.push({path:'/curriculumDetail/' + this.curriculumId});
        }else{
          this.$router.push({path:'/publicDetail/' + this.cswId});
        }
      }
    },
    watch: {
      lockMyself_question: function(val){
        this.getQuestionByCswId();
      },
      lockMyself_note: function(val){
        this.getNoteByCswId();
      }
    },
    mounted(){
      this.curriculumId = this.$route.params.curriculumId;
      if(this.curriculumId == null || this.curriculumId == undefined){
        this.curriculumId == '';
      }
      this.cswId = this.$route.params.cswId;
      this.chapterId = this.$route.params.chapterId;
      this.getDetailById(this.curriculumId, this.cswId);
      this.getCommentByCswId();//默认打开评论列表
      this.contentHeight=document.documentElement.clientHeight-90;
    }
  }
</script>
