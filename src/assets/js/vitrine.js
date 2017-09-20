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
		    jsonp.src = '//roberval.chaordicsystems.com/challenge/challenge.json?render=vitrine.js';
		
		var scriptTarget = document.getElementsByTagName('body')[0].children[1];
		    scriptTarget.parentNode.insertBefore(jsonp, scriptTarget);
 	};
 	_vitrine.getJSONP = getJSONP;


 	var loadData = function(){
 		var dataReadyInterval = setInterval(function(){
 			if (_vitrine.ready){
 				clearInterval(dataReadyInterval);
 				
		 		console.log( "vitrine-data-loaded:"+_vitrine.ready );
                console.log(_vitrine.data);
 				
		 		console.log( "_vitrine.create()" );
 				_vitrine.create();
 			}
 		}, 100);
 	}
 	_vitrine.loadData = loadData();

 	var create = function(){
 		console.log(_vitrine.data.reference);
 		console.log(_vitrine.data.recommendation);
 	};
 	_vitrine.create = create;


 	// INIT
 	_vitrine.init();

}.call(this));
