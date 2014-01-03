var EventHandlers = (function(){
	
	var myEvents = {};
	/**
	 * Setup all event listeners
	 */
	myEvents.StartListening = function (){
		showActivateButtons();
		$('#search_button').click(myEvents.Search);
		$('.prev').click(myEvents.Preview);
		$('.next').click(myEvents.Next);
		$('#sort_by').click(myEvents.SortEvent);
	};

	/**
	 * Setup all result event listeners
	 */
	myEvents.StartListeningResults = function (){
		showActivateButtons();
		$('a.option_view').click(myEvents.ShowProduct);
		$('a.option_delete').click(myEvents.DeleteProduct);
	};

	/**
	 * Show Only the activate buttons
	 */
	var showActivateButtons = function (){
		if(Etsy.getPage() == 1) {
			$('.prev').css('display', 'none')
		} else {
			$('.prev').css('display', 'block')
		}
	};

	/**
	 * Performs a search using the Etsy API
	 */
	myEvents.Search = function (){
		hiddenResults();
		var searchText = $('#search-text').val();
		Etsy.Request($.trim(searchText));
	};

	/**
	 * View the preview page
	 */
	myEvents.Preview = function (){
		if(Etsy.getPage() == 1){
		} else {
			hiddenResults();
			myEvents.ScrollPage(); 
			var page = Etsy.getPage();
			page -= 1;
			Etsy.setPage(page);
			Etsy.Request(Etsy.getKeywords());
		}
	};

	/**
	 * View the next page
	 */
	myEvents.Next = function (){		
        hiddenResults();
        myEvents.ScrollPage();   
		var page = Etsy.getPage();
		page += 1;
		Etsy.setPage(page);
		Etsy.Request(Etsy.getKeywords());
	};

	/**
	 * Scroll the page at the top 
	 */
	myEvents.ScrollPage = function (){		
        $('body,html').stop(true,true).animate({
            scrollTop: $("#search").offset().top
        },1000);    
	};

	/**
	 * hidden the results 
	 */
	var hiddenResults = function (){		
		$('#results').animate({
			opacity: 0
		}, 1000, function() {
		});
	};

	/**
	 * show the results 
	 */
	myEvents.showResults = function (){		
		$('#results').animate({
			opacity: 1
		}, 1000, function() {
		});
	};

	/**
	 * Sort the page
	 */
	myEvents.SortEvent = function (event){
		hiddenResults();
		var option = event.currentTarget.value; 
		switch(option){
			case 'latest':
			Etsy.setEtsyOrder(Order.getUp());
			Etsy.setEtsySort(Sort.getCreated());
			Etsy.Request(Etsy.getKeywords());
			break;
			case 'relevance':
			Etsy.setEtsyOrder(Order.getDown());
			Etsy.setEtsySort(Sort.getScore());
			Etsy.Request(Etsy.getKeywords());
			break;
			case 'more_expensive':
			Etsy.setEtsyOrder(Order.getDown());
			Etsy.setEtsySort(Sort.getPrice());
			Etsy.Request(Etsy.getKeywords());
			break;
			case 'cheaper':
			Etsy.setEtsyOrder(Order.getUp());
			Etsy.setEtsySort(Sort.getPrice());
			Etsy.Request(Etsy.getKeywords());
			break;	
		}
	};

	/**
	 * View more information about the product 
	 */
	myEvents.ShowProduct = function (event){	
		var temp_id = event.currentTarget.parentNode.parentNode.id;
		Etsy.setId(temp_id.substring(5));				
		Etsy.RequestById();
	};

	/**
	 * Delete product 
	 */
	myEvents.DeleteProduct = function (event){	
		var id = "#" + event.currentTarget.offsetParent.parentNode.id;
		$(id).remove();
	};

	return myEvents;
})();


