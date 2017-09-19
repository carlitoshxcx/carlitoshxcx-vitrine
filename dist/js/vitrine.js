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
		    jsonp.src = 'http://roberval.chaordicsystems.com/challenge/challenge.json?callback=X';
		
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZpdHJpbmUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoidml0cmluZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpIHtcbiBcdFwidXNlIHN0cmljdFwiO1xuXG4gXHR2YXIgX3ZpdHJpbmUgPSB0aGlzO1xuIFx0XHRfdml0cmluZS5yZWFkeSA9IGZhbHNlO1xuXG4gXHR2YXIgaW5pdCA9IGZ1bmN0aW9uKCl7XG4gXHRcdC8vIGFkZCBqc29ucCBkYXRhIHRvIGEgcGFnZVxuIFx0XHR0aGlzLmdldEpTT05QKCk7XG4gXHR9O1xuIFx0X3ZpdHJpbmUuaW5pdCA9IGluaXQ7XG5cblxuIFx0dmFyIFggPSBmdW5jdGlvbihqc29ucCl7XG4gXHRcdF92aXRyaW5lLnJlYWR5ID0gdHJ1ZTtcbiBcdFx0X3ZpdHJpbmUuZGF0YSA9IGpzb25wLmRhdGE7XG5cdFx0cmV0dXJuIGRhdGE7XG4gXHR9O1xuIFx0X3ZpdHJpbmUuWCA9IFg7XG5cblxuIFx0dmFyIGdldEpTT05QID0gZnVuY3Rpb24oKXtcbiBcdFx0dmFyIGpzb25wID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG5cdFx0ICAgIGpzb25wLnR5cGUgPSAndGV4dC9qYXZhc2NyaXB0Jztcblx0XHQgICAganNvbnAuYXN5bmMgPSBmYWxzZTtcblx0XHQgICAganNvbnAuc3JjID0gJ2h0dHA6Ly9yb2JlcnZhbC5jaGFvcmRpY3N5c3RlbXMuY29tL2NoYWxsZW5nZS9jaGFsbGVuZ2UuanNvbj9jYWxsYmFjaz1YJztcblx0XHRcblx0XHR2YXIgc2NyaXB0VGFyZ2V0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2JvZHknKVswXS5jaGlsZHJlblsxXTtcblx0XHQgICAgc2NyaXB0VGFyZ2V0LnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGpzb25wLCBzY3JpcHRUYXJnZXQpO1xuIFx0fTtcbiBcdF92aXRyaW5lLmdldEpTT05QID0gZ2V0SlNPTlA7XG5cblxuIFx0dmFyIGxvYWREYXRhID0gZnVuY3Rpb24oKXtcbiBcdFx0dmFyIGRhdGFSZWFkeUludGVydmFsID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKXtcbiBcdFx0XHRpZiAoX3ZpdHJpbmUucmVhZHkpe1xuIFx0XHRcdFx0Y2xlYXJJbnRlcnZhbChkYXRhUmVhZHlJbnRlcnZhbCk7XG4gXHRcdFx0XHRcblx0XHQgXHRcdGNvbnNvbGUubG9nKCBcInZpdHJpbmUtZGF0YS1sb2FkZWQ6XCIrX3ZpdHJpbmUucmVhZHkgKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhfdml0cmluZS5kYXRhKTtcbiBcdFx0XHRcdFxuXHRcdCBcdFx0Y29uc29sZS5sb2coIFwiX3ZpdHJpbmUuY3JlYXRlKClcIiApO1xuIFx0XHRcdFx0X3ZpdHJpbmUuY3JlYXRlKCk7XG4gXHRcdFx0fVxuIFx0XHR9LCAxMDApO1xuIFx0fVxuIFx0X3ZpdHJpbmUubG9hZERhdGEgPSBsb2FkRGF0YSgpO1xuXG4gXHR2YXIgY3JlYXRlID0gZnVuY3Rpb24oKXtcbiBcdFx0Y29uc29sZS5sb2coX3ZpdHJpbmUuZGF0YS5yZWZlcmVuY2UpO1xuIFx0XHRjb25zb2xlLmxvZyhfdml0cmluZS5kYXRhLnJlY29tbWVuZGF0aW9uKTtcbiBcdH07XG4gXHRfdml0cmluZS5jcmVhdGUgPSBjcmVhdGU7XG5cblxuXG4gXHQvLyBJTklUXG4gXHRfdml0cmluZS5pbml0KCk7XG5cbn0uY2FsbCh0aGlzKSk7XG4iXX0=
