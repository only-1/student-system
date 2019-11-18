<template>
	<div>
	 <!-- banner开始 -->
		<div class="publicBanner">
		  <div class="wrapper publicBannerWapper">
		    <div class="bannerFixed">
		      <ul class="bannerFixedList">
		        <li class="fl bannerEveryOne" v-for="(category, index) in categoryList" v-if="index < 7">
		          <div class="menuOneTitle cursorPointer"  @click="setCategoryCode(category.code)">
		            <span class="in_display menuOneIcon"></span>
		            <a class="in_display menuOneTitle">
                  {{category.name.length<=10?category.name:(category.name.substring(0, 10) + suffix)}}
                </a>
		          </div>
		          <div class="menuTwoflex">
		            <ul class="menuTwoList">
		              <li class="menuTwoOption clearfix cursorPointer" v-for="categorylvl2 in category.children">
		                <span class="menuTwoTitle fl cursorPointer" @click="setCategoryCode(categorylvl2.code)">{{categorylvl2.name}}</span>
		                <div class="menuThreeflex fl">
		                  <ul class="menuThreeList fl">
		                    <li class="menuThreeOption fl" v-for="(categorylvl3, indexlvl3) in categorylvl2.children">
		                      <span class="menuThreeTitle fl cursorPointer" @click="setCategoryCode(categorylvl3.code)">
                            {{categorylvl3.name}}
                          </span>
                          <span v-if="indexlvl3 != categorylvl2.children.length - 1" style="color:#999">/</span>
		                    </li>
		                  </ul>
		                </div>
		              </li>
		            </ul>
		          </div>
		        </li>
		      </ul>
		    </div>
		    <div class="bannerArrow">
		      <i class="fl leftArrow"></i>
		      <i class="fr rightArrow"></i>
		    </div>
		    <ul class="bannerDot"></ul>
		  </div>
		  <ul class="bannerList">
		    <li><img src="../assets/images/banner_01.png" alt=""></li>
		    <li><img src="../assets/images/banner_02.png" alt=""></li>
		    <li><img src="../assets/images/banner_03.png" alt=""></li>
		  </ul>
		</div>
	 <!-- banner结束 -->
	</div>
</template>
<script>
  import httpTool from '@/httptool';
  import cast from '@/cast';
  import tool from '@/utils';

	import "@css/banner.css"
	export default{
    props:{
      categoryType: 0,
      authCode: "",
    },
		data(){
			return{
				timer:'',
        categoryList: [],
        suffix: "...",
			}
		},
    methods:{
		  setCategoryCode(val){
        this.$emit('setCategoryCode',val);
      },
		  getCategory(){
        httpTool.apiHttp({
          url: cast.apiUrl_basicsys + "/sysCategory/categoryTreeStudent" ,
          method: "post",
          params: {
            type: this.categoryType,
            authCode: this.authCode,
          },
          cbfn: (response) => {
            if(response.code == cast.returnState().BIZ_SUCCESS){
              this.categoryList =  response.data;
            }
          }
        });
      }
    },
		mounted(){
		  this.getCategory();
			//轮播
			$(".bannerList li").eq(0).css({display:'block'});
			for(var i=0;i<$(".bannerList").children().length;i++){
			  var dotLi=$("<li></li>");
			  $(".bannerDot").append(dotLi);
			}
			var w=$(".bannerList").children().length*18-5;
			$(".bannerDot").css({marginLeft:-w/2+300});
			$(".bannerDot li").eq(0).css({backgroundColor:'#f6a808',border:'none',width:8,height:8})
			var x=0,y;
			var flag=true;
			function leftmove(){
			  if(flag){
			    flag=false;
			    x++;
			    y=x;
			    if(x>$(".bannerList").children().length-1){
			      x=0;
			    }
//			    $('.bannerList li').eq(x).css({left:1600,display:'block'}).animate({left:0},1000);
			    $('.bannerList li').eq(x).fadeIn(1000);
			    $(".bannerDot li").css({width: 6, height:6,border: '1px solid #cccccc', marginLeft: 10,backgroundColor: '#333333'});
			    $(".bannerDot li").eq(x).css({backgroundColor:'#f6a808',border:'none',width:8,height:8})
//			    $('.bannerList li').eq(y-1).animate({left:-1600},1000,function(){
//			      $(this).css({display:'none'});
//			      flag=true;
//			    })
          $('.bannerList li').eq(y-1).fadeOut(1000,function(){
            $(this).css({display:'none'});
			      flag=true;
          });
			  }
			}
			function rightmove(){
			  if(flag){
			    flag=false;
			    x--;
			    if(x<0){
			      x=$(".bannerList").children().length-1;
			    }
//			    $('.bannerList li').eq(x).css({left:-1600,display:'block'}).animate({left:0},1000);
			    $('.bannerList li').eq(x).fadeIn(1000);
			    $(".bannerDot li").css({width: 6, height:6,border: '1px solid #cccccc', marginLeft: 10,backgroundColor: '#333333'});
			    $(".bannerDot li").eq(x).css({backgroundColor:'#f6a808',border:'none',width:8,height:8})
//			    $('.bannerList li').eq(x==$(".bannerList").children().length-1?0:x+1).animate({left:1600},1000,function(){
//			      $(this).css({display:'none'});
//			      flag=true;
//			    })
          $('.bannerList li').eq(x==$(".bannerList").children().length-1?0:x+1).fadeOut(1000,function(){
            $(this).css({display:'none'});
            flag=true;
          })
			  }
			}
			this.timer=setInterval(leftmove, 3000);
			$(".bannerDot li").click(function(){
			    if(flag){
			      flag=false;
			      clearInterval(this.timer);
			      if(x>$(this).index()){
			        var y=x;
			        x=$(this).index();
//			        $(".bannerList li").eq(x).css({left:-1600,display:"block"}).animate({left:0},1000);
			        $(".bannerList li").eq(x).fadeIn(1000);
			        $(".bannerDot li").css({width: 6, height:6,border: '1px solid #cccccc', marginLeft: 10,backgroundColor: '#333333'});
			        $(".bannerDot li").eq(x).css({backgroundColor:'#f6a808',border:'none',width:8,height:8})
//			        $(".bannerList li").eq(y).animate({left:1600},1000,function(){
//			          $(this).css({display:"none"})
//			          flag=true;
//			        });
              $(".bannerList li").eq(y).fadeOut(1000,function(){
                $(this).css({display:"none"})
                flag=true;
              });
			      }else if(x<$(this).index()){
			        var y=x;
			            x=$(this).index();
//			            $(".bannerList li").eq(x).css({left:1600,display:"block"}).animate({left:0},1000);
			            $(".bannerList li").eq(x).fadeIn(1000);
			            $(".bannerDot li").css({width: 6, height:6,border: '1px solid #cccccc', marginLeft: 10,backgroundColor: '#333333'});
			            $(".bannerDot li").eq(x).css({backgroundColor:'#f6a808',border:'none',width:8,height:8})
//			            $(".bannerList li").eq(y).animate({left:-1600},1000,function(){
//			              $(this).css({display:"none"})
//			              flag=true;
//			            })
                  $(".bannerList li").eq(y).fadeOut(1000,function(){
                    $(this).css({display:"none"})
                    flag=true;
                  })
			          }else{
			            flag=true;
			          }
			          this.timer=setInterval(leftmove,3000);
			    }
			})
			$(".rightArrow").click(function(){
			  leftmove();
			})
			$(".leftArrow").click(function(){
			  rightmove();
			})
		},
		beforeDestroy(){
			// 销毁组件前，清除定时器
			clearInterval(this.timer)
		}
	}
</script>
