var Order=function(){var e={};var t="up";var n="down";e.getUp=function(){return t};e.getDown=function(){return n};return e}();var Sort=function(){var e={};var t="created";var n="price";var r="score";e.getCreated=function(){return t};e.getPrice=function(){return n};e.getScore=function(){return r};return e}();var View=function(){var e=function(e){if(e.ok){$("#results").empty();var t="";for(var n=0;n<e.results.length;n++){t+=Templates.showResult(e.results[n])}$("#results").html(t);EventHandlers.StartListeningResults()}else{console.log(e.error)}};var t=function(e){if(e.ok){$("#show_product").empty();var t=Templates.showProduct(e);$("#show_product").html(t);var n=window.innerWidth*.5;$("#show_product").dialog({modal:true,width:n,minHeight:300,show:{effect:"explode",duration:500},hide:{effect:"explode",duration:1e3}})}else{console.log(e.error)}};return{ShowResults:e,ShowProduct:t}}();var EventHandlers=function(){var e={};e.StartListening=function(){t();$("#search_button").click(e.Search);$(".prev").click(e.Preview);$(".next").click(e.Next);$("#sort_by").click(e.SortEvent)};e.StartListeningResults=function(){t();$("a.option_view").click(e.ShowProduct);$("a.option_delete").click(e.DeleteProduct)};var t=function(){if(Etsy.getPage()==1){$(".prev").css("display","none")}else{$(".prev").css("display","block")}};e.Search=function(){n();var e=$("#search-text").val();Etsy.Request($.trim(e))};e.Preview=function(){if(Etsy.getPage()==1){}else{n();e.ScrollPage();var t=Etsy.getPage();t-=1;Etsy.setPage(t);Etsy.Request(Etsy.getKeywords())}};e.Next=function(){n();e.ScrollPage();var t=Etsy.getPage();t+=1;Etsy.setPage(t);Etsy.Request(Etsy.getKeywords())};e.ScrollPage=function(){$("body,html").stop(true,true).animate({scrollTop:$("#search").offset().top},1e3)};var n=function(){$("#results").animate({opacity:0},1e3,function(){})};e.showResults=function(){$("#results").animate({opacity:1},1e3,function(){})};e.SortEvent=function(e){n();var t=e.currentTarget.value;switch(t){case"latest":Etsy.setEtsyOrder(Order.getUp());Etsy.setEtsySort(Sort.getCreated());Etsy.Request(Etsy.getKeywords());break;case"relevance":Etsy.setEtsyOrder(Order.getDown());Etsy.setEtsySort(Sort.getScore());Etsy.Request(Etsy.getKeywords());break;case"more_expensive":Etsy.setEtsyOrder(Order.getDown());Etsy.setEtsySort(Sort.getPrice());Etsy.Request(Etsy.getKeywords());break;case"cheaper":Etsy.setEtsyOrder(Order.getUp());Etsy.setEtsySort(Sort.getPrice());Etsy.Request(Etsy.getKeywords());break}};e.ShowProduct=function(e){var t=e.currentTarget.parentNode.parentNode.id;Etsy.setId(t.substring(5));Etsy.RequestById()};e.DeleteProduct=function(e){var t="#"+e.currentTarget.offsetParent.parentNode.id;$(t).remove()};return e}();var Templates=function(){var e={};var t="prod_";e.showProduct=function(e){for(p in e.results){if(e.results[p].listing_id==Etsy.getId()){var t=e.results[p]}}var n=$("#show_product_template").html();var r=Handlebars.compile(n);var i={image:t.Images[0].url_170x135,title:t.title,description:t.description,featured_rank:t.featured_rank,views:t.views,price:t.price,currency_code:t.currency_code};var s=r(i);return s};e.showResult=function(e){var n=$("#products_result_template").html();var r=Handlebars.compile(n);var i={listing_id:t+e.listing_id,image:e.Images[0].url_170x135,title:e.title.substring(0,17),description:e.description.substring(0,55),price:e.price,currency_code:e.currency_code};var s=r(i);return s};return e}();var Etsy=function(){var e={};var t="https://openapi.etsy.com/v2";var n="/listings/active";var r="5ek4vq6nbjpzsyisap0n8woc";var i=20;var s=1;var o=1;var u=undefined;var a=Sort.getCreated();var f=Order.getUp();var l=0;var c=function(){var e=t+n+".js?api_key="+r;if(typeof u=="string"&&$.trim(u)){e+="&keywords="+$.trim(u)}if(o>0){e+="&includes=Images:"+o}if(i>0){e+="&limit="+i}if(s>0){e+="&page="+s}if(typeof a=="string"){e+="&sort_on="+a}if(typeof f=="string"){e+="&sort_order="+f}if(l>0){e+="&listing_id="+l}return e};e.Request=function(e){if(typeof e=="string"){u=e}else{u=undefined}$.ajax({url:c(),dataType:"jsonp",success:View.ShowResults,beforeSend:function(){$("#show_waiting_message").css({display:"block",left:($(window).width()-$("#show_waiting_message").outerWidth())/2-50,top:($(window).height()-$("#show_waiting_message").outerHeight())/2})}}).done(function(){EventHandlers.showResults();$("#show_waiting_message").css("display","none")})};e.RequestById=function(){$.ajax({url:c(),dataType:"jsonp",success:View.ShowProduct,beforeSend:function(){$("#show_waiting_message").css({display:"block",left:($(window).width()-$("#show_waiting_message").outerWidth())/2,top:window.scrollY+250})}}).done(function(){$("#show_waiting_message").css("display","none")})};e.Init=function(){e.Request();EventHandlers.StartListening()};e.setId=function(e){l=e};e.getId=function(){return l};e.setPage=function(e){s=e};e.getPage=function(){return s};e.setEtsyOrder=function(e){f=e};e.setEtsySort=function(e){a=e};e.getKeywords=function(){return u};return e}();var init=function(){Etsy.Init()};$(document).ready(init)