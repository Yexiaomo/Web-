$(document).ready(function() {

	// 为了便于观察, 每个动作延迟执行 0.5s执行
	
	
	setTimeout(function (){$("#target1").css("color", "red")},1000);
	
	setTimeout(function (){$("#target1").prop("disabled", true)},1500);
	
	setTimeout(function (){$("#target4").remove()},2000);
	
	setTimeout(function (){$("#target2").appendTo("#right-well")},2500);
	
	setTimeout(function (){$("#target5").clone().appendTo("#left-well")},3000);
	
	setTimeout(function (){$("#target1").parent().css("background-color", "red")},3500);
	
	setTimeout(function (){$("#right-well").children().css("color", "orange")},4000);
	
	setTimeout(function (){$("#left-well").children().css("color", "green")},4500);
	
	setTimeout(function (){$(".target:nth-child(2)").addClass("animated bounce")},5000);
	
	setTimeout(function (){$(".target:even").addClass("animated shake")},5500);
});

//点及按钮之后将页面内的所有元素全部清除

function fun() {
	$("body").remove();
}
