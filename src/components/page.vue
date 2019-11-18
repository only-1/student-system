<template>
	<div>
	<!-- 分页开始 -->
		<div class="wrapper studentPage">
			<el-pagination
			  background
			  layout="prev, pager, next"
        @current-change="handleCurrentChange"
        :current-page=pages.currentPage
        :page-size=pages.pageSize
        :total=pages.total>
			</el-pagination>
		</div>
		<!-- 分页结束 -->
	</div>
</template>
<script>
import '@css/reset.css'
import '@css/page.css'
	export default{
  props:{
    pages:{
        Object,
        default:function(){
          return{
             currentPage:1,
            pageSize:8,
            total:100
          
          }
        }
    }
  },
		data(){
			return{
			}
		},
    methods:{
      handleCurrentChange(val){
        this.$emit("castCurrentPage",val)
       }
    },
    mounted(){

    }
	}
</script>
