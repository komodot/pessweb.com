/**
 * Sliding Panles 1.0.2 - jQuery plugin for accessible, unobtrusive Sliding Panels
 * @requires jQuery 1.2.1
 *
 * http://www.andreacfm.com/jquery-plugins
 *
 * Copyright (c) 2007 Andrea Campolonghi (andreacfm.com)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */
/**
 * The underlying HTML has to look like this:
 *
 * <p>Some Text</p>
 * <div> Text in the sliding Panel</div>
 *
 * The element can be any html valid element. By default the plugin looks for the very next 
 * element to be identify as the TARGET element. 
 *
 * @example $('.slide').slidePanel();
 * @desc Create the default panel with the target element closed in the load. 
 * <p class="slide">Some Text</p>
 * <div> Text in the sliding Panel</div>
 *
 * @example  $('.slide').slidePanel({status:'open', target:'#myTarget#'});
 * @desc The target element will be displayed opened onLoad and will be idetified by the ID myTarget
 *		and not by being the very next element
 * 		<p class="slide">Some Text</p>.................
 * 		<h4 id="myTarget"> Text in the sliding Panel</div>
 *
 * @example  $('.slide').slidePanel({remote:'true'});
 * @desc text is loaded via Ajax. The panel element must be provide of an a Child with the href
 * 	used by the ajax call.
 * 		<p class="slide"><a href="../Slider Panels - jqpanels/jquery/text.htm">Some Text</a></p>
 * 		<div></div>
 *
 * @option String status 		default:closed. Attr: open. 
 *								Target element will be hide or not on load
 * @option $selector target  	Default: next. Attr: any jQuery valid selector. 
 *								Identify the target element.
 * @option boolean remote 		Default:false.
 *                              Target element is poulated by Ajax call.
 *								If element status is 'open' the call is made on load, else is made at the first 
 *								click event.
 *								The panel element must have a child A element with the href used to make the call.
 *								This makes panels completely unbintrusive.
 *@option string role 			Default:normal.
 *                              Render dependant element in motion on call of a master element.
 *								Set role:'dep' for dependant and role:'master' for the main element.
 *								Master element must be one and must be declared after all the dependant.
 *								Single element preserve their own settings as individual panels with the follwing
 *								limitations regarding Ajax content:
 *								On dependant target element the Ajax loading can be set but will not be fired from the "master" click,
 *								will respond on his own element click.
 *								On Master target element no ajax content loading is allowed.
 

 * @type jQuery
 * @name slidingPanels
 * @author Andrea Campolonghi/andrea@andreacfm.com
 */
var $panArray;
var $targArray;
var $panAcc;

jQuery.fn.slidePanel = function(parameters){
	settings = {
		status: 'closed',
		speed: 'normal',
		target: 'next',
		remote:'false',
		role:'normal'
		};
	//extend settings in jQuery object
	jQuery.extend(settings, parameters);
	
	//Initialize any panel and keep chinable
		return this.each(function(){
			var $panel = $(this);
			//set target variable to the required target panel, default is next
			if (settings.target == 'next'){
					var $target = $panel.next();
				}
				else{
					var $target = $(settings.target);
				}
					
				//Add general class to panel element
				//if target start closed add the .panel-closed class			
			if (settings.status == 'closed'){
					$target.addClass('panel-target panel-closed');
					$panel.addClass('panel panel-up');
				}
				else{
					$target.addClass('panel-target');
					$panel.addClass('panel panel-down');
							
				}
			if(settings.role == 'accordion'){
						panelAcc($target);
						if($panAcc.length == '1'){
							$panAcc[0].removeClass('panel-closed');
							}												
						$panel.click(function(){
							for (var j = 0; j < $panAcc.length; j++){
								if($panAcc[j] != $target){
									$panAcc[j].slideUp();
									$panAcc[j].prev().removeClass('panel-down').addClass('panel-up');
								 }			
								}
								$target.slideDown();
								$target.prev().addClass('panel-down').removeClass('panel-up');							
							});							
					
			}					
			// if Role is Master bind the function to the master panel click	
			else if (settings.role == 'master'){
						$panel.click(function(){
							$target.slideToggle(settings.speed);//make the master element sliding					
							for (var i = 0; i < $targArray.length; i++){						
								$targArray[i].slideToggle();//the dep element toogle on master click
							}	
							//preserve the class to the dependent panel element for graphic display
							for (var i = 0; i < $panArray.length; i++){
								if(	$panArray[i].hasClass('panel-down')){
										$panArray[i].addClass('panel-up').removeClass('panel-down');
									}
									else{
								$panArray[i].addClass('panel-down').removeClass('panel-up');
								}
							}	
						});
				}
				else
				{
				
				//if Ajax with opened starting status fire the calling onLoad
				if(settings.remote == 'true' && settings.status != 'closed'){
					var page = $panel.children().filter('a').eq(0).attr('href');
					$target.load(page);
				}
				//if role is dep add element to a repository Array	
				if (settings.role == 'dep'){		
					panelAssets($panel,$target);
				}
			
				//bind the click required event				
				$panel.click(function(){
						//if is ajax check if content has allready been loaded
						if(settings.remote == 'true'){
							var txt = $target.text();
								if(txt.length == '0'){
									var $a = $panel.children().filter('a').eq(0);
									var exText = $a.text();
									$a.text('Loading....');
										var page = $panel.children().filter('a').attr('href');
											$target.load(page, function(){
												$a.text(exText);
											});	
								}
						}
				$target.slideToggle(settings.speed);
				$panel.toggleClass('panel-down');
				$panel.toggleClass('panel-up');
				return false;
			});
		   }	
		});				
	//repository Array for depending element		
	function panelAssets(elem,elem1){
		if ($panArray == undefined && $targArray == undefined){
				$panArray = [];
				$panArray[0] = elem;
				$targArray = [];
				$targArray[0] = elem1;				
			}
			else{
				$panArray[$panArray.length] = elem;
				$targArray[$targArray.length] = elem1;
		}
	}		
	//repository Array for depending element		
	function panelAcc(elem){
		if ($panAcc == undefined){
				$panAcc = [];
				$panAcc[0] = elem;
			}
			else{
				$panAcc[$panAcc.length] = elem;
		}
	}		
}