window.onload = function(){
	var open = true;
	$(".ico1").click(function(){
		if(open){
			$(".di").css("display","block");
			open = false;
		}else{	
			$(".di").css("display","none");
			open = true;
		}
	})
}
