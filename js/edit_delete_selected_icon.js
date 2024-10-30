var $j=jQuery;
jQuery(document).ready(function() {
		
		// Declare window variable
		var this_advlink_window = top.tinymce.activeEditor;
		//Get node
		nodeSelection = this_advlink_window.selection.getNode();
		
		//Display thumbnail preview (number of parents depends on what exactly was selected
		if ($j(nodeSelection).hasClass("glyph")){
		var get_node = nodeSelection;
		var get_node_span = $j(nodeSelection).find("span");
		var get_node_classes = $j(get_node).attr('class');
		
		
		}
		else if ($j(nodeSelection).parent().hasClass("glyph")){
		var get_node = $j(nodeSelection).parent();
		var get_node_span = nodeSelection;
		var get_node_classes = $j(get_node).attr('class');
			
		}
		else if ($j(nodeSelection).parent().parent().hasClass("glyph")){
		var get_node = $j(nodeSelection).parent().parent();
		if ($j(nodeSelection).parent().attr("href")){
			var get_node_span = nodeSelection;
		}
		else{			
		var get_node_span = $j(nodeSelection).parent();
		}
		var get_node_classes = $j(get_node).attr('class');
		}
		//get href & target if exists
		if ($j(get_node_span).parent().attr("href")){
			//get the node's initial link
			var the_node_link = $j(get_node_span).parent().attr('href');		
			//get the node's initial target (for link)
			var the_node_target = $j(get_node_span).parent().attr('target');
		}
	
		//get the node's initial glyph class
		var the_node_glyph = $j(get_node_span).attr("class");	 
		$j("#popup-icon-thumbnail").html('<div class="'+ get_node_classes + '"><span class="'+the_node_glyph+'"><br/></span></div>');
		
		
		////INPUT FIELDS////
		//put href link in input field
		if(the_node_link != 'undefined') {
			$j('#icon_input_link').val(the_node_link);
		}
		//put target class in input field
		if(the_node_target != 'undefined') {
			$j('#icon_input_target').val(the_node_target);
		}
		//put glyph class in input field
		if(the_node_link != 'undefined') {
			$j('#icon_input_glyph').val(the_node_glyph);
		}
		
		
		//the vars
		var split_classes = get_node_classes.split(/\s/); 
		
		
		var the_node_color=split_classes[0];//gets the first class
		the_node_color=the_node_color.slice(13, - 6);//shave off lendpawcolor- and -bgset/-fgset
		//var the_node_colorset=the_node_color
		var the_node_size="";
		var the_node_colorset="";
		var the_node_shape="";	
		var the_node_alignment="";
		var the_node_hoverstyle="";	
		var new_node_classes="";
		var final_new_node="";	
		
		
		//the functions
		var getInitialSize=function(){
		if (get_node_classes.indexOf("lendpawsize-xlarge")>=0){the_node_size="lendpawsize-xlarge";$j('#icon-section-size li.url-icon-xlarge').addClass('active');}
		else if (get_node_classes.indexOf("lendpawsize-large")>=0){the_node_size="lendpawsize-large";$j('#icon-section-size li.url-icon-large').addClass('active');}
		else if (get_node_classes.indexOf("lendpawsize-medium")>=0){the_node_size="lendpawsize-medium";$j('#icon-section-size li.url-icon-medium').addClass('active');}
		else if (get_node_classes.indexOf("lendpawsize-small">=0)){the_node_size="lendpawsize-small";$j('#icon-section-size li.url-icon-small').addClass('active');}
		else if (get_node_classes.indexOf("lendpawsize-xsmall")>=0){the_node_size="lendpawsize-xsmall";$j('#icon-section-size li.url-icon-xsmall').addClass('active');}	
	  }
	  
	    var getInitialShape=function(){
		if (get_node_classes.indexOf("lendpawshape-square")>=0){
			the_node_shape="lendpawshape-square";$j('#icon-section-shape li.select-square-icon').addClass('active');	
			the_node_colorset="-bgset";	$j('#icon-section-type li.select-colored-bg').addClass('active');	
			}
		else if (get_node_classes.indexOf("lendpawshape-circle")>=0){
			the_node_shape="lendpawshape-circle";$j('#icon-section-shape li.select-circle-icon').addClass('active');	
			the_node_colorset="-bgset";	$j('#icon-section-type li.select-colored-bg').addClass('active');	
			}
		else {
		the_node_shape="";
		the_node_colorset="-fgset";$j('#icon-section-type li.select-colored-fg').addClass('active');	
		$j("#icon-section-shape").addClass("option-section-disabled");	
		}
	  }
	  
	   var getInitialAlignment=function(){
		if (get_node_classes.indexOf("alignleft")>=0){the_node_alignment="alignleft";$j('#icon-section-alignment li.select-alignleft').addClass('active');}
		else if (get_node_classes.indexOf("aligncenter")>=0){the_node_alignment="aligncenter";$j('#icon-section-alignment li.select-aligncenter').addClass('active');}
		else if (get_node_classes.indexOf("alignright")>=0){the_node_alignment="alignright";$j('#icon-section-alignment li.select-alignright').addClass('active');}
		else if (get_node_classes.indexOf("alignnone")>=0){the_node_alignment="alignnone";$j('#icon-section-alignment li.select-alignnone').addClass('active');}
	  }
	  
	  var getInitialColor=function(){
		var defaultcolorli= "#url-icon-colors li.lendpawcolor-"+the_node_color+"-bgset";
		$j(defaultcolorli).addClass("active");
	  }
	  
	  var getInitialHoverStyle=function(){
		  if (get_node_classes.indexOf("coloronhover")>=0){the_node_hoverstyle="hoverme coloronhover";$j('#icon-section-colorhoverlink #color-onlyhover').prop("checked", true);}
		  else if (get_node_classes.indexOf("hoverme")>=0){the_node_hoverstyle="hoverme";}
		  else {the_node_hoverstyle="";$j('#icon-section-hoverlink #disable-hover').prop("checked", true);$j("#icon-section-colorhoverlink").hide();}
		  
	  }
		
		//call functions
		getInitialSize();
		getInitialShape();
		getInitialAlignment();
		getInitialColor();
		getInitialHoverStyle();
		
		var reconstructClasses=function(){
		////RECONSTRUCT CLASSES	////
		new_node_classes="";
		//color class		
		new_node_classes += "lendpawcolor-" + the_node_color + the_node_colorset + " ";

		//shape class		
		new_node_classes += the_node_shape + " ";
		//size class		
		new_node_classes += the_node_size + " ";		
		//alignment class		
		new_node_classes += the_node_alignment + " ";
		
		
		//Update Link from input value		
		the_node_link=$j('#icon_input_link').val();
		
		//Update Target from input value		
		the_node_target=$j('#icon_input_target').val();
		
		//Update Glyph from input value		
		the_node_glyph=$j('#icon_input_glyph').val();
		
		//construct span with/without link
		if (the_node_link!="" && the_node_link != 'undefined'){
		var the_node_divInner='<a href="'+the_node_link+'" target="'+the_node_target+'"><span class="'+the_node_glyph+'"><br/></span></a>';
		}
		else{
		var the_node_divInner='<span class="'+the_node_glyph+'"><br/></span>';
		}
		
		new_node_classes += "glyph ";
		new_node_classes += the_node_hoverstyle;//last set of classes so no space afterwards
		
		final_new_node='<div class="'+ new_node_classes + '">' + the_node_divInner + '</div>&nbsp;';
		
		$j("#popup-icon-thumbnail").html(final_new_node);
		}
			
		////RADIO BUTTONS////		
		//SWITCH ALIGNMENT
		$j("#icon-section-alignment li").click(function () {
			$j("#icon-section-alignment li").removeClass('active');
			$j(this).addClass('active');
			the_node_alignment = $j(this).attr('name');	
			reconstructClasses();				
		});	
		//SWITCH SIZE
		$j("#icon-section-size li").click(function () {
			$j("#icon-section-size li").removeClass('active');
			$j(this).addClass('active');
			the_node_size = "lendpawsize-"+$j(this).attr('name');	
			reconstructClasses();	
		});		
		//SWITCH COLOR
		//find what color was clicked and make new class and name
    	$j('#url-icon-colors li').click(function(){
			the_node_color = $j(this).attr("name");
			$j('#url-icon-colors li').removeClass("active");
			$j(this).addClass("active");
			reconstructClasses();	
		});
		//SWITCH COLORSET
		$j("#icon-section-type li").click(function () {
			$j("#icon-section-type li").removeClass('active');
			$j(this).addClass('active');
			the_node_colorset = $j(this).attr("name");
			if (the_node_colorset!="-bgset"){
				$j("#icon-section-shape").addClass("option-section-disabled");	
				the_node_shape="";
				}
			else if(the_node_shape==""){
				the_node_shape="lendpawshape-square";
				$j("#icon-section-shape li").removeClass("active");
				$j("#icon-section-shape li.select-square-icon").addClass("active");	
				$j("#icon-section-shape").removeClass("option-section-disabled");	
				}
			reconstructClasses();				
		});
		//SWITCH SHAPE
		$j("#icon-section-shape li").click(function () {
			$j("#icon-section-shape li").removeClass("active");
			$j(this).addClass("active");
			var selectedshape=$j(this).attr("name");
			the_node_shape = "lendpawshape-"+selectedshape;
			reconstructClasses();		
		});
		
		//SWITCH HOVER STYLES
		//only color on hover
		$j("#icon-section-colorhoverlink #color-onlyhover").change(function(){
			if ($j(this).prop('checked')){
				the_node_hoverstyle = "hoverme coloronhover";
				reconstructClasses();
			}
			else{
				the_node_hoverstyle = "hoverme";
				reconstructClasses();
				}
		});
		//disable hover
		$j("#icon-section-hoverlink #disable-hover").change(function(){
			if ($j(this).prop('checked')){
				$j("#icon-section-colorhoverlink").hide();
				$j('#icon-section-colorhoverlink #color-onlyhover').prop("checked", false); 
				the_node_hoverstyle = "";
				reconstructClasses();
			}
			else{
				$j("#icon-section-colorhoverlink").show();
				the_node_hoverstyle = "hoverme";
				reconstructClasses();
				}
		});
		
		
		
		////////SAVE CHANGES BTN////////
		$j('#icon_ok_btn').click(function() {		
		reconstructClasses();
		
		//Remove old node
		if ($j(nodeSelection).hasClass("glyph")){
		$j(nodeSelection).remove();
		}
		else if ($j(nodeSelection).parent().hasClass("glyph")){
		$j(nodeSelection).parent().remove();	
		}
		else if ($j(nodeSelection).parent().parent().hasClass("glyph")){
		$j(nodeSelection).parent().parent().remove();
		}
		
		// Insert updated node
		this_advlink_window.execCommand('mceInsertContent', !1, final_new_node); 
		// Close window
		this_advlink_window.windowManager.close();
	});
	


	
	//CONFIRM DELETE BTN
	$j('#deleteNodeBtn').click(function() {
		//Delete node
		if ($j(nodeSelection).hasClass("glyph")){
		$j(nodeSelection).remove();
		}
		else if ($j(nodeSelection).parent().hasClass("glyph")){
		$j(nodeSelection).parent().remove();	
		}
		else if ($j(nodeSelection).parent().parent().hasClass("glyph")){
		$j(nodeSelection).parent().parent().remove();
		}
		// Close window
		this_advlink_window.windowManager.close();
	});

});

	<!-- Preloader -->
    $j(window).load(function() { // makes sure the whole site is loaded
	// Declare window variable
	var this_advlink_window = top.tinymce.activeEditor;
	//Get node
	nodeSelection = this_advlink_window.selection.getNode();
	//Check if node is an icon, if not display message and nothing else
	if (! $j(nodeSelection).hasClass('glyph') && ! $j(nodeSelection).parent().hasClass('glyph') && ! $j(nodeSelection).parent().parent().hasClass('glyph') ){
	$j("#preloader-msg").text("You have not selected an icon");
	$j("#preloader-icon").hide();
	}
	else{	
      $j('#status').fadeOut(); // will first fade out the loading animation
      $j('#preloader').delay(350).fadeOut('slow'); // will fade out the white DIV that covers the website.
      $j('body').delay(350).css({'overflow':'visible'});
	}
    });