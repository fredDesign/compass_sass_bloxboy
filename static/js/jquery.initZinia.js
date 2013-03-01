


    // Isotope Initialisation script //
  $(function(){	
  
          // variable position of element in windows
	
		
$.fn.whatBlock = function() 
	{	
	var blocks=$(this).find(".hentry");
	jQuery.each(blocks, function() 
		{
		var position = $(this).position();
		if ( position.left<50) {
				$(this).addClass('newsleft');
			}else {
				$(this).addClass('newsright');
			}
		});
		$('div.entry-info').aToolTip({
				fixed: true
			});
	};
	  // custom layout mode spineAlign
  $.Isotope.prototype._spineAlignReset = function() {
    this.spineAlign = {
      colA: 0,
      colB: 0
    };
  };

  $.Isotope.prototype._spineAlignLayout = function( $elems ) {
    var instance = this,
        props = this.spineAlign,
        gutterWidth = Math.round( this.options.spineAlign && this.options.spineAlign.gutterWidth ) || 0,
        centerX = Math.round(this.element.width() / 2);

    $elems.each(function(){
      var $this = $(this),
          isColA = props.colA <= props.colB,
          x = isColA ?
            centerX - ( $this.outerWidth(true) + gutterWidth / 2 ) : // left side
            centerX + gutterWidth / 2, // right side
          y = isColA ? props.colA : props.colB;
      instance._pushPosition( $this, x, y );
      props[( isColA ? 'colA' : 'colB' )] += $this.outerHeight(true);
    });
  };

  $.Isotope.prototype._spineAlignGetContainerSize = function() {
    var size = {};
    size.height = this.spineAlign[( this.spineAlign.colB > this.spineAlign.colA ? 'colB' : 'colA' )];
    return size;
  };

  $.Isotope.prototype._spineAlignResizeChanged = function() {
    return true;
  };
    // End of dynamic center script //
    var $container = $('#entry_container');
    locallayoutMode ='';
    if ($(window).width() < 769 ) { 
			locallayoutMode = 'straightDown'
		  } else {
			locallayoutMode = 'spineAlign'
			  
				
		  }
	 $container.isotope({
      itemSelector : '.hentry',
      layoutMode: locallayoutMode,
      spineAlign: {
        gutterWidth: 20
      },
	  
	    // options
	  animationEngine : 'jquery',
	   resizable: true, // disable normal resizing
		 animationOptions: {
		 duration: 250,
		 easing: 'linear',
		 queue: false
		 
	   },
	   onLayout: function(){
                        setTimeout(function(){
                               // Redifine scroller When animation finish 
                           $container.whatBlock();
						   var windowHeight = $(window).height(); //retrieve current window height
                            $("#topZone").height(windowHeight - $("#total_footer").height());
                            $("#topZone").mCustomScrollbar("update");
							
                        }, 500);
                    }
	});
	
    

	  
	  // filter items when filter link is clicked
		$('#filters a').click(function(){
		  var selector = $(this).attr('data-filter');		
		  $container.find('.element').removeClass('large');
		$container.find('.element').find('.img_gal').removeClass('eight').removeClass('columns');
		$container.find('.element').find('.infosub').removeClass('eight').removeClass('columns');
		  $container.isotope({ filter: selector });
		  
		  return false;
		});
		
        // change size of clicked element
		$container.delegate( '.element', 'click', function(){
		$container.find('.element').removeClass('large');
		$container.find('.element').find('.img_gal').removeClass('eight').removeClass('columns');
		$container.find('.element').find('.infosub').removeClass('eight').removeClass('columns');
		$(this).toggleClass('large');
		$(this).find('.img_gal').toggleClass('eight').toggleClass('columns');
		$(this).find('.infosub').toggleClass('eight').toggleClass('columns');
		$container.isotope('reLayout');
		}); 



        // loading elements

    
    // when the a tag ( '.nextpage a') is clicked,
    // fetch the next page
	$container.on("click", ".nextpage a", function(e){
	$(this).css('display','none');	
		 console.log(this + $(this));            
		 console.log("currentTarget = " + e.currentTarget); 
			$('<div/>').load(
			$(this).attr('href')+' div.element  ',function(){ 
			 // once they're loaded, append them to our content area
			$newItem=$(this).find('div.element');$(this).hide();
			$.when( $container.append( $newItem ).isotope( 'appended', $newItem )).then($container.isotope('reLayout'));
			setTimeout(function(){
                               // Redifine scroller When animation finish 
						$container.isotope('reLayout')   ;
						$("#topZone").mCustomScrollbar("update");
							$("#topZone").mCustomScrollbar("update");
                        }, 500);
							$("#topZone").mCustomScrollbar("update");
		 });return false;
		
	});

	
	
	//scroller//

	$(window).load(function(){
	        $container.isotope('reLayout');
			var windowHeight = $(window).height(); //retrieve current window height
			$("#topZone").height(windowHeight - $("#total_footer").height());
			$("#topZone").mCustomScrollbar({
				enable:true,
				 mouseWheel: "pixels",
				 mouseWheelPixels: 120,
				scrollButtons:{
				scrollSpeed:10, 
				scrollAmount:20 
					
				},
				callbacks:{
								
				  onTotalScroll:function(){
				  $("#page-nav a").click(function(e){
					$(document).trigger('retrieve.infscr');
					
					e.preventDefault();
					// the plugin currently sets 'display:none' on your nav selector
					// this is probably going to change, but for the moment, just do this.
					$(this).css('display','none');
					return false;
					});
				  }
				}
			});
					

	
		});
		
	
        // variable sizes of windows
    
            // variable sizes of windows
      $(window).resize(function() {
	  
	   var windowHeight = $(window).height(); //retrieve current window height
       var windowWidth = $(window).width();
		if ( windowWidth > 768 ) { $("li.niv1.moved").removeClass('moved') };
		if ($(window).width() < 769 ) { 
			$container
			  .isotope({ layoutMode : 'straightDown' })
				.whatBlock();
		  } else {
			$container
			  .isotope({ layoutMode : 'spineAlign' })
				.whatBlock();
		  }
        return false;
      });
	
	
	

			$(document).foundationTopBar() 


	
	
	
  });