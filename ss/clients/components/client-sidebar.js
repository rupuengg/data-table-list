;(function(ng){
    ng
    .module('hrisTemplating')
	.directive('clientSidebar', [
		'getUrl',
		function(getUrl){
			return {
				restrict : 'E',
				templateUrl : function (element, attrs) {
                    return getUrl.getBaseUrl(attrs.templateUrl);
                },
				scope : true,
				controller : 'clientSidebarController',
				controllerAs : 'clientCtrl'
			};
		}
	]);
})(window.angular);