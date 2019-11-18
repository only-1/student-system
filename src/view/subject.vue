<template>
  <div>
    <!-- 头部开始 -->
    <header-common></header-common>
    <!-- 头部结束 -->

    <!-- banner开始 -->
    <banner-common categoryType=6 authCode="study"
             v-on:setCategoryCode="setCategoryCode"></banner-common>
    <!-- banner结束 -->

    <!-- 条件查询开始 -->
    <div class="subjectSearch">
      <div class="wrapper clearfix especialback">
        <p class="subjectSearchTit fl">按条件查询</p>
        <div class="subjectSearchInput fr">
          <input type="text" class="fl subjectSearchInputName" placeholder="请输入名称" v-model="subjectQueryForm.coursewareName">
          <div class="subjectSearchBtn cursorPointer fl" @click="getSubjectList">
            <b class="in_display"></b>
            <span><img src="../assets/images/Search-Icon.png" alt=""></span>
          </div>
        </div>
      </div>
    </div>
    <!-- 条件查询结束 -->

    <!-- 专题分类开始 -->
    <div class="subjectClassifyTab">
      <div class="wrapper">
        <div class="subjectClassifyTabTit" >
          <ul class="subjectClassifyTabTitList fl">
            <li>专题活动</li>
          </ul>
          <div class="subjectClassifyTabTitSort fr">
            <div class="subjectClassifyTabTitSortList clearfix">
              <p class="sortName">综合排序 : </p>
              <p class="sortNew" @click="setOrderStrategy(1)">
                <em class="fontActive">最新</em>
                <i class="in_display down_active"></i>
              </p>
              <p class="sortRot" @click="setOrderStrategy(2)">
                <em>最热</em>
                <i class="in_display"></i>
              </p>
            </div>
          </div>
        </div>
        <div class="subjectClassifyTabContent">
          <ul class="subjectTabContentList clearfix">

            <li v-for="subject in subjectList" class="cursorPointer">
              <div class="subjectTabContentImg">
                <img :src="subject.imageUrl" alt="">
              </div>
              <p class="subjectTabContentTit">{{subject.name}}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- 专题分类结束 -->

    <!--分页开始-->
    <div style="margin:82px 0">
      <page v-on:castCurrentPage="getCurrentPage" :pages = "subjectPage"></page>
    </div>
    <!--分页结束-->
    <!-- 底部开始 -->
      <footer-common></footer-common>
    <!-- 底部结束 -->
  </div>
</template>

<script>
  import httpTool from '@/httptool';
  import cast from '@/cast';
  import tool from '@/utils';
  import '@css/reset.css'
  import '@css/subject.css'
  import headerCommon from '@components/header.vue'
  import bannerCommon from '@components/banner.vue'
  import footerCommon from '@components/footer.vue'
  import page from '@components/page.vue'

export default {
  components:{headerCommon,bannerCommon,footerCommon,page},
  data () {
    return {
      subjectQueryForm:{
        coursewareName:"",
      },
      subjectList:[],
      subjectPage:{
        currentPage:1,
        pageSize:8
      },
    }
  },
  methods:{
    getCurrentPage(val){
      this.subjectPage.currentPage = val;
      this.getSubjectList();
    },
    setOrderStrategy(val){
      this.subjectQueryForm.orderStrategy = val;
      this.getSubjectList();
    },
    getSubjectList(){
      httpTool.apiHttp({
        url: cast.apiUrl_lms + "/centerLearnSubject/querySubject" ,
        method: "post",
        params: this.subjectQueryForm,
        page:   this.subjectPage,
        cbfn: (response) => {
          if(response.code == cast.returnState().BIZ_SUCCESS){
            this.subjectPage = response.data.page;
            this.subjectList = response.data.data;
            for(var i=0; i<this.subjectList.length;i++){
              var coverImgId = this.subjectList[i].coverImgId;
              if(coverImgId != null && coverImgId != "" && coverImgId != undefined){
                this.subjectList[i].imageUrl = cast.apiUrl_lms + "/file/getImage/" + this.subjectList[i].coverImgId;
              }
            }
            console.log(this.subjectPage);
          }
        }
      });
    },
    setCategoryCode(val){
      this.subjectQueryForm.categoryCodeList = [];
      this.subjectQueryForm.categoryCodeList.push(val)
      this.getSubjectList();
    },
  },
  mounted(){
    this.getSubjectList();
  }
}
</script>
