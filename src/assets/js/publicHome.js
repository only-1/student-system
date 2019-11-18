// $(".classifyTabTitList li").eq(0).css({borderBottom: "4px solid #f8a50b"});
// $(".classifyTabContent ul").eq(1).css({display:'none'});
// $(".classifyTabTitList li").click(function(){
// 	$(".classifyTabTitList li").css({borderBottom: "none",fontWeight:'normal'});
// 	$(this).css({borderBottom: "4px solid #f8a50b",fontWeight:'bold'});
// 	$(".classifyTabContent ul").css({display:"none"});
// 	$(".classifyTabContent ul").eq($(this).index()).css({display:"block"});
// })

layui.use('laypage', function(){
  var laypage = layui.laypage;
  
  //执行一个laypage实例
  laypage.render({
    elem: 'page', //注意，这里的 test1 是 ID，不用加 # 号
    count: 50 ,//数据总数，从服务端得到
    limit:5,
    theme:'#f7a60a',
    prev: '<em>←</em>',
    next: '<em>→</em>'
  });
});


//公开课列表样式控制
var forDom=$(".tabContentList").children();
for(var i=0;i<forDom.length;i+=4){
  forDom.eq(i).css({marginLeft:'0px'})
}

