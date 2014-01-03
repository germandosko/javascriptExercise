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
