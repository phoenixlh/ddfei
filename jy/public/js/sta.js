window.onload = function(){
//	列表隐藏于显示
	var open = true;
	$(".ico1").click(function(){
		if(open){
			$(".di").css("display","block");
			open = false;
			
			$(".menu-item").click(function(evt){
				var e = evt || window.event;
				e.stopPropagation();
				$(".di").css("display","block");
			})
		}else{	
			$(".di").css("display","none");
			open = true;
		}
	});
	
//	tab切换
$(".dd li").click(function(){
	$(this).css("background","white")
		   .siblings()
		   .css("background","#ccc");
	$(".xx1").eq( $(this).index() ).css("display","block")
	         .siblings()
	         .css("display","none")
})

//删除
$(".del").click(function(){
	var info = "确定删除吗？";
	if(confirm(info)){
//		return true;
		$(this).parent().parent().remove();
	}else{
		return false;
	}
})


}//window大括号
