;(function(ng){
	ng
	.module('hrisTemplating')
	.factory('Client', function(){
		var Client = function(Id, Title){
			this.id = Id;
			this.title = Title;
		};

		return Client;
	});
})(window.angular);