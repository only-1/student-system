<template>
	<div>
    <!-- 头部开始 -->
    <header-common></header-common>
    <!-- 头部结束 -->

    <!-- banner开始 -->
    <banner-common categoryType=3 authCode="examCenter"
                   v-on:setCategoryCode="setCategoryCode"></banner-common>
    <!-- banner结束 -->

		<!-- 条件查询开始 -->
		<div class="publicSearch">
			<div class="wrapper clearfix especialback">
				<p class="searchTit fl">按条件查询</p>
				<div class="searchInput fr">
					<input type="text" v-model="queryExam.examName" class="fl" placeholder="输入考试名称进行搜索">
					<div class="searchBtn cursorPointer fl" @click="getData">
						<b class="in_display"></b>
						<span><img src="../assets/images/Search-Icon.png" alt=""></span>
					</div>
				</div>
			</div>
		</div>
		<!-- 条件查询结束 -->

		<!-- 考试开始 -->
		<div class="examTab">
			<div class="wrapper">
				<div class="examTabTit">
					<ul class="examTabTitList fl">
						<li v-bind:class="{examTabTitListSelected : this.queryExam.studyExamStatus == 1}" @click="tabClick(1)">待考试</li>
						<li v-bind:class="{examTabTitListSelected : this.queryExam.studyExamStatus == 2}" @click="tabClick(2)">未考试</li>
						<li v-bind:class="{examTabTitListSelected : this.queryExam.studyExamStatus == 3}" @click="tabClick(3)">已考试</li>
					</ul>
				</div>
				<div class="examTabCon">
					<ul class="examConList clearfix">
						<li class="toTest fl" @click='goExamDetail(exam.id)' v-for="(exam,index) in examList">
							<p class="toTestTit fl">{{index+1}} . {{exam.examName}}</p>
							<div class="fl toTestTime">
								<span class="fl clockTime">
									<img src="../assets/images/clocks.png" alt="">
								</span>
								<p class="fl timeList">
									<span class="startTime fl">{{exam.beginTime}}</span>
									<span class="separator fl"></span>
									<span class="endTime fl">{{exam.endTime}}</span>
								</p>
							</div>
						</li>
					</ul>
				</div>
        <page :pages="examPage" v-on:castCurrentPage="" style="margin-bottom: 30px;"></page>
			</div>
		</div>
		<!-- 考试结束 -->

    <!--分页结束-->
    <!-- 底部开始 -->
    <footer-common></footer-common>
    <!-- 底部结束 -->
	</div>
</template>
<script>
 	import '@css/reset.css'
	import '@css/examCenter.css'
  import page from "@components/page";
  import httpTool from '@/httptool';
  import cast from '@/cast';

  import headerCommon from '@components/header.vue'
  import bannerCommon from '@components/banner.vue'
  import footerCommon from '@components/footer.vue'
export default{
  components:{page,headerCommon,bannerCommon,footerCommon},
	data(){
		return{
      queryExam:{
        studyExamStatus:1,
        examName:'',
        examCode:'',
      },
      examList:[],
      examPage:{
        currentPage: 1,
        total:0,
        pageTotal: 0,
        pageSize: 10
      },
		}
	},
	methods:{
		goExamDetail(id){//考试详情
			this.$router.push({path:'/examDetail/'+id});
		},
    setCategoryCode(val){
		  this.queryExam.examCode=val;
		  this.getData();
    },
    getData(){//考试列表
      httpTool.apiHttp({
        url: cast.apiUrl_exam + "/centerExam/examList" ,
        method: "post",
        params:this.queryExam,
        page:   this.examPage,
        cbfn: (response) => {
          if(response.code == cast.returnState().BIZ_SUCCESS){
            this.examPage = response.data.page;
            this.examList = response.data.data;
          }
        }
      });
    },
    getCurrent(val){
      this.examPage.currentPage=val;
      this.getData();
    },
    tabClick(type){
      this.queryExam.studyExamStatus=type;
      this.getData();
    },
	},
  mounted(){
    var catecode=this.$route.params.catecode;
    if(catecode!=0){
      this.queryExam.examCode=catecode;
    }
    this.getData();
  }
}
</script>
