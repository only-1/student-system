<template>
	<div>
		<!-- 面包屑开始 -->
		<div class="pageNav">
			<div class="wrapper">
				<ul class="pageNavList clearfix">
					<li class="pageNavOption fl">
						<span class="fl" @click="back2list('')">首页</span>
						<i class="fl"></i>
					</li>
					<li class="pageNavOption fl" v-for="category in categoryList">
						<span class="fl" @click="back2list(category.code)">{{category.name}}</span>
						<i class="fl"></i>
					</li>
				</ul>
			</div>
		</div>
		<!-- 面包屑结束 -->

		<!-- 公开课介绍开始 -->
		<div class="publicIntroduce" >
			<div class="wrapper">
				<div class="clearfix publicIntroduceCon">
					<div class="fl showImg">
						<img :src="openClassCoverImageUrl" alt="">
					</div>
					<div class="fl detailIntroduce">
						<p class="publicName">
							<span>课程名称 : </span>
							<i>{{openClassDetail.name}}</i>
						</p>
						<p class="MakeUser">
							<span>制作人 : </span>
							<i>{{openClassDetail.makeUser}}</i>
						</p>
						<p class="labels">
							<span>标签 : </span>
              <i>
                <label v-for="tag in openClassDetail.tagNameList">
                  {{tag}}
                </label>
              </i>
						</p>
						<p class="grade">
							<span>评分 : </span>
							<i>{{(openClassDetail.scope==null||openClassDetail.scope=="")?0:openClassDetail.scope}}</i>
						</p>
						<p class="studentUserCount">
							<span>学习人数 : </span>
							<i>{{(openClassDetail.learnNumber==null||openClassDetail.learnNumber=="")?0:openClassDetail.learnNumber}}</i>
						</p>
						<div class="startStudent clearfix">
							<p class="fl startBtn" @click="toChapterPlay('')">{{learnLabel}}</p>
							<div class="fr myGrade">
								<p class="fl">我要评分</p>
                <el-rate
                  @change="scopeChange"
                  style="float: left"
                  v-model="openClassScore.score"
                  :disabled="(openClassScore.id !=null && openClassScore.id != '') || openClassScore.score < 0"
                  :allow-half=true
                  :colors="['#99A9BF', '#F7BA2A', '#FF9900']"></el-rate>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- 公开课介绍结束 -->

		<!-- 公开课描述开始 -->
		<div class="publicDescription">
			<div class="wrapper">
				<div class="descriptionCon">
					<span class="descriptionTit in_display">公开课描述</span>
					<div class="detailDescription">
            <div v-html="openClassDetail.description"></div>
					</div>
				</div>
				<div class="principal clearfix">
					<span class="fl principalPeople">负责人 : </span>
					<div class="principalName fl" v-for="principal in openClassDetail.principalVoList">
						<div style="text-align:center;">
							<img src="../assets/images/people_01.png" alt="">
						</div>
						<p>{{principal.principalName}}</p>
					</div>
				</div>
			</div>
		</div>
		<!-- 公开课描述结束 -->

    <!-- 评论、问答、笔记开始  -->
    <div class="publicRespond">
      <div class="wrapper publicRespondWrapper">
        <div class="respondTabTit">
          <ul class="respondTabTitList clearfix">
            <!-- 选中的tab上加 replyPitchOn类-->
            <li @click="changeTab(1)" v-bind:class="{replyPitchOn : showTab.showIndex == 1}">公开课章节</li>
            <li @click="changeTab(2)" v-bind:class="{replyPitchOn : showTab.showIndex == 2}">评论</li>
            <li @click="changeTab(3)" v-bind:class="{replyPitchOn : showTab.showIndex == 3}">问答</li>
            <li @click="changeTab(4)" v-bind:class="{replyPitchOn : showTab.showIndex == 4}">笔记</li>
          </ul>
        </div>

        <div class="respondTabCon">
          <div v-if="showTab.showIndex == 1" class="publicChapter">
              <ul class="publicChapterList">
                <li class="clearfix publicChapterLi" v-for="(chapter, index) in openClassDetail.chapterRecordVoList">
                  <p class="fl chapterName1" @click="toChapterPlay(chapter.chapterId)">
                    <span class="fl">{{index+1}}</span>
                    <span class="fl nameLength1" style="margin-left: 5px;">{{chapter.chapterName}}</span>
                  </p>
                  <div class="fl chapterProgress">
                    <el-progress :percentage="(chapter.maxLength==null||chapter.maxLength=='')
                                              ?0:parseInt(chapter.currentLength*100/chapter.maxLength)">
                    </el-progress>
                  </div>
                </li>
              </ul>
          </div>
          <div v-if="showTab.showIndex != 1">
            <div class="respondBorder" v-if="showTab.showIndex != 4">
              <textarea v-model='content' maxlength="500" placeholder="请输入你的回答"></textarea>
              <span class="fontSizeCount">{{content | getLength}}/500</span>
              <div class="submitInput clearfix">
                <div class="fl" v-if="showTab.showIndex == 3">
                  <el-switch
                    v-model="lockMyself_question"
                    active-color="#f8a50b"
                    inactive-color="#d7d6d6">
                  </el-switch>
                  <span class="switchBtn">只看我的</span>
                </div>
                <div class="fl" v-if="showTab.showIndex == 4">
                  <el-switch
                    v-model="lockMyself_note"
                    active-color="#f8a50b"
                    inactive-color="#d7d6d6">
                  </el-switch>
                  <span class="switchBtn">只看我的</span>
                </div>
                <span class="fr submitBtn" @click="publishComment">{{btnTitle}}</span>
              </div>
            </div>
            <div class="reviewList">
              <ul class="reviewListUl">
                <li class="reviewListLi" v-for="(record, index) in queryList">
                  <div class="reviewContent clearfix">
                    <span class="reviewHead fl"></span>
                    <div class="reviewDetail fl">
                      <span class="reviewName">发表人名称 : {{record.userName}}</span>
                      <span class="reviewSource" v-if="record.chapterName!=null&&record.chapterName!=''&&record.chapterName!=undefined">
                        源自 : {{record.chapterName}}
                      </span>
                      <p class="reviewFontSize">{{record.comment}}</p>
                    </div>
                  </div>
                  <div class="reviewCount" v-if="showTab.showIndex == 3">
                    <!-- 数量小于三位数用 reviewLessThree类   大于三位数用greaterThree 类 -->
                    <span class="greaterThree in_display"  @click='openChildreDialog(index)'>{{record.children==null?0 : record.children.length}}</span>
                    <span class="reviewDisplayBlock">回答 | </span>
                    <span class="myReview" @click="openAnswerDialog(index)">我要回答</span>
                    <div class="clearfix" v-if='showAnswerDialog && index == questionIndex'>
                      <div class="myReviewBox fr">
                        <div class="triangleIcon"></div>
                        <textarea v-model='fontCount' maxlength="500"  placeholder="请输入你的回答"></textarea>
                        <span class="myReviewCount">{{fontCount | getLength}}/500</span>
                        <p class="myReviewBoxBtn">
                          <span class="myReviewTrue in_display" @click="submitAnswer(record.id)">回答</span>
                          <span class="myReviewFalse in_display" @click="showAnswerDialog=false">取消</span>
                        </p>
                      </div>
                    </div>
                    <div class="clearfix" v-if='record.children !=null && record.children.length > 0 && showChildren && index == questionIndex'>
                      <div class="reviewReply fr">
                        <div class="reviewTriangleIcon"></div>
                        <i class='reviewReplyClose in_display' @click="showChildren=false"></i>
                        <ul class="reviewReplyList">
                          <li class="clearfix reviewReplyLi" v-for="answer in record.children">
                            <span class="fl reviewReplyHead"></span>
                            <div class="fl reviewReplyDetail">
                              <span class="reviewReplyName fl">回答人的名称 : {{answer.userName}}</span>
                              <p class="reviewReplyContent fl">{{answer.comment}}</p>
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
    <!-- 评论、问答、笔记结束  -->
	</div>
