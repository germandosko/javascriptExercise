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