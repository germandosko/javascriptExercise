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

