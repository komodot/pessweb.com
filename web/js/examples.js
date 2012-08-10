// jqpanles examples
$(document).ready(function(){
	$('.slide1').slidePanel();				
	$('.slide2').slidePanel({target:'.target_2'});				
	$('.slide3').slidePanel({status:'open'});	
	$('.slide5').slidePanel({target:'.target5'});		
	$('.dep1').slidePanel({status:'open', role:'dep'});	
	$('.dep2').slidePanel({role:'dep'});			
	$('.master').slidePanel({status:'open',role:'master'});		
	$('.acc').slidePanel({role:'accordion'});	
	$('.slide4').slidePanel({remote:'true'});		
	
	// ajaxContent Examples
	$('.ajax').ajaxContent();
		$('.ajax2').ajaxContent({
			event:'mouseover',
			target:'#ajaxContent2'
		});
		$('.ajax3').ajaxContent({
			loaderType:'img',
			loadingMsg: 'jquery/loading.gif',
			target:'#ajaxContent3'
		});
		$('.ajax4').ajaxContent({
			target:'#ajaxContent4',
			currentClass:"current",
			success: function(obj,target,msg){
			 alert($(obj).attr('class'));
			 }	
		});
		$('.ajax5').ajaxContent({
			target:'#ajaxContent5',
			beforeSend:function(obj,target){
				alert('I am an ajaxContent link with classes:' + $(obj).attr('class') + "\n"  + 'and my target has id:' +  $(target).attr('id'));
			},
			success: function(obj,target,msg){
				 $(obj).css({color: 'blue'});
			 	$(target).css({border:'7px solid blue'});
			 },
			 error: function(target){
			 	$(target).css({color: 'red',fontSize:'24px',border:'3px dotted #FF0000'});
			 },
			 errorMsg:'Something went wrong'
		});
		$('.ajax6').ajaxContent({
			target:'#ajaxContent6',
			debug: 'true'		
		});
		$('.ajax7').ajaxContent();
		
		$('.ajax8').ajaxContent({
			target:'#ajaxContent8',
			extend:'true',
			filter:'.ajaxLoad',
			ex_target:'#ajaxContent9'
		});
		
		$('.ajax9').ajaxContent({
			target:'#ajaxContent10',
			extend:'true',
			filter:'.ajaxLoad',
			ex_target:'#ajaxContent11',
			ex_loadingMsg:'This is a personalized loading message set by ex_loadingMsg option',
			ex_beforeSend:function(obj,target){
				alert('ex_beforeSend option callback');
			},
			ex_success:function(obj,target,msg){
				alert('ex_success option callback. The target background will now become red');
				$(target).css({backgroundColor:'red'});
			}
		});
		$('.ajax10').ajaxContent({
			target:'#ajaxContent12',
			bind:'#name,#secondName,#dog,#cat,#sport'
		});
		$('.ajax11').ajaxContent({
			target:'#ajaxContent13',
			extend:'true',
			filter:'.ajaxLoad',
			ex_target:'#ajaxContent14',
			ex_loadingMsg:'Custom loading message for the extended div',
			ex_bind: '#pic'
		});
});				