/**
 * vitrine - Vitrine - Recomendação de Produtos
 * @author Carlos Eduardo Gomes <carlitoshxcx@gmail.com>
 * @link https://github.com/carlitoshxcx/vitrine/
 * @version v0.0.1
 */
 (function() {
 	"use strict";

 	var _vitrine = this;
 		_vitrine.ready = false;

 	var init = function(){
 		// add jsonp data to a page
 		this.getJSONP();
 	};
 	_vitrine.init = init;


 	var X = function(jsonp){
 		
 		_vitrine.ready = true;
 		_vitrine.data = jsonp.data;
		return data;
 	};
 	_vitrine.X = X;


 	var getJSONP = function(){
 		var jsonp = document.createElement('script');
		    jsonp.type = 'text/javascript';
		    jsonp.async = false;
		    // O SERVIDOR PRECISA RESPONDER HTTPS
		    jsonp.src = 'http://roberval.chaordicsystems.com/challenge/challenge.json?callback=X';

		    // ONLINE
		    // jsonp.src = 'https://carlitoshxcx.github.io/vitrine/dist/js/challenge.json?callback=X';

		    // LOCAL
		    // jsonp.src = 'js/challenge.json?callback=X';
		
		var scriptTarget = document.getElementsByTagName('body')[0].children[1];
		    scriptTarget.parentNode.insertBefore(jsonp, scriptTarget);
 	};
 	_vitrine.getJSONP = getJSONP;


 	var loadData = function(){
 		var dataReadyInterval = setInterval(function(){
 			if (_vitrine.ready){
 				clearInterval(dataReadyInterval);
 				_vitrine.create();
 			}
 		}, 100);
 	}
 	_vitrine.loadData = loadData();


 	var create = function(){
 		this.fillProduct("reference",_vitrine.data.reference.item);
 		this.fillProduct("recommendation",_vitrine.data.recommendation);
 	};
 	_vitrine.create = create;


 	var fillProduct = function(target,items){
 		if (typeof items.length == 'undefined'){
	 		var template = document.getElementsByClassName('reference')[0].children[1].children[0];
	 			
 			if (typeof items.businessId == 'undefined'){ 						template.id 											=  ""; } 
 			else { 																template.id 											=  items.businessId; }
 			if (typeof items.imageName == 'undefined'){ 						template.children[0].children[0].children[0].src 		=  ""; } 
 			else { 																template.children[0].children[0].children[0].src 		=  items.imageName; }
 			if (typeof items.name == 'undefined'){ 								template.children[0].children[1].innerText 				=  ""; } 
 			else { 																template.children[0].children[1].innerText 				=  items.name; }
 			if (typeof items.oldPrice == 'undefined'){ 							template.children[0].children[2].children[0].innerText 	=  ""; } 
 			else { 																template.children[0].children[2].children[0].innerText 	=  items.oldPrice; }
 			if (typeof items.price == 'undefined'){ 							template.children[0].children[3].children[0].innerText 	=  ""; } 
 			else { 																template.children[0].children[3].children[0].innerText 	=  items.price; }
 			if (typeof items.productInfo.paymentConditions == 'undefined'){ 	template.children[0].children[4].innerText 				=  ""; } 
 			else { 																template.children[0].children[4].innerText 				=  items.productInfo.paymentConditions; }
	 		
	 		template.parentNode.className = template.parentNode.className + " show";
 		} else {
 			var templates = [];
	 		
	 		for (var i = items.length - 1; i >= 0; i--) {
	 			var template = document.getElementsByClassName('recommendation')[0].children[1].children[0].children[2].children[0];
	 			
	 			if (typeof items[i].businessId == 'undefined'){ 					template.id 											=  ""; } 
	 			else { 																template.id 											=  items[i].businessId; }
	 			if (typeof items[i].imageName == 'undefined'){ 						template.children[0].children[0].children[0].src 		=  ""; } 
	 			else { 																template.children[0].children[0].children[0].src 		=  items[i].imageName; }
	 			if (typeof items[i].name == 'undefined'){ 							template.children[0].children[1].innerText 				=  ""; } 
	 			else { 																template.children[0].children[1].innerText 				=  items[i].name; }
	 			if (typeof items[i].oldPrice == 'undefined'){ 						template.children[0].children[2].children[0].innerText 	=  ""; } 
	 			else { 																template.children[0].children[2].children[0].innerText 	=  items[i].oldPrice; }
	 			if (typeof items[i].price == 'undefined'){ 							template.children[0].children[3].children[0].innerText 	=  ""; } 
	 			else { 																template.children[0].children[3].children[0].innerText 	=  items[i].price; }
	 			if (typeof items[i].productInfo.paymentConditions == 'undefined'){ 	template.children[0].children[4].innerText 				=  ""; } 
	 			else { 																template.children[0].children[4].innerText 				=  items[i].productInfo.paymentConditions; }
	 			
	 			templates += template.parentNode.innerHTML;
	 		}

	 		var targetTemplates = document.getElementsByClassName('recommendation')[0].children[1].children[0].children[2];

	 		targetTemplates.innerHTML = templates;
	 		targetTemplates.className = targetTemplates.className + " show";
	 		this.slider(targetTemplates.parentNode);
 		}
 	};
 	_vitrine.fillProduct = fillProduct;


 	var slider = function(_slider){
 		var size  = 10,
 			pages = Math.round(_slider.children[2].clientWidth /_slider.clientWidth),
 			cpage = 0,
 			cp 	  = 0,
 			area  = _slider.clientWidth;

 		if (_slider.children[1].className == 'arrow-left'){
 			_slider.children[1].onclick = function(e){
  				cpage += 1;
  				if (cp === 0) { cp = 2;  cpage = -2; } 
  				else { cp --; }
				_slider.children[2].style = "left: " + ((_slider.clientWidth*cpage) + 25) + "px;";
 			};
 		}
 		if (_slider.children[3].className == 'arrow-right'){
 			_slider.children[3].onclick = function(){
 				cpage -= 1;
 				if (cp == pages-1) { cp = 0; cpage = 0; } 
 				else { cp ++; }
 				_slider.children[2].style = "left: " + ((_slider.clientWidth*cpage) + 25) + "px;";
 			};
 		}
 	};
 	_vitrine.slider = slider;


 	// INIT
 	_vitrine.init();

}.call(this));
