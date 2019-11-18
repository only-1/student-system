
            	$("#public_banner li").eq(0).css({display:"block"});   
            	for(var i=0;i<$("#public_banner").children().length;i++){
            		var dot_li=$("<li></li>")
            		$("#public_banner_dot").append(dot_li);
            	}
            		var w=$("#public_banner").children().length*65-23;
            		$("#public_banner_dot").css({marginLeft:-w/2+300});
            	$("#public_banner_dot li").eq(0).css({backgroundPosition:"0px 0px"})
            	var x=0,y;
            	var flag=true;
            	function leftmove(){
            		if (flag) {
            			flag=false;
            			x++;
            			y=x;
            			if(x>$("#public_banner").children().length-1){
            				x=0;
            			}
            			$("#public_banner li").eq(x).css({left:1200,display:"block"}).animate({left:0},1000);
            			$("#public_banner_dot li").css({backgroundPosition:"-22px 0px"});
            			$("#public_banner_dot li").eq(x).css({backgroundPosition:"0px 0px"});
            			$("#public_banner li").eq(y-1).animate({left:-1200},1000,function(){
            				$(this).css({display:"none"})
            				flag=true;
            			});
            		};
            	}
            		var t=setInterval(leftmove,3000);
            		$("#public_banner_dot li").click(function(){
            			if (flag) {
            				flag=false;
            				clearInterval(t);
            				if (x>$(this).index()) {
            					var y=x;
            					x=$(this).index();
            					$("#public_banner li").eq(x).css({left:-1200,display:"block"}).animate({left:0},1000);
            					$("#public_banner_dot li").css({backgroundPosition:"-22px 0px"});
            					$("#public_banner_dot li").eq(x).css({backgroundPosition:"0px 0px"});
            					$("#public_banner li").eq(y).animate({left:1200},1000,function(){
            						$(this).css({display:"none"})
            						flag=true;
            					});
            				}else if(x<$(this).index()){
            					var y=x;
            					x=$(this).index();
            					$("#public_banner li").eq(x).css({left:1200,display:"block"}).animate({left:0},1000);
            					$("#public_banner_dot li").css({backgroundPosition:"-22px 0px"});
            					$("#public_banner_dot li").eq(x).css({backgroundPosition:"0px 0px"});
            					$("#public_banner li").eq(y).animate({left:-1200},1000,function(){
            						$(this).css({display:"none"})
            						flag=true;
            					})
            				}else{
            					flag=true;
            				}
            				t=setInterval(leftmove,3000);
            			}
            		});