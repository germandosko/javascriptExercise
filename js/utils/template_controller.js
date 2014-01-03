var Templates = (function(){
	var myTemplate = {}

	myTemplate.showProduct = function(data){
		for(p in data.results){
			if(data.results[p].listing_id == Etsy.getId()){
				var product = data.results[p];
			}
		}
		var source   = $("#show_product_template").html();
		var template = Handlebars.compile(source);
		var context = {
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

	return myTemplate;
})();
