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
