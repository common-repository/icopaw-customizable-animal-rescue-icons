var $j=jQuery;
var DEMO = (function( $j ) {
  'use strict';

  var $jgrid = $j('#grid'),
      $jfilterOptions = $j('.filter-options > li'),
      $jsizer = $jgrid.find('.shuffle__sizer'),

  init = function() {


    // None of these need to be executed synchronously
    setTimeout(function() {
      listen();
      setupFilters();
      setupSorting();
      setupSearching();
    }, 100);

    // You can subscribe to custom events. To receive the loading and done events,
    // you must subscribe to them before initializing the plugin, otherwise they will
    // fire before you have subscribed to them
    // shrink, shrunk, filter, filtered, sorted, load, done
    $jgrid.on('loading.shuffle done.shuffle shrink.shuffle shrunk.shuffle filter.shuffle filtered.shuffle sorted.shuffle layout.shuffle', function(evt, shuffle) {
      // Make sure the browser has a console
      if ( window.console && window.console.log && typeof window.console.log === 'function' ) {
        console.log( 'Shuffle:', evt.type );
      }
    });

    // instantiate the plugin
    $jgrid.shuffle({
      itemSelector: '.picture-item',
      sizer: $jsizer
    });

    // Destroy it! o_O
    // $jgrid.shuffle('destroy');
  },

  // Set up button clicks
  setupFilters = function() {
    var $jbtns = $jfilterOptions;
    $jbtns.on('click', function() {
      var $jthis = $j(this),
          isActive = $jthis.hasClass( 'active' ),
          group = isActive ? 'all' : $jthis.data('group');
          //clear search bar
          $j(".filter__search").val("");
		  $j("#search-icon .icoPaw-close").removeClass().addClass("icoPaw-search");
          
          if ( !isActive ) {
            //get color of selected btn
          var $jselectedBtnColor=$j(this).find('span').attr('class');

          //get website of selected btn
          var $jselectedBtnWebsite=$j(this).find('.icon-website-name').text();

          //get category of selected btn
          var $jselectedBtnCategory=$j(this).find('span').text();

      // Hide current label, show current label in title    

        $j('.filter-options .active').removeClass('active');
      

      $jthis.toggleClass('active');

      // Filter elements
      $jgrid.shuffle( 'shuffle', group );
      if (! $jthis.hasClass('viewallbtn')){
        $j(".picture-item.filtered .picture-item__glyph > div").removeClass();
        $j(".picture-item.filtered .picture-item__glyph > div").addClass($jselectedBtnColor+" lendpawshape-square lendpawsize-large hoverme glyph");
          
         
      }
      if ($jselectedBtnWebsite!=""){
            $j("#icon-breadcrumbs-website").html($jselectedBtnWebsite+" &#187; ");
          }
          else{$j("#icon-breadcrumbs-website").html("");}
            $j("#icon-breadcrumbs-category").html($jselectedBtnCategory);          
          }    
     
    });

    $jbtns = null;
  },

  setupSorting = function() {
    // Sorting options
    $j('.sort-options').on('change', function() {
      var sort = this.value,
          opts = {};

      // We're given the element wrapped in $j
      if ( sort === 'date-created' ) {
        opts = {
          reverse: true,
          by: function($jel) {
            return $jel.data('date-created');
          }
        };
      } 
	  else if ( sort === 'title' ) {
        opts = {
          by: function($jel) {
            return $jel.data('title').toLowerCase();
          }
        };
      }
	   else if ( sort === 'groups' ) {
        opts = {
          by: function($jel) {
            return $jel.data('groups');
          }
        };
      }
	    else if ( sort === 'website' ) {
        opts = {
          by: function($jel) {
            return $jel.data('website');
          }
        };
      }

      // Filter elements
      $jgrid.shuffle('sort', opts);
    });
  },

  setupSearching = function() {
    // Advanced filtering
    $j('.js-shuffle-search').on('keyup change', function() {
      var val = this.value.toLowerCase();

      //remove all active states when searching      
         $j(".filter-options.btn-group .btn").removeClass('active');
		 //SWAP OUT ICONS - show x instead of search icon
		 if (val == ""){
			 $j("#search-icon .icoPaw-close").removeClass().addClass("icoPaw-search");
		 }
		 else{$j("#search-icon .icoPaw-search").removeClass().addClass("icoPaw-close");}
		 
		 
  
  $j("#icon-breadcrumbs-website").html("");
            $j("#icon-breadcrumbs-category").html("Searching All Icons");
      $jgrid.shuffle('shuffle', function($jel, shuffle) {
        //reset category back to view all when searching
      shuffle.group = 'all';

        // Only search elements in the current group (currently disabled)
        // if (shuffle.group !== 'all' && $j.inArray(shuffle.group, $jel.data('groups')) === -1) {
        //   return false;
        // }

        var text = $j.trim( $jel.find('.picture-item__title').text() ).toLowerCase();
        return text.indexOf(val) !== -1;
      });
    });
    //CLEAR SEARCH FUNCTION
  $j("#search-icon").click(function(){
	 //(if not search icon in input, reset animals and clear input)
	 if (!$j(this).find('span').hasClass("icoPaw_search")){
	
    $j(".filter__search").val("");
	//SWAP OUT ICONS - show x instead of search icon
		 $j("#search-icon .icoPaw-close").removeClass().addClass("icoPaw-search");
     $j("#icon-breadcrumbs-website").html("");
            $j("#icon-breadcrumbs-category").html("All Icons");
    var val="";
    //change btn back to viewall on clear
     if(! $j(".filter-options.btn-group .viewallbtn").hasClass('active')){
         $j(".filter-options.btn-group .btn").removeClass('active');
    $j(".filter-options.btn-group .viewallbtn").addClass('active');
  }
  $jgrid.shuffle('shuffle', function($jel, shuffle) {
     //reset category back to view all on clear
      shuffle.group = 'all';
        // Only search elements in the current group
        if (shuffle.group !== 'all' && $j.inArray(shuffle.group, $jel.data('groups')) === -1) {
          return false;
        }

        var text = $j.trim( $jel.find('.picture-item__title').text() ).toLowerCase();
        return text.indexOf(val) !== -1;
      });
	}//end if (not search icon)
  });
     
  },

  // Re layout shuffle when images load. This is only needed
  // below 768 pixels because the .picture-item height is auto and therefore
  // the height of the picture-item is dependent on the image
  // I recommend using imagesloaded to determine when an image is loaded
  // but that doesn't support IE7
  listen = function() {
    
      $jgrid.shuffle('update');
   

    // Get all images inside shuffle
    $jgrid.find('img').each(function() {
      var proxyImage;

      // Image already loaded
      if ( this.complete && this.naturalWidth !== undefined ) {
        return;
      }

      // If none of the checks above matched, simulate loading on detached element.
      proxyImage = new Image();
      $j( proxyImage ).on('load', function() {
        $j(this).off('load');
       // debouncedLayout();
      });

      proxyImage.src = this.src;
    });

    
    
  };

  return {
    init: init
  };
}( $j ));