</template>
<script>
  import httpTool from '@/httptool';
  import cast from '@/cast';
  import tool from '@/utils';
  import page from '@components/page.vue'

	import '@css/reset.css'
	import '@css/publicDetail.css'
	export default{
    components:{page},
    filters:{
      getLength(val){
        return val.length
      }
    },
		data(){
			return{
        learnLabel:"",
        id:null,
        openClassDetail:{},
        openClassCoverImageUrl:"",
        openClassScore:{
          score:3.8,
        },
        categoryList: [],

        lockMyself_question:true,
        lockMyself_note:true,
        showTab:{
          showIndex: 1,
        },
        btnTitle:"发表评论",
        queryList:[],//查詢出來的 评论，问答，笔记
        content:"", //内容
        fontCount:'',

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
        showAnswerDialog:false,
        questionIndex:0,
        showChildren: false,
        notePage:{
          currentPage:1,
          pageSize:10,
        },
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
      this.id = this.$route.params.id;
      this.getDetailById(this.id);
      this.getOpenClassScopeSelf(this.id);
    },
    methods:{
      /** 详情 **/
      getDetailById(id){
        httpTool.apiHttp({
          url: cast.apiUrl_lms + "/centerLearnCoursewareRecord/queryById/" + id ,
          method: "get",
          cbfn: (response) => {
            if(response.code == cast.returnState().BIZ_SUCCESS){
              this.openClassDetail = response.data;
              this.openClassCoverImageUrl = cast.apiUrl_lms + "/file/getImage/" + this.openClassDetail.coverImageId;
              this.getCatetory(this.openClassDetail.categoryId);

              var learnStatus = this.openClassDetail.learnStatus;
              if(learnStatus == '' || learnStatus == cast.LEARN_STATUS_0){
                this.learnLabel = "开始学习";
              }else if(learnStatus == cast.LEARN_STATUS_1){
                this.learnLabel = "继续学习";
              }
            }
          }
        });
      },
      /** 获取分类 分支**/
      getCatetory(categoryId){
        httpTool.apiHttp({
          url: cast.apiUrl_basicsys + "/sysCategory/findParentById/5/"+categoryId,
          method: "get",
          cbfn: (response) => {
            this.categoryList = response.data;
          }
        });
      },
      /** 自己的评论的分数**/
      getOpenClassScopeSelf(id){
        httpTool.apiHttp({
          url: cast.apiUrl_lms + "/centerLearnCoursewareScore/queryScore/" + id ,
          method: "get",
          cbfn: (response) => {
            if(response.code == cast.returnState().BIZ_SUCCESS){
              this.openClassScore = response.data;
            }
          }
        });
      },
      /**保存分数***/
      scopeChange(val){
        httpTool.apiHttp({
          url: cast.apiUrl_lms + "/centerLearnCoursewareScore/score" ,
          method: "post",
          params:{
            cswId: this.id,
            score: val,
          },
          cbfn: (response) => {
            if(response.code == cast.returnState().BIZ_SUCCESS){
              this.getDetailById(this.id);
              this.getOpenClassScopeSelf(this.id);
            }else{
              this.$message.error(response.message);
            }
          }
        });
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
          case 2: this.getCommentByCswId(); this.btnTitle="发表评论"; break;
          case 3: this.getQuestionByCswId(); this.btnTitle="我要提问"; break;
          case 4: this.getNoteByCswId(); this.btnTitle="保存笔记"; break;
        }
      },
      /** 获取评论list **/
      getCommentByCswId(){
        httpTool.apiHttp({
          url: cast.apiUrl_lms + "/centerLearnCoursewareComment/queryCourseware",
          method: "post",
          params: {
            cswId: this.id,
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
            cswId: this.id,
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
            cswId: this.id,
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
      ////发布
      publishComment(){
        var url = "";
        var title = "";
        switch(this.showTab.showIndex){
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
        if(this.content == null || this.content == "" || this.content == undefined){
          this.$message.error("请输入"+title+"内容");
          return false;
        }
        httpTool.apiHttp({
          url: url,
          method: "post",
          params: {
            cswId: this.id,
            content: this.content,
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
            cswId: this.id,
            content: this.fontCount,
            parentId: parentId,
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
      /** 开始学习 **/
      goStart(){
        httpTool.apiHttp({
          url: cast.apiUrl_lms + "/centerLearnCoursewareRecord/goStart",
          method: "post",
          params: {
            id: this.id,
          },
          cbfn: (response) => {
            //this.toChapterPlay(null);
          }
        });
      },
      /*跳转到播放页面*/
      toChapterPlay(chapterId){
        this.goStart();
        if(chapterId==null || chapterId=="" ||chapterId==undefined){
          //章节id 为空 跳转默认章节
          var chapterList = this.openClassDetail.chapterRecordVoList;
          for(var i=0; i < chapterList.length; i++){
            if(i==0){//默认播放第一章节
              chapterId = chapterList[i].chapterId;
            }
            if(chapterList[i].lastLearn == 1){
              chapterId = chapterList[i].chapterId;
              break;
            }
          }
        }
        this.$router.push({path:'/chapterPlay/'+this.id+'/'+ chapterId});
      },
      back2list(categoryCode){
        if(categoryCode!=null && categoryCode!="" && categoryCode!=undefined){
          this.$router.push({path:'/studentCenter/' + categoryCode});
        }else{
          this.$router.push({path:'/studentCenter'});
        }
      }
    }
	}
</script>
