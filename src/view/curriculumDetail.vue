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
						<img :src="curriculumCoverImageUrl" alt="">
					</div>
					<div class="fl detailIntroduce">
						<p class="publicName">
							<span>课程名称 : </span>
							<i>{{curriculumDetail.name}}</i>
						</p>
						<p class="labels">
              <span class="courseBlock">
                <span>标签 : </span>
                <i>
                  <label v-for="tag in curriculumDetail.tagNameList">
                    {{tag}}
                  </label>
                </i>
              </span>
						  <span class="courseBlock">
                <span>学时 : </span>
                <i>{{(curriculumDetail.cswTime==null||curriculumDetail.cswTime=="")?0:curriculumDetail.cswTime}}</i>
              </span>
						</p>
            <p class="grade">
              <span class="courseBlock">
                <span>学分 : </span>
                <i>{{(curriculumDetail.cswScore==null||curriculumDetail.cswScore=="")?0:curriculumDetail.cswScore}}</i>
              </span>
              <span class="courseBlock">
                 <span>价格 : </span>
                 <i>{{(curriculumDetail.cswPrice==null||curriculumDetail.cswPrice=="")?0:curriculumDetail.cswPrice}}</i>
              </span>
            </p>
            <p class="grade">
              <span>有效期 : </span>
              <i>{{curriculumDetail.beginDate | formatDate('YYYY-MM-DD')}} --- {{curriculumDetail.expiryDate | formatDate('YYYY-MM-DD')}}</i>
            </p>
            <p class="grade">
							<span>评分 : </span>
							<i>{{(curriculumDetail.scope==null||curriculumDetail.scope=="")?0:curriculumDetail.scope}}</i>
						</p>
						<p class="studentUserCount">
							<span>学习人数 : </span>
							<i>{{(curriculumDetail.learnNumber==null||curriculumDetail.learnNumber=="")?0:curriculumDetail.learnNumber}}</i>
						</p>
						<div class="startStudent clearfix">
							<p class="fl startBtn" @click="toChapterPlay('')">{{learnLabel}}</p>
							<div class="fr myGrade">
								<p class="fl">我要评分</p>
                <el-rate
                  @change="scopeChange"
                  style="float: left"
                  v-model="curriculumScore.score"
                  :disabled="(curriculumScore.id !=null && curriculumScore.id != '') || curriculumScore.score < 0"
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
            <div v-html="curriculumDetail.description"></div>
					</div>
				</div>
				<div class="principal clearfix">
					<span class="fl principalPeople">负责人 : </span>
					<div class="principalName fl" v-for="principal in curriculumDetail.principalVoList">
						<div style="text-align:center;">
							<img src="../assets/images/people_01.png" alt="">
						</div>
						<p>{{principal.principalName}}</p>
					</div>
				</div>
        <div class="principal clearfix">
          <span class="fl principalPeople">讲 师 : </span>
          <div class="principalName fl" v-for="lecturer in curriculumDetail.lecturerVoList">
            <div style="text-align:center;">
              <img src="../assets/images/people_01.png" alt="">
            </div>
            <p>{{lecturer.name}}</p>
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
            <li @click="changeTab(1)" v-bind:class="{replyPitchOn : showTab.showIndex == 1}">课程内容</li>
            <li @click="changeTab(5)" v-bind:class="{replyPitchOn : showTab.showIndex == 5}">试卷</li>
            <li @click="changeTab(2)" v-bind:class="{replyPitchOn : showTab.showIndex == 2}">评论</li>
            <li @click="changeTab(3)" v-bind:class="{replyPitchOn : showTab.showIndex == 3}">问答</li>
            <li @click="changeTab(4)" v-bind:class="{replyPitchOn : showTab.showIndex == 4}">笔记</li>
          </ul>
        </div>

        <div class="respondTabCon">
          <div v-if="showTab.showIndex == 1" class="publicChapter">
              <ul class="publicChapterList">
                <li class="publicChapterLi" v-for="(courseware, coursewareIndex) in curriculumDetail.coursewareLearnVoList"  style="border-bottom: 1px dashed #d7d6d6">
                  <p class="clearfix courseTitFont" @click="toChapterPlay(courseware.coursewareId, null)">
                    <span class="fl">{{coursewareIndex+1}}、</span>
                    <span class="fl" style="margin-left: 3px;">{{courseware.coursewareName}}</span>
                  </p>
                  <ul class="courseChapterList">
                    <li class="clearfix courseChapterLi" v-for="(chapter, chapterIndex) in courseware.chapterRecordVoList">
                      <p class="clearfix courseTitFont2" @click="toChapterPlay(courseware.coursewareId, chapter.chapterId)">
                        <span class="fl">{{coursewareIndex+1}}-{{chapterIndex+1}}</span>
                        <span class="fl nameLength1" style="margin-left: 5px;">{{chapter.chapterName}}</span>
                      </p>
                    </li>
                  </ul>
                </li>
              </ul>
          </div>
          <div v-if="showTab.showIndex == 5" class="publicChapter">
            <ul class="publicChapterList">
              <li class=" curriculumChapterLi" v-for="(paper, index) in curriculumDetail.lmsCurriculumPaperVoList">
                <p class="clearfix" @click="paperExam(paper.curriculumId, paper.paperId)">
                  <span class="fl">{{index+1}}</span>
                  <span class="fl nameLength1" style="margin-left: 5px;">{{paper.name}}</span>
                  <span class="fr examMargin"> 及格分数：{{paper.examPass}}</span>
                  <span class="fr examMargin">考试次数：{{paper.examCount}} </span>
                  <span class="fr examMargin"> 时长：{{paper.examTime}}分钟</span>
                  <span  class="fr examMargin">试卷总分：{{paper.score}}</span>
                </p>
              </li>
            </ul>
          </div>
          <div v-if="showTab.showIndex != 1 && showTab.showIndex != 5">
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
          <div style="margin:82px 0" v-if="showTab.showIndex != 1 && showTab.showIndex != 5">
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
        curriculumDetail:{},
        curriculumCoverImageUrl:"",
        curriculumScore:{
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
      this.getcurriculumScopeSelf(this.id);
    },
    methods:{
      /** 详情 **/
      getDetailById(id){
        httpTool.apiHttp({
          url: cast.apiUrl_lms + "/centerLearnCurriculum/queryByCurriculumId/" + id ,
          method: "get",
          cbfn: (response) => {
            if(response.code == cast.returnState().BIZ_SUCCESS){
              this.curriculumDetail = response.data;
              this.curriculumCoverImageUrl = cast.apiUrl_lms + "/file/getImage/" + this.curriculumDetail.coverImageId;
              this.getCatetory(this.curriculumDetail.categoryId);

              var learnStatus = this.curriculumDetail.learnStatus;
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
          url: cast.apiUrl_basicsys + "/sysCategory/findParentById/7/"+categoryId,
          method: "get",
          cbfn: (response) => {
            this.categoryList = response.data;
          }
        });
      },
      /** 自己的评论的分数**/
      getcurriculumScopeSelf(id){
        httpTool.apiHttp({
          url: cast.apiUrl_lms + "/centerLearnCoursewareScore/queryScore/" + id ,
          method: "get",
          cbfn: (response) => {
            if(response.code == cast.returnState().BIZ_SUCCESS){
              this.curriculumScore = response.data;
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
              this.getcurriculumScopeSelf(this.id);
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
            curriculumId: this.id,
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
            curriculumId: this.id,
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
            curriculumId: this.id,
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
            curriculumId: this.id,
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
        var coursewareList = this.curriculumDetail.coursewareLearnVoList;
        if(coursewareList==null || coursewareList==''|| coursewareList==undefined ||coursewareList.length<=0){
          this.$message.error("没有课件内容, 无法学习");
          return false;
        }
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
      toChapterPlay(coursewareId, chapterId){
        this.goStart();
        var urlPath = this.initPlayUrl(coursewareId, chapterId);
        this.$router.push({path:urlPath});
      },
      initPlayUrl(coursewareId, chapterId){
        var urlPath = '/chapterPlay/' + this.id;
        if((coursewareId==null || coursewareId=="" ||coursewareId==undefined)
          && (chapterId==null || chapterId=="" ||chapterId==undefined)){
          //课件 章节 id 都为空 是点击了 开始(继续)学习 默认播放第一个课件的 第一个章节， 如果有学习记录 播放 最后一次的 播放记录
          var coursewareList = this.curriculumDetail.coursewareLearnVoList;
          for(var m=0; m < coursewareList.length; m++){
            var curCourseware = coursewareList[m];
            if(m == 0){
              coursewareId = curCourseware.coursewareId;
            }
            var chapterList = curCourseware.chapterRecordVoList;
            for(var i=0; i < chapterList.length; i++){
              if(i==0){//默认播放第一章节
                chapterId = chapterList[i].chapterId;
              }
              if(chapterList[i].lastLearn == 1){
                coursewareId = curCourseware.coursewareId;
                chapterId = chapterList[i].chapterId;
                break;
              }
            }
          }
        }else if(chapterId==null || chapterId=="" ||chapterId==undefined){
          //章节id 为空 点击的是播放课件 默认播放 第一个 章节 如果 这个 课件的 某个章节是 最后播放的 然后播放
          var coursewareList = this.curriculumDetail.coursewareLearnVoList;
          for(var m=0; m < coursewareList.length; m++) {
            var curCourseware = coursewareList[m];
            if (coursewareId == curCourseware.coursewareId) {
              var chapterList = curCourseware.chapterRecordVoList;
              for (var i = 0; i < chapterList.length; i++) {
                if (i == 0) {//默认播放第一章节
                  chapterId = chapterList[i].chapterId;
                }
                if (chapterList[i].lastLearn == 1) {
                  coursewareId = curCourseware.coursewareId;
                  chapterId = chapterList[i].chapterId;
                  break;
                }
              }
              break;
            }
          }
        }
        urlPath += '/'+coursewareId+"/"+chapterId;
        return urlPath;
      },
      paperExam(curriculumId, paperId){
        httpTool.apiHttp({
          url: cast.apiUrl_exam + "/centerPaper/checkAllowExam?paperId=" + paperId + "&curriculumId=" + curriculumId,
          method: "get",
          cbfn: (response) => {
            if(response.code == cast.returnState().BIZ_SUCCESS){
              this.$router.push({path:'/examOnline/'+paperId+"/"+curriculumId});
            }else{
              this.$message.error(response.message);
            }
          }
        })
      },
      back2list(categoryCode){
        if(categoryCode!=null && categoryCode!="" && categoryCode!=undefined){
          this.$router.push({path:'/curriculum/' + categoryCode});
        }else{
          this.$router.push({path:'/curriculum'});
        }
      }
    }
	}
</script>