//ADDED CLICK FUNCTIONS
(function( $j ) {
 
   //MAXIMIZE/MINIMIZE HEADER
     $j("#toggle-icon-categories").click(function(){
       //hide cats
      if (window.showCats!=false){
      $j("#toggle-icon-categories #toggle-icon-text").text("Show Categories");
      window.showCats=false;
      //move container icons up
      $j(".container-icons").animate({
        "padding-top" : +60
        }, 500, function() {
      });
      //hide cat div
      $j("#all-icon-categories").slideToggle();
      }
      //show cats
      else if (window.showCats==false){
      $j("#toggle-icon-categories #toggle-icon-text").text("Hide Categories");
      window.showCats=true;
        //move container icons down
      $j(".container-icons").animate({
        "padding-top" : -60
        }, 300, function() {
      });
      //show cat div
      $j("#all-icon-categories").slideToggle();
      }
       });

   //SHOW UP ARROW
      $j(window).scroll(function(){  
        // if the user scrolled the page more than 200 pixels, show the 'up' arrow image
        if ($j(this).scrollTop() > 200) {
            $j('.pagetop-arrow').fadeIn();
        }
        // hide the 'up' arrow image
        else {
            $j('.pagetop-arrow').fadeOut();
        } 
    });

      //CLICK ON UP ARROW TO GO BACK TO TOP OF PAGE
      $j(".pagetop-arrow").on("click", function() {
          $j("html, body").animate({ scrollTop: 0}, 1000);
          return false;
      });

    //POPUP FUNCTIONS////////////
	 resetIconAlignment=function(){
      //reset type btns active state (make bg icon active)
      $j("#url-icon-alignment li").removeClass("active");
      $j("#url-icon-alignment li.select-alignnone").addClass("active"); 
	  $j("#popup-icon-thumbnail").css("text-align","center");
     }

     resetIconTypes=function(){
      //reset type btns active state (make bg icon active)
      $j("#url-icon-type li").removeClass("active");
      $j("#url-icon-type li.select-colored-bg").addClass("active"); 
     }

     resetIconShapes=function(){
      //reset type btns active state (make square icon active)
      $j("#url-icon-shape li").removeClass("active");
      $j("#url-icon-shape li.select-square-icon").addClass("active");
      //show shape options (show all)
        $j("#icon-section-shape li").show();
	   //ensure shape section looks enabled
		$j("#icon-section-shape").removeClass("option-section-disabled");
     }

     resetIconSizes=function(){    
       //reset size btns active state (make 128 active)
       $j("#url-icon-sizes li").removeClass("active");
        $j("#url-icon-sizes li.url-icon-large").addClass("active");
      }

      resetIconColors=function(){
      //switch fgset back to bgset
	  	if($j("#url-icon-colors li").hasClass("select-colored-fg")){
    		$j("#url-icon-colors li").removeClass("select-colored-fg");
        	$j("#url-icon-colors li").addClass("select-colored-bg"); 
	  	}
      }

       resetIconsLinkHover=function(){
      //uncheck disable both hover checkbox 
      $j('#icon-section-hoverlink #disable-hover').prop("checked", false); 
      $j('#icon-section-colorhoverlink #color-onlyhover').prop("checked", false);
      //show color on hover only option   
       $j("#icon-section-colorhoverlink").show();
      }

    updateCurrentIcon=function(thisObj){
      //update var to current icon
      window.currentIcon=thisObj;
    
    //recreate image & image class
    var $jiconSrc=thisObj.find('.picture-item__glyph').html();
    var $jiconClass=thisObj.find('div[class^="lendpaw"]').attr('class');
    var $jiconLink=$jiconSrc;
    //recreate title
    var $jiconTitle=thisObj.find($j('.picture-item__title')).text();   
    //display icon url
    if ($jiconSrc !=undefined){
    $j("#url-icon").text($jiconSrc);
    }
    else{$j("#url-icon").text('Image not available')}
    //display icon image
    $j("#popup-icon-thumbnail").html($jiconSrc);
    //display icon title
    $j('#popup-title').html($jiconTitle);  
    //get string of current icon clicked
    var $jiconImgClass=thisObj.html();
	
    //split classes and grab first to get current default color
	var split_classes = $jiconClass.split(/\s/);
	var $jselectediconColorClass=split_classes[0];
	$jselectediconColorClass=$jselectediconColorClass.slice(13, - 6);//shave off lendpawcolor- and -bgset/-fgset
	
      //set default color to active state
      $j("#url-icon-colors li").removeClass("active");
      $j("#url-icon-colors li.lendpawcolor-"+$jselectediconColorClass+"-bgset").addClass("active");
		
		resetIconAlignment();
      resetIconSizes();
      resetIconColors();
      resetIconTypes();
      resetIconShapes();
      resetIconsLinkHover();
  }
$j.fn.slideFadeToggle  = function(speed, easing, callback) {
        return this.animate({opacity: 'toggle', width: 'toggle', height:'toggle'}, speed, easing, callback);
};

    //CLICKED ON ANY ICON
    $j(".picture-item").click(function(){
         $j("#url-popup").slideFadeToggle(400);
          $j(".popup-bg").show(450);
		  $j('body').delay(450).css({'overflow':'hidden'});
        
        //update currenticon
      window.currentIcon=$j(this);
      updateCurrentIcon(window.currentIcon);
    });
    ////BTNS IN POPUP
    //NEXT
    $j("#url-popup-next").click(function(){
	//check if next icon is in active category
		if(! window.currentIcon.next().hasClass("concealed")){
			//check if next node is an actual icon
			if(window.currentIcon.next().hasClass("picture-item")){
    			window.currentIcon=window.currentIcon.next();
    			updateCurrentIcon(window.currentIcon);
			}
		}
    });
     //PREVIOUS
    $j("#url-popup-previous").click(function(){
		//check if prev icon is in active category
		if(! window.currentIcon.prev().hasClass("concealed")){
			//check if prev node is an actual icon
			if(window.currentIcon.prev().hasClass("picture-item")){
   			 window.currentIcon=window.currentIcon.prev();
    			updateCurrentIcon(window.currentIcon);
			}
		}
    });
    //CLOSE   
    $j("#url-popup-close").click(function(){
      $j(".window-popup").hide();//hide url-icon popup
	  $j('body').css({'overflow':'visible'});
       $j(".popup-bg").hide();	   
      
    });
	
	 //CLICKED ON ALIGNMENT BTN
    $j("#url-icon-alignment li").click(function(){
      //get current icon link
      var $jiconLink=$j("#url-icon").text();
      //check what size was selected
      if($j(this).attr("class").indexOf("alignleft") >= 0){var $jnewIconAlign="alignleft";$j("#popup-icon-thumbnail").css("text-align","left");}
	  else if($j(this).attr("class").indexOf("aligncenter") >= 0){var $jnewIconAlign="aligncenter";$j("#popup-icon-thumbnail").css("text-align","center");}
      else if($j(this).attr("class").indexOf("alignright") >= 0){var $jnewIconAlign="alignright";$j("#popup-icon-thumbnail").css("text-align","right");}
      else if($j(this).attr("class").indexOf("alignnone") >= 0){var $jnewIconAlign="alignnone";$("#popup-icon-thumbnail").css("text-align","center");}
      //replace 128 with new size
      if ($jiconLink.indexOf("alignleft") >= 0){
        $jiconLink=$jiconLink.replace(/alignleft/g,$jnewIconAlign);
      }
      //replace 64 with new size
      else if ($jiconLink.indexOf("aligncenter") >= 0){
        $jiconLink=$jiconLink.replace(/aligncenter/g,$jnewIconAlign);
      }
      //replace 32 with new size
      else if ($jiconLink.indexOf("alignright") >= 0){
        $jiconLink=$jiconLink.replace(/alignright/g,$jnewIconAlign);
      }
	    //replace 16 with new size
      else if ($jiconLink.indexOf("alignnone") >= 0){
        $jiconLink=$jiconLink.replace(/alignnone/g,$jnewIconAlign);
      }
      //update url
      $j("#url-icon").text($jiconLink);
      //update thumbnail
      $j("#popup-icon-thumbnail").html($jiconLink);
      //give clicked button active state
      $j("#url-icon-alignment li").removeClass("active");
      $j(this).addClass("active");//give selected size active style
    }); 
 

    //CLICKED ON SIZE BTN
    $j("#url-icon-sizes li").click(function(){
      //get current icon link
      var $jiconLink=$j("#url-icon").text();
      //check what size was selected
      if($j(this).attr("class").indexOf("-xsmall") >= 0){var $jnewIconSize="xsmall";}
	  else if($j(this).attr("class").indexOf("-small") >= 0){var $jnewIconSize="small";}
      else if($j(this).attr("class").indexOf("-medium") >= 0){var $jnewIconSize="medium";}
      else if($j(this).attr("class").indexOf("-large") >= 0){var $jnewIconSize="large";}
	  else if($j(this).attr("class").indexOf("-xlarge") >= 0){var $jnewIconSize="xlarge";}
	   //replace 300 with new size
      if ($jiconLink.indexOf("size-xlarge") >= 0){
        $jiconLink=$jiconLink.replace(/xlarge/g,$jnewIconSize);
      }
      //replace 128 with new size
      if ($jiconLink.indexOf("size-large") >= 0){
        $jiconLink=$jiconLink.replace(/large/g,$jnewIconSize);
      }
      //replace 64 with new size
      else if ($jiconLink.indexOf("size-medium") >= 0){
        $jiconLink=$jiconLink.replace(/medium/g,$jnewIconSize);
      }
      //replace 32 with new size
      else if ($jiconLink.indexOf("size-small") >= 0){
        $jiconLink=$jiconLink.replace(/small/g,$jnewIconSize);
      }
	    //replace 16 with new size
      else if ($jiconLink.indexOf("size-xsmall") >= 0){
        $jiconLink=$jiconLink.replace(/xsmall/g,$jnewIconSize);
      }
      //update url
      $j("#url-icon").text($jiconLink);
      //update thumbnail
      $j("#popup-icon-thumbnail").html($jiconLink);
      //give clicked button active state
      $j("#url-icon-sizes li").removeClass("active");
      $j(this).addClass("active");//give selected size active style
    });   

    //SELECT ICON TYPE (COLORED BG/COLORED FG)
    $j('#url-icon-type li').click(function(){
     //get current icon link
      var $jiconLink=$j("#url-icon").text();
      ////////check what icon type was selected
      //if bg was selected
       if($j(this).attr("class").indexOf("colored-bg") >= 0){
        var $jnewIconType="bg";
        //if white fg was selected, switch background to black
        
      if ($j("li.lendpawcolor-white-bgset.select-colored-fg").hasClass("active")){
        $j("li.lendpawcolor-white-bgset.select-colored-fg").removeClass("active");
        
      $jiconLink=$jiconLink.replace(/lendpawcolor.*fgset/,"lendpawcolor-black-fgset");
      $j("li.lendpawcolor-black-bgset").addClass("active");
        }
      }
       //if fg was selected
       else if($j(this).attr("class").indexOf("colored-fg") >= 0){
        var $jnewIconType="fg";
      }      
      //if current has fg color type, replace with newIconType
      if ($jiconLink.indexOf("fgset") >= 0){
        //switch bgset/fgset
        $jiconLink=$jiconLink.replace(/-fgset/g,"-"+$jnewIconType+"set");
        //replace type class on color selection options
       $j("#url-icon-colors li").removeClass("select-colored-fg");
        $j("#url-icon-colors li").addClass("select-colored-"+$jnewIconType);
      }
       //if current has bg color type, replace with newIconType
      else if ($jiconLink.indexOf("bgset") >= 0){
        //switch bgset/fgset
        $jiconLink=$jiconLink.replace(/-bgset/g,"-"+$jnewIconType+"set");
        //replace type class on color selection options
       $j("#url-icon-colors li").removeClass("select-colored-bg");
        $j("#url-icon-colors li").addClass("select-colored-"+$jnewIconType);

      }
       
        //shape options (hide both options if fg color)
       if ($jnewIconType=="fg"){                
        if ($jiconLink.indexOf("lendpawshape-circle") >= 0){
        $jiconLink=$jiconLink.replace(/lendpawshape-circle/g,"");
        }
		else if ($jiconLink.indexOf("lendpawshape-square") >= 0){
			//remove shape class for fg icons
        $jiconLink=$jiconLink.replace(/lendpawshape-square/g,"");
        }
        $j("#icon-section-shape li").removeClass("active");
        $j("#icon-section-shape li").hide();	
		
		//make shape section look disabled
		$j("#icon-section-shape").addClass("option-section-disabled");	                
       }
       else if ($jnewIconType=="bg"){ 
       $j("#icon-section-shape li").show();
	   $j("#icon-section-shape li.select-square-icon").addClass("active");
		   //add shape-square class back to bg color
	    $jiconLink=$jiconLink.replace(/lendpawsize/g,"lendpawshape-square lendpawsize");
	   
	   //ensure shape section looks enabled
		$j("#icon-section-shape").removeClass("option-section-disabled");
       } 
      //update url
      $j("#url-icon").text($jiconLink);
      //update thumbnail
      $j("#popup-icon-thumbnail").html($jiconLink);
      //give clicked button active state
      $j('#url-icon-type li').removeClass("active");
      $j(this).addClass("active");
      
    });

      //CLICKED ON SHAPE BTN (CIRCLE/SQUARE)
      $j('#url-icon-shape li').click(function(){
      //get current icon link
      var $jiconLink=$j("#url-icon").text();
      //check what icon type was selected
       if($j(this).attr("class").indexOf("square") >= 0){var $jnewIconShape="square";}
       else if($j(this).attr("class").indexOf("circle") >= 0){var $jnewIconShape="circle";}
       //update icon shape in code
      if ($jiconLink.indexOf("lendpawshape-square") >= 0){
        //replace white class with new class
        $jiconLink=$jiconLink.replace(/lendpawshape-square/g,"lendpawshape-"+$jnewIconShape);
      }
      else  if ($jiconLink.indexOf("lendpawshape-circle") >= 0){
        //replace white class with new class
        $jiconLink=$jiconLink.replace(/lendpawshape-circle/g,"lendpawshape-"+$jnewIconShape);
      }
      //update url
      $j("#url-icon").text($jiconLink);
      //update thumbnail
      $j("#popup-icon-thumbnail").html($jiconLink);
      //give clicked button active state
      $j('#url-icon-shape li').removeClass("active");
      $j(this).addClass("active");
       });

     //SELECTED A COLOR
     //find what color was clicked and make new class and name
    $j('#url-icon-colors li').click(function(){
    
    //use function to change bg to new color selected based on its class
    var $jselectediconColorClass=$j(this).attr("name");
     
    
    //replace color if has colored bg
     var $jiconLink=$j("#url-icon").text();
     if ($j(this).attr("class").indexOf("select-colored-bg")>=0){
      $jiconLink=$jiconLink.replace(/lendpawcolor.*bgset/,"lendpawcolor-"+$jselectediconColorClass+"-bgset");
	 
     }
     //replace color if has colored fg
     else if ($j(this).attr("class").indexOf("select-colored-fg")>=0){
      $jiconLink=$jiconLink.replace(/lendpawcolor.*fgset/,"lendpawcolor-"+$jselectediconColorClass+"-fgset");
     }
     
     //$jiconLink=$jiconLink.addClass($jselectediconColorClass);
     //update url
      $j("#url-icon").text($jiconLink);
      //update thumbnail
      $j("#popup-icon-thumbnail").html($jiconLink);
      //remove active class from all others
      $j('#url-icon-colors li').removeClass("active");
      //add active class to selected color
      $j(this).addClass("active");
          
    }); 

    //DISABLE/ENABLE HOVER
    $j('#icon-section-hoverlink #disable-hover').change(function(){
      //get current icon link
      var $jiconLink=$j("#url-icon").text();
      if($j(this).is(":checked")) {
        $j("#popup-icon-thumbnail > div").removeClass("hoverme");
        $j("#popup-icon-thumbnail > div").removeClass("coloronhover");
        
        //hide color on hover option and uncheck it
        $j("#icon-section-colorhoverlink").hide();
        $j('#icon-section-colorhoverlink #color-onlyhover').prop("checked", false); 
      }
      else{
        $j("#popup-icon-thumbnail > div").addClass("hoverme");
        $j("#icon-section-colorhoverlink").show();
      }
      $jiconLink=$j("#popup-icon-thumbnail").html();
      //update url
      $j("#url-icon").text($jiconLink);
      //update thumbnail
      $j("#popup-icon-thumbnail").html($jiconLink);
      }); 
    

     //DISABLE/ENABLE COLOR ON HOVER ONLY
    $j('#icon-section-colorhoverlink #color-onlyhover').change(function(){
        //get current icon link
      var $jiconLink=$j("#url-icon").text();
      if($j(this).is(":checked")) {
        $j("#popup-icon-thumbnail > div").addClass("coloronhover");
      }
      else{
        $j("#popup-icon-thumbnail > div").removeClass("coloronhover");
      }
       $jiconLink=$j("#popup-icon-thumbnail").html();
      //update url
      $j("#url-icon").text($jiconLink);
      //update thumbnail
      $j("#popup-icon-thumbnail").html($jiconLink);
       });  

    //IF CLICK ON POPUP BG, CLOSE ALL POPUPS
     $j(".popup-bg").click(function(){
      $j(this).hide();
	  $('body').css({'overflow':'visible'});
      $j(".window-popup").hide();
	  
     
     });
	 //INSERT SHORTCODE
	 
	 
jQuery("#insertIconBtn").click(function() {
	
	var iconChosen=$j("#popup-icon-thumbnail").html();
	var finalInsert = iconChosen + "&nbsp;";
	
	
 window.parent.tinyMCE.activeEditor.execCommand( 'mceInsertContent', false, finalInsert );
    parent.tinyMCE.activeEditor.windowManager.close(window);
});

jQuery("#cancelIconBtn").click(function() {
	parent.tinyMCE.activeEditor.windowManager.close(window);
});


}( $j ));



