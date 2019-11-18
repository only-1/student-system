<template>
	<div>
		<!-- 头部开始 -->
		<div class="header">
		  <div class="wrapper clearfix headerWrapper">
		    <div class="fl headerlogo">
		      <a href="javascript:void(0)" class="in_display"><img src="../assets/images/logo.png" alt=""></a>
		    </div>
		    <div class="fl headerIndex">
		      <ul class="headerList fl"> 
				<li class="headerListFirst" :class="{headerActive:this.headerActive==1}" @click="getPageIndex(1)">
					<a>首页</a>
				</li>
		        <li class="studentCenter" :class="{headerActive:this.headActive == 2}" @click="getPageIndex(2)">
		          <a>学习中心</a>
		          <div class="studentList">
		            <p @click="goOpenClass">公开课</p>
                <p @click="goCurriculum">课程</p>
		            <p @click="goSubject">专题活动</p>
		          </div>
		        </li>
		        <li :class="{headerActive:this.headActive == 3}" @click="getPageIndex(3)">
		          <a>实战演练</a>
		        </li>
		        <li :class="{headerActive:this.headActive == 4}" @click="getPageIndex(4)">
		          <a @click='goExamCenter'>考试中心</a>
		        </li>
		        <li :class="{headerActive:this.headActive == 5}" @click="getPageIndex(5)">
		          <a>问卷调查</a>
		        </li>
		        <li :class="{headerActive:this.headActive == 6}" @click="getPageIndex(6)">
		          <a>学习社区</a>
		        </li>
		        <li :class="{headerActive:this.headActive == 7}" @click="getPageIndex(7)">
		          <a>其他</a>
		        </li>
		        <li :class="{headerActive:this.headActive == 8}" @click="getPageIndex(8)">
		          <a>登录</a>
		        </li>
            <li :class="{headerActive:this.headActive == 9}" @click="getPageIndex(9)">
              <a>注册</a>
            </li>
		      </ul>
		    </div>
		  </div>
		</div>
		<!-- 头部结束 -->
	</div>
</template>
<script>
	import "@css/header.css"
	export default{
		data(){
			return{
        headActive:1
			}
		},
		methods:{
	  		getPageIndex(val){
		 	this.headerActive=val;
	  },
	  goOpenClass(){
		  this.$router.push({path:'/studentCenter'})
	  },
      goCurriculum(){
        this.$router.push({path:'/curriculum'})
      },
			goSubject(){
				this.$router.push({path:'/subject'})
			},
      goExamCenter(){
        this.$router.push({path:'/examCenter/0'})
      },
		}
	}
</script>
