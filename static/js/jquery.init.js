


    // Isotope Initialisation script //
  $(function(){	
    $.Isotope.prototype._getCenteredMasonryColumns = function() {
    this.width = this.element.width();
    var parentWidth = this.element.parent().width();
                  // i.e. options.masonry && options.masonry.columnWidth
    var colW = this.options.masonry && this.options.masonry.columnWidth ||
                  // or use the size of the first item
                  this.$filteredAtoms.outerWidth(true) ||
                  // if there's no items, use size of container
                  parentWidth;
    
    var cols = Math.floor( parentWidth / colW );
    cols = Math.max( cols, 1 );

    // i.e. this.masonry.cols = ....
    this.masonry.cols = cols;
    // i.e. this.masonry.columnWidth = ...
    this.masonry.columnWidth = colW;
  };
  
  $.Isotope.prototype._masonryReset = function() {
    // layout-specific props
    this.masonry = {};
    // FIXME shouldn't have to call this again
    this._getCenteredMasonryColumns();
    var i = this.masonry.cols;
    this.masonry.colYs = [];
    while (i--) {
      this.masonry.colYs.push( 0 );
    }
  };

  $.Isotope.prototype._masonryResizeChanged = function() {
    var prevColCount = this.masonry.cols;
    // get updated colCount
    this._getCenteredMasonryColumns();
    return ( this.masonry.cols !== prevColCount );
  };
  
  $.Isotope.prototype._masonryGetContainerSize = function() {
    var unusedCols = 0,
        i = this.masonry.cols;
    // count unused columns
    while ( --i ) {
      if ( this.masonry.colYs[i] !== 0 ) {
        break;
      }
      unusedCols++;
    }
    
    return {
          height : Math.max.apply( Math, this.masonry.colYs ),
          // fit container to columns that have been used;
          width : (this.masonry.cols - unusedCols) * this.masonry.columnWidth
        };
  };
    // End of dynamic center script //
    var $container = $('#works_container');
    
	 $container.isotope({
	    // options
	  animationEngine : 'jquery',
	  itemSelector : '.elemwork',
	  masonry: {
	     /* liee a pixelgrid/pixelgrid.scss*/
		columnWidth: 253
		},
		 animationOptions: {
		 duration: 250,
		 easing: 'linear',
		 queue: false
		 
	   },
	   onLayout: function(){
                        setTimeout(function(){
                               // Redifine scroller When animation finish 
                           
						   var windowHeight = $(window).height(); //retrieve current window height
                           var windowWidth = $(window).width();
						   windowWidth > 768 ? $("#topZone").height(windowHeight) : $("#topZone").height(windowHeight)  ;
                            $("#topZone").mCustomScrollbar("update").mCustomScrollbar("scrollTo",'.large');
							$(".videoRessource").fitVids() ;
		
                        }, 500);
                    }
	});
	
    

	  
	  // filter items when filter link is clicked
		$('#filters a').click(function(){
		var selector = $(this).attr('data-filter');		
		$container.find('.element').removeClass('large');
		$container.find('.element').find('.img_gal').removeClass('six').removeClass('columns');
		$container.find('.element').find('.infosub').removeClass('six').removeClass('columns');
		$container.isotope({ filter: selector });
		  return false;
		});
		
        // change size of clicked element
		$container.delegate('.element','click', function(){
			$container.find('.element').removeClass('large');
			$container.find('.element').find('.img_gal,.infosub').removeClass('six').removeClass('columns');
			$(this).toggleClass('large');
			$(this).find('.img_gal,.infosub').toggleClass('six').toggleClass('columns');
			$container.isotope('reLayout',    function() {
				$(".videoRessource").fitVids() ; 
				$("#topZone").mCustomScrollbar("scrollTo",'.large')
			});
		
		}); 



        // loading elements

    
    // when the a tag ( '.nextpage a') is clicked,
    // fetch the next page
	$container.on("click", ".nextpage a", function(e){
	$(this).css('display','none');	
	
	$(this).parent().parent(".elemwork").remove();

			$('<div/>').load(
			$(this).attr('href')+' div.element  ',function(){

			 // once they're loaded, append them to our content area
			$newItem=$(this).find('div.element');
			$(this).hide();
			$newItem.imagesLoaded(function(){
			$.when( $container.append( $newItem ).isotope( 'appended', $newItem,$container.isotope('reLayout') )).then($container.isotope('reLayout'));
			});
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
			$filterscontainer=$('.filterscontainer');
			var windowHeight = $(window).height(); //retrieve current window height
                        mcs='$("#topZone")';    
			$("#topZone").mCustomScrollbar({
				enable:true,
				mouseWheelPixels: 120,
				scrollButtons:{
				scrollSpeed:10, 
				scrollAmount:20 
					
				},advanced:{
					autoScrollOnFocus: true
				},
				callbacks:{
								whileScrolling:function(){
								$('#cubes').css('top', (Math.abs($('#topZone .mCSB_container').offset().top)/2)+40) ;
				
					
					
				  },
				  onScroll:function(){
					if ( Math.abs($('#topZone .mCSB_container').offset().top) > 200) {
						$('.filterscontainer').addClass('abso')
					} else {$('.filterscontainer').removeClass('abso') }
				  },
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
      $(window).resize(function() {
	   var windowHeight = $(window).height(); //retrieve current window height
       var windowWidth = $(window).width();
		if ( windowWidth > 768 ) { $("li.niv1.moved").removeClass('moved') };
                          
        $container
          .isotope('reLayout');
        return false;
      });
    
	
	
	
	
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
	
	
	
  });