$j(document).ready(function() {
	
  /*resetIcons();*/
  DEMO.init();
  
});
	<!-- Preloader -->
    $j(window).load(function() { // makes sure the whole site is loaded
	$j(".mce-container-body").width("80%");
	// Declare window variable
	var this_advlink_window = top.tinymce.activeEditor;
	//Get node
	nodeSelection = this_advlink_window.selection.getNode();
	//console.log("nodeSelection= "+nodeSelection);
	//Check if node is an icon, if not display message and nothing else
	if ($j(nodeSelection).hasClass('glyph') || $j(nodeSelection).parent().hasClass('glyph') || $j(nodeSelection).parent().parent().hasClass('glyph') || nodeSelection=="[object HTMLBodyElement]" ){
		//if (nodeSelection!="undefined" && nodeSelection!="" && nodeSelection!=undefined && nodeSelection!="[object HTMLParagraphElement]" ){//
	$j("#preloader-msg").html("Please click onto an empty space in your editor before inserting an icon.");
	$j("#preloader-icon").hide();
	}
	else{
      $j('#status').fadeOut(); // will first fade out the loading animation
      $j('#preloader').delay(350).fadeOut('slow'); // will fade out the white DIV that covers the website.
      $j('body').delay(350).css({'overflow':'visible'});
	}
    });
 


