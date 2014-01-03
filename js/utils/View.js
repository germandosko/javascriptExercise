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





