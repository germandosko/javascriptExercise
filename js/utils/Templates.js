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
