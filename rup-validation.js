;(function(ng){
	ng
	.module('rup-validation', [])
	.directive('blank', [
		function(){
			return {
				restrict : 'A',
				require : 'ngModel',
				link : function(scope, element, attrs, ctrl){
					var BLANK = /\S+/;

					
					
					ctrl.$validators.blank = function(modelValue, viewValue){
						console.log(viewValue, scope.valBlank.validation(viewValue));
						// if(!ctrl){ return }

						if(ctrl.$pristine && scope.valBlank.validation(viewValue)){
							return false;
						}
						return !scope.valBlank.validation(viewValue);
					};

					// ctrl.$validate();
				},
				controller : function(){

					this.validation = function(value){
						return !value || value.length === 0;
					};


				},
				controllerAs : 'valBlank'
			};
		}
	]);
})(window.angular);