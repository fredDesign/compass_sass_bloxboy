
    // Isotope Initialisation Anchor //
  $(function(){	
 
    var $anchorspace = $('#globalContainer');
		$anchorspace.delegate( ' a.anchor', 'click', function(){ 
			var anchorgo=$(this).attr('href');
			$("#topZone").mCustomScrollbar("scrollTo",anchorgo);return false
		}); 
		
		});
	
      
