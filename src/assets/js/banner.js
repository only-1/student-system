

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
    $('.bannerList li').eq(x).css({left:1600,display:'block'}).animate({left:0},1000);
    $(".bannerDot li").css({width: 6, height:6,border: '1px solid #cccccc', marginLeft: 10,backgroundColor: '#333333'});
    $(".bannerDot li").eq(x).css({backgroundColor:'#f6a808',border:'none',width:8,height:8})
    $('.bannerList li').eq(y-1).animate({left:-1600},1000,function(){
      $(this).css({display:'none'});
      flag=true;
    })
  }
}
function rightmove(){
  if(flag){
    flag=false;
    x--;
    if(x<0){
      x=$(".bannerList").children().length-1;
    }
    $('.bannerList li').eq(x).css({left:-1600,display:'block'}).animate({left:0},1000);
    $(".bannerDot li").css({width: 6, height:6,border: '1px solid #cccccc', marginLeft: 10,backgroundColor: '#333333'});
    $(".bannerDot li").eq(x).css({backgroundColor:'#f6a808',border:'none',width:8,height:8})
    $('.bannerList li').eq(x==$(".bannerList").children().length-1?0:x+1).animate({left:1600},1000,function(){
      $(this).css({display:'none'});
      flag=true;
    })
  }
}
var t=setInterval(leftmove, 3000);
$(".bannerDot li").click(function(){
    if(flag){
      flag=false;
      clearInterval(t);
      if(x>$(this).index()){
        var y=x;
        x=$(this).index();
        $(".bannerList li").eq(x).css({left:-1600,display:"block"}).animate({left:0},1000);
        $(".bannerDot li").css({width: 6, height:6,border: '1px solid #cccccc', marginLeft: 10,backgroundColor: '#333333'});
        $(".bannerDot li").eq(x).css({backgroundColor:'#f6a808',border:'none',width:8,height:8})
        $(".bannerList li").eq(y).animate({left:1600},1000,function(){
          $(this).css({display:"none"})
          flag=true;
        });
      }else if(x<$(this).index()){
        var y=x;
            x=$(this).index();
            $(".bannerList li").eq(x).css({left:1600,display:"block"}).animate({left:0},1000);
            $(".bannerDot li").css({width: 6, height:6,border: '1px solid #cccccc', marginLeft: 10,backgroundColor: '#333333'});
            $(".bannerDot li").eq(x).css({backgroundColor:'#f6a808',border:'none',width:8,height:8})
            $(".bannerList li").eq(y).animate({left:-1600},1000,function(){
              $(this).css({display:"none"})
              flag=true;
            })
          }else{
            flag=true;
          }
          t=setInterval(leftmove,3000);
    }
})
$(".rightArrow").click(function(){
  rightmove();
})
$(".leftArrow").click(function(){
  leftmove();
})