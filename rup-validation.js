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
						//var value = viewValue;
						//console.log(scope);
						if(ctrl.$pristine){
							return false;
						}
						return BLANK.test(viewValue);

						// if(ctrl.$isEmpty(modelValue)){
						// 	return true;
						// }
						// Susu
						// return false;
					};

					// ctrl.$validate();


					// For DOM - model validation
					// ctrl.$parsers.unshift(function(viewValue){
					// 	if(BLANK.test(viewValue)){ //Valid
					// 		ctrl.$setValidity('blank', true);
					// 	}else{
					// 		ctrl.$setValidity('blank', false);
					// 	}
					// 	return viewValue;
					// });

					// For model - DOM validation
					// ctrl.$formatters.unshift(function(value){
					// 	if(!BLANK.test(value)){ //Valid
					// 		ctrl.$setValidity('blank', true);
					// 	}else{
					// 		ctrl.$setValidity('blank', false);
					// 	}
					// 	return value;
					// });
					console.log(ctrl);
				}
			};
		}
	]);
})(window.angular);