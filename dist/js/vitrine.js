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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZpdHJpbmUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoidml0cmluZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiAoZnVuY3Rpb24oKSB7XG4gXHRcInVzZSBzdHJpY3RcIjtcblxuIFx0dmFyIF92aXRyaW5lID0gdGhpcztcbiBcdFx0X3ZpdHJpbmUucmVhZHkgPSBmYWxzZTtcblxuIFx0dmFyIGluaXQgPSBmdW5jdGlvbigpe1xuIFx0XHQvLyBhZGQganNvbnAgZGF0YSB0byBhIHBhZ2VcbiBcdFx0dGhpcy5nZXRKU09OUCgpO1xuIFx0fTtcbiBcdF92aXRyaW5lLmluaXQgPSBpbml0O1xuXG5cbiBcdHZhciBYID0gZnVuY3Rpb24oanNvbnApe1xuIFx0XHRcbiBcdFx0X3ZpdHJpbmUucmVhZHkgPSB0cnVlO1xuIFx0XHRfdml0cmluZS5kYXRhID0ganNvbnAuZGF0YTtcblx0XHRyZXR1cm4gZGF0YTtcbiBcdH07XG4gXHRfdml0cmluZS5YID0gWDtcblxuXG4gXHR2YXIgZ2V0SlNPTlAgPSBmdW5jdGlvbigpe1xuIFx0XHR2YXIganNvbnAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcblx0XHQgICAganNvbnAudHlwZSA9ICd0ZXh0L2phdmFzY3JpcHQnO1xuXHRcdCAgICBqc29ucC5hc3luYyA9IGZhbHNlO1xuXHRcdCAgICBqc29ucC5zcmMgPSAnaHR0cDovL3JvYmVydmFsLmNoYW9yZGljc3lzdGVtcy5jb20vY2hhbGxlbmdlL2NoYWxsZW5nZS5qc29uP2NhbGxiYWNrPVgnO1xuXHRcdFxuXHRcdHZhciBzY3JpcHRUYXJnZXQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnYm9keScpWzBdLmNoaWxkcmVuWzFdO1xuXHRcdCAgICBzY3JpcHRUYXJnZXQucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoanNvbnAsIHNjcmlwdFRhcmdldCk7XG4gXHR9O1xuIFx0X3ZpdHJpbmUuZ2V0SlNPTlAgPSBnZXRKU09OUDtcblxuXG4gXHR2YXIgbG9hZERhdGEgPSBmdW5jdGlvbigpe1xuIFx0XHR2YXIgZGF0YVJlYWR5SW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpe1xuIFx0XHRcdGlmIChfdml0cmluZS5yZWFkeSl7XG4gXHRcdFx0XHRjbGVhckludGVydmFsKGRhdGFSZWFkeUludGVydmFsKTtcbiBcdFx0XHRcdFxuXHRcdCBcdFx0Y29uc29sZS5sb2coIFwidml0cmluZS1kYXRhLWxvYWRlZDpcIitfdml0cmluZS5yZWFkeSApO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKF92aXRyaW5lLmRhdGEpO1xuIFx0XHRcdFx0XG5cdFx0IFx0XHRjb25zb2xlLmxvZyggXCJfdml0cmluZS5jcmVhdGUoKVwiICk7XG4gXHRcdFx0XHRfdml0cmluZS5jcmVhdGUoKTtcbiBcdFx0XHR9XG4gXHRcdH0sIDEwMCk7XG4gXHR9XG4gXHRfdml0cmluZS5sb2FkRGF0YSA9IGxvYWREYXRhKCk7XG5cbiBcdHZhciBjcmVhdGUgPSBmdW5jdGlvbigpe1xuIFx0XHRjb25zb2xlLmxvZyhfdml0cmluZS5kYXRhLnJlZmVyZW5jZSk7XG4gXHRcdGNvbnNvbGUubG9nKF92aXRyaW5lLmRhdGEucmVjb21tZW5kYXRpb24pO1xuIFx0fTtcbiBcdF92aXRyaW5lLmNyZWF0ZSA9IGNyZWF0ZTtcblxuXG4gXHQvLyBJTklUXG4gXHRfdml0cmluZS5pbml0KCk7XG5cbn0uY2FsbCh0aGlzKSk7XG4iXX0=
