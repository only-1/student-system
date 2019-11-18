<template>
  <div>
    <!-- 头部开始 -->
    <header-common></header-common>
    <!-- 头部结束 -->

    <!-- banner开始 -->
    <banner-common categoryType=5 authCode="study"
                   v-on:setCategoryCode="setCategoryCode"></banner-common>
    <!-- banner结束 -->

    <!-- 条件查询开始 -->
    <div class="publicSearch">
      <div class="wrapper clearfix especialback">
        <p class="searchTit fl">按条件查询</p>
        <div class="searchInput fr">
          <input type="text" class="fl searchInputName" placeholder="请输入名称" v-model="openClassQueryForm.coursewareName">
          <el-select v-model="openClassQueryForm.learnStatus" placeholder="状态" class="fl" :clearable=true>
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <div class="searchBtn cursorPointer fl" @click="getOpenClassList">
            <b class="in_display"></b>
            <span><img src="../assets/images/Search-Icon.png" alt=""></span>
          </div>
        </div>
      </div>
    </div>
    <!-- 条件查询结束 -->

    <!-- 课程分类开始 -->
    <div class="publicClassifyTab">
      <div class="wrapper">
        <div class="classifyTabTit" >
          <ul class="classifyTabTitList fl">
            <li>公开课</li>
            <!-- <li class="classifyTabTitMargin">分类</li> -->
          </ul>
          <div class="classifyTabTitSort fr">
            <div class="classifyTabTitSortList clearfix">
              <p class="sortName">综合排序 : </p>
              <p class="sortNew" @click="setOrderStrategy(1)">
                <em :class="fontBold1">最新</em>
                <i class="in_display down_active"></i>
              </p>
              <p class="sortRot" @click="setOrderStrategy(2)">
                <em :class="fontBold2">最热</em>
                <i class="in_display"></i>
              </p>
            </div>
          </div>
        </div>
        <div class="classifyTabContent">
          <ul class="tabContentList clearfix">

            <li v-for="openClass in openClassList" class="cursorPointer">
              <div class="tabContentImg" @click='goPublicDetail(openClass.id)'>
                <img :src="openClass.imageUrl" alt="">
                <div class="everyOneDetail">
                  <p class="studentState fl">
                    <span class="notLearn">
                      {{openClass.learnStatus===2?'已学习':(openClass.learnStatus===1?'学习中':'未学习')}}
                    </span>
                  </p>
                  <p class="studentGrade fl">
                    <span>课程评分:</span>
                    <i> {{(openClass.scope==null||openClass.scope=="")?0:openClass.scope}}</i>
                  </p>
                  <p class="studentCount fr">
                    <span class="in_display">
                      <img src="../assets/images/people_count.png" alt="">
                    </span>
                    <i> {{(openClass.learnNumber==null||openClass.learnNumber=="")?0:openClass.learnNumber}}</i>
                  </p>
                </div>
              </div>
              <p class="tabContentTit" @click='goPublicDetail(openClass.id)' :title="openClass.coursewareName">{{openClass.coursewareName}}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- 课程分类结束 -->

    <!--分页开始-->
    <div style="margin:82px 0">
      <page v-on:castCurrentPage="getCurrentPage" :pages = "openClassPage"></page>
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
  import '@css/studentCenter.css'
  import headerCommon from '@components/header.vue'
  import bannerCommon from '@components/banner.vue'
  import footerCommon from '@components/footer.vue'
  import page from '@components/page.vue'

export default {
  components:{headerCommon,bannerCommon,footerCommon,page},
  data () {
    return {
      fontBold1:'fontActive1',
      fontBold2:'',
      openClassQueryForm:{
        coursewareName:"",
      },
      openClassList:[],
      openClassPage:{
        currentPage:1,
        pageSize:8
      },
      options: [{
        value: '0',
        label: '未学习'
      }, {
        value: '1',
        label: '学习中'
      }, {
        value: '2',
        label: '已完成'
      }],
      value: ''
    }
  },
  methods:{
    getCurrentPage(val){
      this.openClassPage.currentPage = val;
      this.getOpenClassList();
    },
    setOrderStrategy(val){
      if(val==1){
        this.fontBold1='fontActive1';
        this.fontBold2='';
      }else{
        this.fontBold2='fontActive2';
        this.fontBold1='';
      }
      this.openClassQueryForm.orderStrategy = val;
      this.getOpenClassList();
    },
    setCategoryCode(val){
      this.openClassQueryForm.categoryCodeList = [];
      this.openClassQueryForm.categoryCodeList.push(val)
      this.getOpenClassList();
    },
    getOpenClassList(){
      httpTool.apiHttp({
        url: cast.apiUrl_lms + "/centerLearnCoursewareRecord/queryCourseware" ,
        method: "post",
        params: this.openClassQueryForm,
        page:   this.openClassPage,
        cbfn: (response) => {
          console.log(response)
          if(response.code == cast.returnState().BIZ_SUCCESS){
            this.openClassPage = response.data.page;
            this.openClassList = response.data.data;
            for(var i=0; i<this.openClassList.length;i++){
              this.openClassList[i].imageUrl = cast.apiUrl_lms + "/file/getImage/" + this.openClassList[i].coverImageId;
            }
          }
        }
      });
    },
    goPublicDetail(id){
      this.$router.push({path:'/publicDetail/' + id});
      this.$router.push({path:'/publicDetail/'+id})
    },
  },
  mounted(){
    var categoryCode = this.$route.params.categoryCode;
    if(categoryCode!=null && categoryCode!='' && categoryCode!=undefined){
      this.setCategoryCode(categoryCode);
    }else{
      this.getOpenClassList();
    }
  }
}
</script>

<style scoped>

</style>
