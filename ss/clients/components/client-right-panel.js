;(function(ng){
	ng
	.module('hrisTemplating')
	.directive('clientRightPanel', [
		'getUrl',
		function(getUrl){
			return {
				restrict : 'E',
				templateUrl : function(element, attrs){
					return getUrl.getBaseUrl(attrs.templateUrl);
				},
				scope : true,
				controller : 'clientRightController',
				controllerAs : 'clientRhtCtrl'
			};
		}
	]);
})(window.angular);