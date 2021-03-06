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
		    // jsonp.src = 'http://roberval.chaordicsystems.com/challenge/challenge.json?callback=X';

		    // ONLINE
		    // jsonp.src = 'https://carlitoshxcx.github.io/vitrine/dist/js/challenge.json?callback=X';

		    // LOCAL
		    jsonp.src = 'js/challenge.json?callback=X';
		
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
 	};
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
 			
 			if (items.oldPrice === null){ 										template.children[0].children[2].children[0].innerHTML 	=  "";
 																				template.children[0].children[2].children[1].innerHTML 	=  ""; } 
 			else { 																template.children[0].children[2].children[0].innerText 	=  "De: "; 
 																				template.children[0].children[2].children[1].innerText 	=  items.oldPrice; }
 			
 			if (typeof items.price == 'undefined'){ 							template.children[0].children[3].children[0].innerText 	=  "";
 																				template.children[0].children[3].children[1].innerText 	=  ""; } 
 			else { 																template.children[0].children[3].children[0].innerText 	=  "Por: ";
 																				template.children[0].children[3].children[1].innerText 	=  items.price; }
 			
 			if (typeof items.productInfo.paymentConditions == 'undefined'){ 	template.children[0].children[4].innerHTML 				=  ""; } 
 			else { 																template.children[0].children[4].innerHTML 				=  items.productInfo.paymentConditions; }
	 		
	 		template.parentNode.className = template.parentNode.className + " show";
 		} else {
 			var templates = [];
	 		var template = document.getElementsByClassName('recommendation')[0].children[1].children[0].children[2].children[0];
	 		var template2 = template;
	 		
	 		for (var i = items.length - 1; i >= 0; i--) {
	 			template2 = document.getElementsByClassName('recommendation')[0].children[1].children[0].children[2].children[0];
	 			
	 			if (typeof items[i].businessId == 'undefined'){ 					template2.id 											=  ""; } 
	 			else { 																template2.id 											=  items[i].businessId; }
	 			
	 			if (typeof items[i].imageName == 'undefined'){ 						template2.children[0].children[0].children[0].src 		=  ""; } 
	 			else { 																template2.children[0].children[0].children[0].src 		=  items[i].imageName; }
	 			
	 			if (typeof items[i].name == 'undefined'){ 							template2.children[0].children[1].innerText 				=  ""; } 
	 			else { 																template2.children[0].children[1].innerText 				=  items[i].name; }
	 			
	 			if (items[i].oldPrice === null){									template2.children[0].children[2].children[0].innerText 	=  "";
	 																				template2.children[0].children[2].children[1].innerText 	=  ""; } 
	 			else { 																template2.children[0].children[2].children[0].innerText 	=  "De: "; 
	 																				template2.children[0].children[2].children[1].innerText 	=  items[i].oldPrice; }
	 			
	 			if (typeof items[i].price == 'undefined'){ 							template2.children[0].children[3].children[0].innerText 	=  ""; 
	 																				template2.children[0].children[3].children[1].innerText 	=  ""; } 
	 			else { 																template2.children[0].children[3].children[0].innerText 	=  "Por: ";
	 																				template2.children[0].children[3].children[1].innerText 	=  items[i].price; }
	 			
	 			if (typeof items[i].productInfo.paymentConditions == 'undefined'){ 	template2.children[0].children[4].innerHTML 				=  ""; } 
	 			else { 																template2.children[0].children[4].innerHTML 				=  items[i].productInfo.paymentConditions; }
	 			
	 			templates += template2.parentNode.innerHTML;
	 		}

	 		var targetTemplates = document.getElementsByClassName('recommendation')[0].children[1].children[0].children[2];

	 		targetTemplates.innerHTML = templates;
	 		targetTemplates.className = targetTemplates.className + " show";
	 		this.slider(targetTemplates.parentNode);
 		}
 	};
 	_vitrine.fillProduct = fillProduct;


 	var slider = function(_slider){
 		var _left  		= '0px',
 			pages 		= Math.round(_slider.children[2].clientWidth /_slider.clientWidth) +1,
 			cpage 		= 0,
 			cp 	  		= 0,
 			areaAdjust 	= 165,
 			area  		= _slider.clientWidth;

 		// console.log('pages');
		// console.log(pages);
 		// console.log('area');
		// console.log(area);
 		// console.log('areaAdjust');
 		// console.log('area - areaAdjust');
		// console.log(area - areaAdjust);
 		// console.log('_slider.children[2].clientWidth');
		// console.log(_slider.children[2].clientWidth);
 		// console.log('_slider.children[2].clientWidth - (area - areaAdjust)');
		// console.log(_slider.children[2].clientWidth - (area - areaAdjust));

		var _slider_size 	= _slider.clientWidth,
			_slider_range 	= 0,
			_current_page 	= 0,
			_page 			= 0,
			_page_itens 	= 0,
			_page_size 		= 0,
			_products_size 	= _slider.children[2].clientWidth,
			_product_size 	= _slider.children[2].children[0].clientWidth,
			_padding_left 	= _slider.children[1].clientWidth,
			_padding_right 	= _slider.children[3].clientWidth;


		_slider_size -= _padding_left;
		_slider_size -= _padding_right;
		_page 		  = _slider_size/_product_size;
		_page_itens   = Math.floor(_page);
		_page_size 	  = Math.round(_page);
		_slider_range = _page_itens * _product_size;



		// console.log('_slider_size: clientWidth = '+_slider_size);

		// console.log('_products_size: '+_products_size);

		// console.log('_product_size: '+_product_size);
		// console.log('_page: '+ _page );
		// console.log('_page_itens: '+ _page_itens );
		// console.log('_page_size: '+ _page_size );
		// console.log('_slider_range: '+ _slider_range );

		

 		if (_slider.children[1].className == 'arrow-left'){

 			_slider.children[1].onclick = function(e){ 				
 			
				// console.log('_slider.children.clientWidth[div.products.show]');
		 		// console.log(_slider.children[2]);
		 		// console.log('_slider.children.clientWidth');
				// console.log(_slider.children[2].clientWidth);

 				
 				if (_current_page == _page_itens) 	{ _current_page = 0; } 
 				else 								{ _current_page ++; }

 				// console.log('_current_page');
 				// console.log(_current_page);
 				
 				if (_current_page === 0) 			{ _left = '' + _padding_left + "px;"; } 
 				else 								{ _left = '-' + ((_slider.children[2].clientWidth - (_current_page * _slider_range)) - _padding_left)  + "px;"; } 

 				// console.log('_left');
 				// console.log(_left);
 				
 				_slider.children[2].style = "left: " + _left;
 			};
 		}

 		if (_slider.children[3].className == 'arrow-right'){
 			_slider.children[3].onclick = function(){ 				
 			
				// console.log('_slider.children.clientWidth[div.products.show]');
		 		// console.log(_slider.children[2]);
		 		// console.log('_slider.children.clientWidth');
				// console.log(_slider.children[2].clientWidth);

 				
 				if (_current_page == _page_itens) 	{ _current_page = 0; } 
 				else 								{ _current_page ++; }

 				// console.log('_current_page');
 				// console.log(_current_page);
 				
 				if (_current_page === 0) 			{ _left = '' + _padding_left + "px;"; } 
 				else 								{ _left = '-' + ((_slider.children[2].clientWidth - ((_page_size-_current_page) * _slider_range)) - _padding_left)  + "px;"; } 

 				// console.log('_left');
 				// console.log(_left);
 				
 				_slider.children[2].style = "left: " + _left;
 			};
 		}
 	};
 	_vitrine.slider = slider;


 	// INIT
 	_vitrine.init();

}.call(this))