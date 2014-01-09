var Order = (function (){
	
	var myOrder = {}
	
	/**
	 * Ascendent order
	 * @type {String}
	 */
	var Up = 'up';

	/**
	 * Descendent order
	 * @type {String}
	 */
	var Down = 'down';

	/**
	 * get Up property 
	 */
	myOrder.getUp = function(){
		return Up;
	}

	/**
	 * get Down property 
	 */
	myOrder.getDown = function(){
		return Down;
	}

	return myOrder;

})();

var Sort = (function() {
	
	var mySort = {};

	/**
	* Results will be sorted by creation date
	* @type {String}
	*/
	var Created = 'created';
	
	/**
	* Results will be sorted by price
	* @type {String}
	*/
	var Price = 'price';
	
	/**
	 * Results will be sorted by rating
	 * @type {String}
	 */
	var Score = 'score';
	
	mySort.getCreated = function(){
		return Created;
	}

	mySort.getPrice = function(){
		return Price;
	}

	mySort.getScore = function(){
		return Score;
	}
	
	return mySort;
})();

var View = (function(){
	
	var ShowResults = function (data){
		if (data.ok) {
			$('#results').empty();
			var itemHtml = "";
			for (var i = 0; i < data.results.length; i++) {
				itemHtml += Templates.showResult(data.results[i]);
			};
			$('#results').html(itemHtml);
			EventHandlers.StartListeningResults();
		} else {
			console.log(data.error);
		}	
	};

	var ShowProduct = function (data){
		if (data.ok) {
			$('#show_product').empty();
			var itemHtml = Templates.showProduct(data);
			$('#show_product').html(itemHtml);
			var finalSize = window.innerWidth * 0.5;
			$('#show_product').dialog({
				modal: true,
				width: finalSize,
				minHeight: 300,
				show: {
					effect: "explode",
					duration: 500
				},
				hide: {
					effect: "explode",
					duration: 1000
				}		
			});
		} else {
			console.log(data.error);
		}	
	};


	return{
		ShowResults: ShowResults,
		ShowProduct: ShowProduct 
	}
})();

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

var Templates = (function(){
	var myTemplate = {}
	var ItemPrefix = "prod_";

	myTemplate.showProduct = function(data){
		for(p in data.results){
			if(data.results[p].listing_id == Etsy.getId()){
				var product = data.results[p];
			}
		}
		var source   = $("#show_product_template").html();
		var template = Handlebars.compile(source);
		var context = {
			image: product.Images[0].url_170x135,
			title: product.title,
			description: product.description,
			featured_rank: product.featured_rank,
			views: product.views,
			price: product.price,
			currency_code: product.currency_code
		}
		var html = template(context);
		return html;
	}

	myTemplate.showResult = function(product){
		var source   = $("#products_result_template").html();
		var template = Handlebars.compile(source);
		var context = {
			listing_id: ItemPrefix + product.listing_id,
			image: product.Images[0].url_170x135,
			title: product.title.substring(0,17),
			description: product.description.substring(0,55),
			price: product.price,
			currency_code: product.currency_code
		}
		var html = template(context);
		return html;
	}
	return myTemplate;
})();

var Etsy = (function() {
	
	var myEtsy = {};
	/**
	* Initialize the app
	* @return {String}
	*/
	var Url = 'https://openapi.etsy.com/v2';
	
	/**
	 * The query path
	 * @type {String}
	 */
	var Query = '/listings/active';

	/**
	 * The API key
	 * @type {String}
	 */	
	var Key = '5ek4vq6nbjpzsyisap0n8woc';

	/**
	 * Number of results per page
	 * @type {Number}
	 */
	var ResultsPerPage = 20;

	/**
	 * Current page number
	 * @type {Number}
	 */
	var Page = 1;

	/**
	 * The number of images per results
	 * @type {Number}
	 */
	var IncludeImages = 1;

	/**
	 * Text to search
	 * @type {String}
	 */
	var Keywords = undefined;

	/**
	 * How the results will be sorted
	 * @type {String}
	 */
	var EtsySort = Sort.getCreated();

	/**
	 * How the results will be ordered
	 * @type {String}
	 */
	var EtsyOrder = Order.getUp();

	/**
	 * The product id to find
	 * @type {String}
	 */
	var Id = 0;

	/**
	 * Creates the url to request the API
	 * @return {String}
	 */
	var GetQueryUrl = function() {
		var url = Url+Query+'.js?api_key='+Key;
		if(typeof Keywords == 'string' && $.trim(Keywords)){
			url += '&keywords='+$.trim(Keywords);
		}
		if(IncludeImages > 0){
			url += '&includes=Images:'+IncludeImages;
		}
		if(ResultsPerPage > 0){
			url += '&limit='+ResultsPerPage;
		}
		if(Page > 0){
			url += '&page='+Page;
		}
		if(typeof EtsySort == 'string'){
			url += '&sort_on='+EtsySort;
		}
		if(typeof EtsyOrder == 'string'){
			url += '&sort_order='+EtsyOrder;
		}
		if(Id > 0){
			url += '&listing_id='+Id;
		}
		return url;	
	}

	/**
	 * Performs a request to the API and shows the results
	 * @param {String} keywords Text to search
	 */
	myEtsy.Request = function(key) {
		if(typeof key == 'string'){
			Keywords = key;
		} else {
			Keywords = undefined;
		}
		$.ajax({
			url: GetQueryUrl(),
			dataType: 'jsonp',
			success: View.ShowResults,
			beforeSend: function(){
				$('#show_waiting_message').css({
					display: 'block',
					left: ($(window).width() - $('#show_waiting_message').outerWidth())/2 - 50,
					top: ($(window).height() - $('#show_waiting_message').outerHeight())/2
				});
			}
		}).done(function(){
			EventHandlers.showResults();
			$('#show_waiting_message').css('display','none');
		});
	}

	/**
	 * Performs a request to the API and find product by Id
	 * @param {Number} Id to Search
	 */

	myEtsy.RequestById = function() {	
		$.ajax({
			url: GetQueryUrl(),
			dataType: 'jsonp',
			success: View.ShowProduct,
			beforeSend: function(){
				$('#show_waiting_message').css({
					display: 'block',
					left: ($(window).width() - $('#show_waiting_message').outerWidth())/2,
					top: window.scrollY + 250,
				});
			}
		}).done(function(){
			$('#show_waiting_message').css('display','none');
		});
	}

	/**
	 * Initial Function, first request.
	 * @param {Number} Id to Search
	 */
	myEtsy.Init = function (){
		myEtsy.Request();
		EventHandlers.StartListening();
	};

	myEtsy.setId = function(id){
		Id = id;
	}

	myEtsy.getId = function(){
		return Id;
	}

	myEtsy.setPage = function(pag){
		Page = pag;
	}

	myEtsy.getPage = function(){
		return Page;
	}

	myEtsy.setEtsyOrder = function(ord){
		EtsyOrder = ord;
	}

	myEtsy.setEtsySort = function(sort){
		EtsySort = sort;
	}

	myEtsy.getKeywords = function(){
		return Keywords;
	}

	return myEtsy;  
})();

var init = function (){
	Etsy.Init();
};

$(document).ready(init);