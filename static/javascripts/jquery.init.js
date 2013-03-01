


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
	  itemSelector : '.elemwork ',
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
                            $("#topZone").height(windowHeight - 125);
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

        // toggle variable sizes of all elements
      $('#toggle-sizes').find('a').click(function(){
        $container
          .toggleClass('variable-sizes')
          .isotope('reLayout');
        return false;
      });

        // loading elements
	  $container.infinitescroll(
		{
			localMode : true,
			navSelector  :'#page-nav', nextSelector :'#page-nav a', itemSelector :'#works_container .element',     
			loading: {
				finishedMsg: '{% trans "No more to load." %}',
				img: '/static/js/loader.gif'
				},
			localMode: true
		},
		function( newElements ) {
		$container.infiniteScroll.pause();
			var $newElems = $( newElements ).css({ opacity: 0 });
			$newElems.imagesLoaded(function(){
			$newElems.animate({ opacity: 1 });
			
			$container.isotope( 'appended', $newElems, false );;
			});
		}
	);  
    
    // when the a tag (id 'load-more') is clicked,
    // fetch the next page

	
	
	
	//scroller//

	$(window).load(function(){
	        $container.isotope('reLayout');
			$("#topZone").mCustomScrollbar({
				enable:true,
				 scrollInertia:10,
				 mouseWheel: "pixels",
				 mouseWheelPixels: 250,
				scrollButtons:{
				scrollSpeed:10, 
				scrollAmount:20 
					
				},
				callbacks:{
								
				  onTotalScroll:function(){
				  $("#page-nav a").click(function(e){
					alert('ok');
					$(document).trigger('retrieve.infscr');
					
					e.preventDefault();
					$container.infinitescroll('retrieve');alert('ok');
					// the plugin currently sets 'display:none' on your nav selector
					// this is probably going to change, but for the moment, just do this.
					$(this).css('display','none');
					return false;
					});
					$container.infinitescroll('retrieve');
				  }
				}
			});

					
				$("#scroll_to_bottom").click(function(e){
					e.preventDefault();
					$("#topZone").mCustomScrollbar("scrollTo","bottom");
				});
	
		});
	
        // variable sizes of windows
      $(window).resize(function() {
        $container
          .isotope('reLayout');
        return false;
      });
    
  });